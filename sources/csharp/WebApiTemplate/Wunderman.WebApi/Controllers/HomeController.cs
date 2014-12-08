using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;

namespace Wunderman.WebApi.Web.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public FileResult Index()
        {
            this.Response.Cache.SetCacheability(HttpCacheability.Public);
            string htmlPath = string.Empty;

            if (ConfigurationManager.AppSettings["InitPage"] != null)
                htmlPath = ConfigurationManager.AppSettings["InitPage"].ToString();

            return File(htmlPath, "text/html");
        }

    }
}
