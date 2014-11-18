using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Net;
using System.IO;
using System.Threading;
using NAudio.Wave;

namespace UmElefante
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            Speech();
        }

        public int TimeWait { get; set; }

        private string MontaPrimeiraFrase(int valor)
        {
            bool plural = valor > 1;
            string frase = "muita gente";

            if (plural)
                frase = "{0} elefantes incomodam " + frase;
            else
                frase = "{0} elefante incomoda " + frase;

            frase = string.Format(frase, valor);
            return frase;
        }

        private string MontaSegundaFrase(int valor)
        {
            string frase = "muita gente";
            frase = string.Format("{0} elefantes ", valor);

            for (int i = 0; i < valor; i++)
                frase += "incomodam ";

            frase = frase.Remove(frase.Length - 1, 1) + " muito mais";

            return frase;
        }

        private void Speech()
        {
            for (int i = 1; i < 20; i++)
            {
                if (i % 2 <= 0)
                {
                    TimeWait = (i * 2000);
                    string multiplo = MontaSegundaFrase(i);
                    PlayMp3FromUrl(string.Format(@"http://translate.google.com/translate_tts?tl=pt&q={0}", multiplo));
                }
                else
                {
                    TimeWait = 3000 + (i * 400);
                    string frase = MontaPrimeiraFrase(i);
                    PlayMp3FromUrl(string.Format(@"http://translate.google.com/translate_tts?tl=pt&q={0}", frase));
                }
            }
        }

        bool waiting = false;
        AutoResetEvent stop = new AutoResetEvent(false);
        public void PlayMp3FromUrl(string url)
        {
            using (Stream ms = new MemoryStream())
            {
                using (Stream stream = WebRequest.Create(url)
                    .GetResponse().GetResponseStream())
                {
                    byte[] buffer = new byte[32768];
                    int read;
                    while ((read = stream.Read(buffer, 0, buffer.Length)) > 0)
                    {
                        ms.Write(buffer, 0, read);
                    }
                }

                ms.Position = 0;
                using (WaveStream blockAlignedStream =
                    new BlockAlignReductionStream(
                        WaveFormatConversionStream.CreatePcmStream(
                            new Mp3FileReader(ms))))
                {
                    using (WaveOut waveOut = new WaveOut(WaveCallbackInfo.FunctionCallback()))
                    {
                        waveOut.Init(blockAlignedStream);
                        waveOut.PlaybackStopped += (sender, e) =>
                        {
                            waveOut.Stop();
                        };

                        waveOut.Play();
                        waiting = true;
                        stop.WaitOne(TimeWait);
                        waiting = false;
                    }
                }
            }
        }
    }
}
