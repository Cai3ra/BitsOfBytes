using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wunderman.WebApi.Model;
using IOC.FW.Core.Abstraction.Business;
using IOC.FW.Core.Factory;
using IOC.FW.Core.Cripto;
using IOC.FW.Web.MVC.Filters;

namespace Wunderman.WebApi.Web.Security
{
    public class BasicAuth : BasicAuthenticationFilter
    {
        public IBaseBusiness<Customer> _loginBusiness;
        public BasicAuth()
        {

        }

        public override bool Login(string user, string password)
        {
            this._loginBusiness = InstanceFactory.GetImplementation<IBaseBusiness<Customer>>();
            var customerFound = this._loginBusiness.SelectSingle(
                w => w.User == user && w.Password == MD5Util.GetHash(password)
            );

            return customerFound != null && customerFound.Id > 0;
        }
    }
}