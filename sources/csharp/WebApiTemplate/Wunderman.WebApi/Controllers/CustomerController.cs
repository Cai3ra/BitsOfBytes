using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using IOC.FW.Core.Abstraction.Business;
using Wunderman.WebApi.Model;
using IOC.FW.Core.Factory;
using IOC.FW.Core.Base;
using System.Threading.Tasks;
using System.Web.Mvc;
using IOC.FW.Core.Cripto;

namespace Wunderman.WebApi.Web.Controllers
{
    public class CustomerController : ApiController
    {
        private readonly IBaseBusiness<Customer> _businessCustomer;

        public CustomerController(IBaseBusiness<Customer> businessCustomer)
        {
            this._businessCustomer = businessCustomer;
        }

        // GET api/customers
        public Task<HttpResponseMessage> Get()
        {
            var asyncTask = Task<HttpResponseMessage>.Factory.StartNew(
                () =>
                {
                    var customers = _businessCustomer.SelectAll();

                    if (customers == null)
                        throw new HttpResponseException(HttpStatusCode.NotFound);

                    var response = Request.CreateResponse<IEnumerable<Customer>>(HttpStatusCode.OK, customers);
                    SetCache(response);
                    
                    return response;
                });

            return asyncTask;
        }

        // GET api/customers/5
        public Task<HttpResponseMessage> Get(int id)
        {
            var asyncTask = Task<HttpResponseMessage>.Factory.StartNew(
                () =>
                {
                    var customers = _businessCustomer.SelectSingle(w => w.Id == id);

                    if (customers == null)
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "customer not found");

                    var response = Request.CreateResponse<Customer>(HttpStatusCode.OK, customers);
                    SetCache(response);

                    return response;
                });

            return asyncTask;
        }

        // POST api/customers
        public Task<HttpResponseMessage> Post([FromBody]Customer cust)
        {
            var asyncTask = Task<HttpResponseMessage>.Factory.StartNew(
                () =>
                {
                    cust.Password = MD5Util.GetHash(cust.Password);
                    _businessCustomer.Insert(cust);
                    return Request.CreateResponse<Customer>(HttpStatusCode.OK, cust);
                });

            return asyncTask;
        }

        // PUT api/customers/5
        public Task<HttpResponseMessage> Put(int id, [FromBody]Customer cust)
        {
            var asyncTask = Task<HttpResponseMessage>.Factory.StartNew(
                  () =>
                  {
                      cust.Id = id;
                      cust.Password = MD5Util.GetHash(cust.Password);
                      _businessCustomer.Update(cust);

                      var response = new HttpResponseMessage(HttpStatusCode.OK);
                      SetCache(response);

                      return response;
                  });

            return asyncTask;
        }

        // DELETE api/customers/5
        public Task<HttpResponseMessage> Delete(int id)
        {
            var asyncTask = Task<HttpResponseMessage>.Factory.StartNew(
               () =>
               {
                   var customerToDelete = _businessCustomer.SelectSingle(w => w.Id == id);
                   _businessCustomer.Delete(customerToDelete);

                   var response = new HttpResponseMessage(HttpStatusCode.OK);
                   SetCache(response);

                   return response;
               });

            return asyncTask;
        }

        private void SetCache(HttpResponseMessage response)
        {
            response.Headers.CacheControl = new System.Net.Http.Headers.CacheControlHeaderValue()
            {
                Public = true,
                MaxAge = new TimeSpan(0, 0, 15, 0)
            };
        }
    }
}