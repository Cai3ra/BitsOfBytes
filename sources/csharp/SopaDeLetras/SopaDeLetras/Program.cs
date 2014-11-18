using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using System.IO;

namespace SopaDeLetras
{
    class Program
    {
        private const string relativeDictPath = @"Exercicio\dicio.txt";
        private const string relativeSoupPath = @"Exercicio\sopa.txt";

        static void Main(string[] args)
        {
            string mainPath = Path.GetDirectoryName(
                Assembly.GetEntryAssembly().Location
            );

            string absoluteDictPath = Path.Combine(mainPath, relativeDictPath);
            string absoluteSoupPath = Path.Combine(mainPath, relativeSoupPath);

            if (File.Exists(absoluteDictPath) && File.Exists(absoluteSoupPath))
            {
                List<string> dict = new List<string>();
                List<string> soup = new List<string>(); 

                using(StreamReader dictReader = new StreamReader(absoluteDictPath))
                using(StreamReader soupReader = new StreamReader(absoluteSoupPath))
                {
                    while (!dictReader.EndOfStream)
                        dict.Add(dictReader.ReadLine());

                    while (!soupReader.EndOfStream)
                        soup.Add(soupReader.ReadLine());
                }

                List<int> indexesCRLF = new List<int>();

                var allFound = new Dictionary<string, List<Tuple<int, int, int>>>();
                int counter = 0;
                foreach (var word in dict)
                {
                    allFound.Add(word, new List<Tuple<int, int, int>>());

                    foreach (var line in soup)
                    {
                        int indexers = -1;
                        if (line.IndexOf(word, StringComparison.InvariantCultureIgnoreCase) > -1)
                        {
                            do
                            {
                                indexers += word.Length;
                                indexers = line.IndexOf(word, indexers, StringComparison.InvariantCultureIgnoreCase);

                                if (indexers > -1)
                                {
                                    allFound[word].Add(
                                        new Tuple<int, int, int>(
                                            soup.IndexOf(line), 
                                            indexers, 
                                            indexers + word.Length
                                        )
                                    );

                                    counter++;
                                }
                            } 
                            while (indexers > -1);
                        }
                    }

                    if (counter >= 100000)
                    {
                        using (StreamWriter writer = new StreamWriter(Path.Combine(mainPath, "palavras.txt"), true))
                        {
                            foreach (var item in allFound)
                            {
                                writer.WriteLine(string.Format("* {0}", item.Key));
                                foreach (var item2 in item.Value)
                                {
                                    writer.WriteLine(
                                        string.Format(
                                            "\t {0}-{1}:{2}", 
                                            item2.Item1, 
                                            item2.Item2, 
                                            item2.Item3
                                        )
                                    );
                                }
                            }
                        }

                        counter = 0;
                        allFound.Clear();
                    }
                }
                
            }
        }

    }
}

