using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using IOC.FW.Core.Base;
using Wunderman.WebApi.Model;
using IOC.FW.Core.Abstraction.Business;
using IOC.FW.Core.Abstraction.DAO;

namespace Wunderman.WebApi.Abstraction.Business
{
    public abstract class AbstractLoginBusiness
        : BaseBusiness<Customer>
    {
        public AbstractLoginBusiness(IBaseDAO<Customer> dao)
            : base(dao)
        {

        }

        public abstract bool Login(string user, string password);
    }
}
