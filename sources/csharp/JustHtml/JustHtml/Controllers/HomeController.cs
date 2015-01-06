using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;
using System.Security.Cryptography;
using System.IO;

namespace JustHtml.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ContentResult SendFile(HttpPostedFileBase file)
        {
            string path = Server.MapPath("~/");
            string filePath = Path.Combine(path, file.FileName);

            file.SaveAs(filePath);

            return Content("received...");
        }

    }
}
