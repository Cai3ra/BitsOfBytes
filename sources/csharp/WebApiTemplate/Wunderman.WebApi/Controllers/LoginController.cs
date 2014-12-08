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
    public class LoginController : ApiController
    {
        [BasicAuth]
        public Task<HttpResponseMessage> Post()
        {
            return Task<HttpResponseMessage>.Factory.StartNew(() => {
                return new HttpResponseMessage(HttpStatusCode.OK);
            });
        }
    }
}