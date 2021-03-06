﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Diagnostics;
using System.IO;

namespace JustHtml.Controllers
{
    public class HtmlSnapshotController : Controller
    {
        public ContentResult returnHTML(string url)
        {
            string appRoot = Path.GetDirectoryName(AppDomain.CurrentDomain.BaseDirectory);

            var startInfo = new ProcessStartInfo
            {
                Arguments = String.Format("{0} {1}", Path.Combine(appRoot, "bin\\snapshot\\seo\\createSnapshot.js"), url),
                FileName = Path.Combine(appRoot, "bin\\snapshot\\phantomjs.exe"),
                UseShellExecute = false,
                CreateNoWindow = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                RedirectStandardInput = true,
                StandardOutputEncoding = System.Text.Encoding.UTF8
            };

            var p = new Process();
            p.StartInfo = startInfo;
            p.Start();

            string output = p.StandardOutput.ReadToEnd();
            p.WaitForExit();
            ViewData["result"] = output;

            return Content(output, "text/html");
        }

        public FileResult returnPDF(string url)
        {
            string appRoot = Path.GetDirectoryName(AppDomain.CurrentDomain.BaseDirectory);

            var startInfo = new ProcessStartInfo
            {
                Arguments = String.Format("{0} {1} archive.pdf", Path.Combine(appRoot, "bin\\snapshot\\transform\\rasterize.js"), url),
                FileName = Path.Combine(appRoot, "bin\\snapshot\\phantomjs.exe"),
                UseShellExecute = false,
                CreateNoWindow = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                RedirectStandardInput = true,
                StandardOutputEncoding = System.Text.Encoding.UTF8
            };

            var p = new Process();
            p.StartInfo = startInfo;
            p.Start();

            string output = p.StandardOutput.ReadToEnd();
            p.WaitForExit();
            ViewData["result"] = output;

            return File(new byte[0], "application/pdf");
        }
    }
}