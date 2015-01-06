using System.Web;
using System.Web.Mvc;
using JustHtml.Models;

namespace JustHtml
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new AjaxCrawlableAttribute());
        }
    }
}