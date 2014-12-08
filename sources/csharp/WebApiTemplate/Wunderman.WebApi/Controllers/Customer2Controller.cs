using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using IOC.FW.Core.Abstraction.Business;
using Wunderman.WebApi.Model;

namespace Wunderman.WebApi.Web.Controllers
{
    public class Customer2Controller : ApiController
    {
        private readonly IBaseBusiness<Customer> _businessCustomer;

        public Customer2Controller(IBaseBusiness<Customer> businessCustomer)
        {
            this._businessCustomer = businessCustomer;
        }
        // GET api/<controller>
        public HttpResponseMessage Get()
        {
            var customers = _businessCustomer.SelectAll();

            if (customers == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);

            var response = Request.CreateResponse<IEnumerable<Customer>>(HttpStatusCode.OK, customers);
            SetCache(response);

            return response;
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
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