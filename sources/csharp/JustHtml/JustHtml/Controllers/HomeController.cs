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
            DateTime dtNow = DateTime.Now;
            var tokenClient = String.Concat("COL-Solidaria-API-Integration.", dtNow.ToString("yyyy-MM-dd.HH:mm"));
            UTF8Encoding enc = new UTF8Encoding();

            byte[] data = enc.GetBytes(tokenClient);
            var result = BitConverter.ToString(
                SHA1.Create().ComputeHash(data)
            ).Replace("-", String.Empty);

            string urlToCall = string.Format(
                "?slug={0}&accessToken={1}&date={2}",
                "lar-jesus-entre-as-criancas",
                result,
                dtNow.ToString("yyyyMMddHHmm")
            );
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
