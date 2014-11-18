using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.XPath;
using System.Xml.Linq;
using System.IO;


namespace FileZillaParser
{
    public class Program
    {
        public enum Type
        {
            FTP = 0,
            SFTP = 1,
            FTPS = 2,
            FTPSE = 3
        }

        public enum Protocol
        {
            Default = 0,
            Unix = 1,
            VMS = 2,
            MVS = 3,
            Dos = 4,
            VxWorks = 5
        }

        private static readonly string[] keys =
            new string[]
            {
                "Host",
                "Port",
                "Protocol",
                "Type",
                "PasvMode",
                "User",
                "Pass",
                "Name"
            };

        static void Main(string[] args)
        {
            Teste();

            string filezillaXml = args[0];
            XDocument x = XDocument.Load(filezillaXml);
            var allServers = (
                from obj
                    in x.Descendants()
                where obj.Name == "Server"
                select new
                {
                    name = obj.Name,
                    nodes = (
                        from obj2
                            in obj.Descendants()
                        where
                            keys.Contains(obj2.Name.ToString())
                        select new KeyValuePair<string, string>(obj2.Name.ToString(), obj2.Value)
                    ).OrderBy(p => p.Key)
                }
            );

            string excelFile = args[1];
            using (StreamWriter writer = new StreamWriter(excelFile))
            {
                foreach (var ordenedKeys in keys.OrderBy(p => p))
                {
                    string line = string.Format("{0};", ordenedKeys);
                    writer.Write(line);
                }
                writer.WriteLine();

                foreach (var server in allServers)
                {
                    var listServer = server.nodes.ToList();

                    if (listServer.Exists(p => p.Key.Equals("Pass")))
                    {
                        foreach (var tag in server.nodes)
                        {
                            string val = tag.Value;
                            if (tag.Key.Equals("Type"))
                            {
                                val = string.Format(
                                    "{0} :: {1}", 
                                    val, 
                                    ((Type)(int.Parse(tag.Value))).ToString()
                                );
                            }

                            if (tag.Key.Equals("Protocol"))
                            {
                                val = string.Format("{0} :: {1}", val, ((Protocol)(int.Parse(tag.Value))).ToString());
                            }
                            string line = string.Format("{0};", val);
                            writer.Write(line);
                        }
                        writer.WriteLine();
                    }
                }
            }
        }

        static void Teste()
        {
            int valueToWithdraw = 170; //parameter
            Dictionary<int, int> moneyCount = new Dictionary<int, int>() {
	            {50, 0},
	            {20, 0},
	            {10, 0}
            };

            while(valueToWithdraw > 0)
            {
	            if(valueToWithdraw >= 50) {
		            valueToWithdraw -= 50;
		            moneyCount[50]++;
	            } 
	            else if(valueToWithdraw >= 20) {
		            valueToWithdraw -= 20;
		            moneyCount[20]++;
	            }
	            else if(valueToWithdraw >= 10) {
		            valueToWithdraw -= 10;
		            moneyCount[10]++;
	            }
	            else {
		            throw new Exception("this operation can not be performed...");
	            }
            }		

            Console.WriteLine("Quantidade de notas sacadas: ");
            foreach(var item in moneyCount){
	            string msg = string.Format(
		            "Cedulas de {0}: {1}", 
		            item.Key, 
		            item.Value
	            );	
	
	            Console.WriteLine(msg);
            }

        }
    }
}
