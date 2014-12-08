using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using IOC.FW.Web.MVC.Filters.Handler;
using Wunderman.WebApi.Web.Security;

namespace Wunderman.WebApi.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Formatters.XmlFormatter.UseXmlSerializer = true;
            config.MessageHandlers.Add(new CompressHandler());

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional, format = RouteParameter.Optional }
            );
        }
    }
}
