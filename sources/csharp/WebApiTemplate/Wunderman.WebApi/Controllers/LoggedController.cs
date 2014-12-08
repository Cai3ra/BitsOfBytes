using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Wunderman.WebApi.Web.Security;
using System.Threading.Tasks;

namespace Wunderman.WebApi.Web.Controllers
{
    [BasicAuth]
    public class LoggedController : ApiController
    {
        public LoggedController()
        {

        }
        // GET api/<controller>

        public Task<HttpResponseMessage> Get()
        {
            var asyncTask = Task<HttpResponseMessage>.Factory.StartNew(
                () =>
                {
                    var response = Request.CreateResponse<string[]>(
                        HttpStatusCode.OK,
                        new string[] { "value1", "value2" }
                    );

                    return response;
                }
            );
            return asyncTask;
        }

        // GET api/<controller>/5
        public Task<HttpResponseMessage> Get(int id)
        {
            var asyncTask = Task<HttpResponseMessage>.Factory.StartNew(
                () =>
                {
                    var response = Request.CreateResponse<string>(
                        HttpStatusCode.OK,
                        "value"
                    );

                    return response;
                }
            );
            return asyncTask;
        }

        // POST api/<controller>
        public Task<HttpResponseMessage> Post([FromBody]string value)
        {
            var asyncTask = Task<HttpResponseMessage>.Factory.StartNew(
                () =>
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    return response;
                }
            );
            return asyncTask;
        }

        // PUT api/<controller>/5
        public Task<HttpResponseMessage> Put(int id, [FromBody]string value)
        {
            var asyncTask = Task<HttpResponseMessage>.Factory.StartNew(
                () =>
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    return response;
                }
            );
            return asyncTask;
        }

        // DELETE api/<controller>/5
        public Task<HttpResponseMessage> Delete(int id)
        {
            var asyncTask = Task<HttpResponseMessage>.Factory.StartNew(
                () =>
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    return response;
                }
            );
            return asyncTask;
        }
    }
}