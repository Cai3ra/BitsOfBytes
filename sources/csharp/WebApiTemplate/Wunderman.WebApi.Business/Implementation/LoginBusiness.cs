using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Wunderman.WebApi.Abstraction.Business;
using IOC.FW.Core.Abstraction.DAO;
using Wunderman.WebApi.Model;

namespace Wunderman.WebApi.Business.Implementation
{
    public class LoginBusiness : AbstractLoginBusiness
    {
        private readonly IBaseDAO<Customer> _dao;

        public LoginBusiness(IBaseDAO<Customer> dao)
            : base(dao)
        {
            _dao = dao;
        }

        public override bool Login(string user, string password)
        {
            var userFound = this.SelectSingle(w => w.Name == user && w.Password == password);
            return userFound != null && userFound.Id > 0;
        }
    }
}
