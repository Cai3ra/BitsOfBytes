using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Reflection;
using System.Diagnostics;
using SessionManagementTester.Helper;
using System.IO;
using Recaptcha;

namespace SessionManagementTester.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        private const string USER_INFORMATION = "UserInformation";
        private const string USER_RANDOM_IMAGE = "CaptchaImageText";

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Test()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SaveSession(string valueToPersist)
        {
            try
            {
                Session[USER_INFORMATION] = valueToPersist;
                this.Response.Cache.SetCacheability(HttpCacheability.NoCache);

            }
            catch(Exception e)
            {
                valueToPersist = e.Message;
            }

            return Json(
                new 
                { 
                    sessionName = "UserInformation", 
                    valueStored = valueToPersist 
                }, 
                JsonRequestBehavior.AllowGet
            );
        }

        [HttpGet]
        public JsonResult GetSession()
        {
            dynamic returnInfo;
            try
            {
                if (Session[USER_INFORMATION] != null)
                {
                    returnInfo = new { status = true, info = Session[USER_INFORMATION] };
                }
                else
                {
                    returnInfo = new { status = false, info = "Session vazia para esta requisição" };
                }
            }
            catch (Exception e)
            {
                returnInfo = new { status = false, info = e.Message };
            }

            this.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            return Json(
                returnInfo, 
                JsonRequestBehavior.AllowGet
            );
        }

        [HttpGet]
        public JsonResult GetVersion()
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            FileVersionInfo fvi = FileVersionInfo.GetVersionInfo(assembly.Location);
            string version = fvi.FileVersion;

            this.Response.Cache.SetCacheability(HttpCacheability.NoCache);

            return Json(
                new { 
                    ver = version 
                }, 
                JsonRequestBehavior.AllowGet
            );
        }

        [HttpGet]
        public ActionResult GetRandomImage(bool gen = true, string type = "json")
        {
            ActionResult result = Json(
                new 
                { 
                    status = false, 
                    info = "error: empty" 
                }, 
                JsonRequestBehavior.AllowGet
            );

            MemoryStream memStream = new MemoryStream();

            if (gen)
            {
                memStream = Image.GetImage2(this.Session, USER_RANDOM_IMAGE);
            }
            
            if (!string.IsNullOrEmpty(type) && type.Equals("json", StringComparison.InvariantCultureIgnoreCase))
            {
                byte[] imageBytes = memStream.ToArray();

                var captcha = new
                {
                    status = true,
                    image = Convert.ToBase64String(imageBytes),
                    value =
                        Session[USER_RANDOM_IMAGE] != null
                        ? Session[USER_RANDOM_IMAGE].ToString()
                        : string.Empty
                };

                result = Json(captcha, JsonRequestBehavior.AllowGet);
            }
            else
            {
                this.Response.Cache.SetCacheability(HttpCacheability.NoCache);
                result = new FileStreamResult(memStream, "image/GIF");
            }
            return result;
        }

        [HttpGet]
        public JsonResult GetRandomImageSession()
        {
            dynamic returnInfo;
            try
            {
                if (Session[USER_RANDOM_IMAGE] != null)
                {
                    returnInfo = new { status = true, info = Session[USER_RANDOM_IMAGE] };
                }
                else
                {
                    returnInfo = new { status = false, info = "Session vazia para esta requisição" };
                }
            }
            catch (Exception e)
            {
                returnInfo = new { status = false, info = e.Message };
            }

            this.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            return Json(
                returnInfo,
                JsonRequestBehavior.AllowGet
            );
        }

        [HttpPost]
        public JsonResult TestRandomImage(string valueToTest)
        {
            dynamic returnInfo;
            try
            {
                if (Session[USER_RANDOM_IMAGE] != null)
                {
                    if (Session[USER_RANDOM_IMAGE].Equals(valueToTest))
                    {
                        returnInfo = new { status = true, info = Session[USER_RANDOM_IMAGE] };
                    }
                    else
                    {
                        returnInfo = new { status = false, info = Session[USER_RANDOM_IMAGE] };
                    }
                }
                else
                {
                    returnInfo = new { status = false, info = "Session vazia para esta requisição" };
                }
            }
            catch (Exception e)
            {
                returnInfo = new { status = false, info = e.Message };
            }

            this.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            return Json(
                returnInfo,
                JsonRequestBehavior.AllowGet
            );
        }

        [HttpPost, RecaptchaControlMvc.CaptchaValidator]
        public ActionResult Register(bool captchaValid, string captchaErrorMessage)
        {
            if (!captchaValid)
                ModelState.AddModelError("captcha", captchaErrorMessage);

            if (ModelState.IsValid)
            {
                return Content("Valid captcha");
            }

            this.Response.Cache.SetMaxAge(new TimeSpan(0, 5, 0));
            return View(viewName: "Index");
        }
    }
}

