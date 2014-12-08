using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using IOC.FW.Core.Abstraction.Binding;
using SimpleInjector;
using Wunderman.WebApi.Abstraction.Business;
using Wunderman.WebApi.Business.Implementation;

namespace Wunderman.WebApi.Binding.SimpleInjector
{
    public class BusinessModule : IModule
    {
        public void SetBinding(Container container)
        {
            container.Register<AbstractLoginBusiness, LoginBusiness>(Lifestyle.Singleton);
        }
    }
}
