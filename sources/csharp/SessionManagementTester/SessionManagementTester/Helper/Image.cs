using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

namespace SessionManagementTester.Helper
{
    public class Image
    {
        public static MemoryStream GetImage(HttpSessionStateBase session, string sessionName)
        {
            // Para gerar números randômicos.
            Random random = new Random();

            string s = "";
            for (int i = 0; i < 4; i++)
                s = String.Concat(s, random.Next(10).ToString());

            // Cria uma imagem bitmap de 32-bit.
            Bitmap bitmap = new Bitmap(173, 50, PixelFormat.Format32bppArgb);

            // Crie um objeto gráfico para o desenho.
            Graphics g = Graphics.FromImage(bitmap);
            g.SmoothingMode = SmoothingMode.AntiAlias;
            Rectangle rect = new Rectangle(0, 0, 173, 50);

            // Preencha o fundo.
            HatchBrush hatchBrush = new HatchBrush(HatchStyle.SmallConfetti, Color.LightGray, Color.White);
            g.FillRectangle(hatchBrush, rect);

            // Configura a fonte do texto.
            SizeF size;
            float fontSize = rect.Height + 1;
            Font font;

            // Ajuste o tamanho da fonte até que o texto 
            // se encaixe dentro da imagem.
            do
            {
                fontSize--;
                font = new Font(System.Drawing.FontFamily.GenericSerif.Name, fontSize, FontStyle.Bold);
                size = g.MeasureString(s, font);
            }
            while (size.Width > rect.Width);

            // Configure o formato de texto.
            StringFormat format = new StringFormat();
            format.Alignment = StringAlignment.Center;
            format.LineAlignment = StringAlignment.Center;

            // Cria uma deformação no formato dos números.
            GraphicsPath path = new GraphicsPath();
            path.AddString(s, font.FontFamily, (int)font.Style, font.Size, rect, format);
            float v = 4F;
            PointF[] points = {
                new PointF(random.Next(rect.Width) / v, random.Next(rect.Height) / v),
                new PointF(rect.Width - random.Next(rect.Width) / v, random.Next(rect.Height) / v),
                new PointF(random.Next(rect.Width) / v, rect.Height - random.Next(rect.Height) / v),
                new PointF(rect.Width - random.Next(rect.Width) / v,rect.Height - random.Next(rect.Height) / v)
            };
            Matrix matrix = new Matrix();
            matrix.Translate(0F, 0F);
            path.Warp(points, rect, matrix, WarpMode.Perspective, 0F);

            // Desenha o texto.
            hatchBrush = new HatchBrush(HatchStyle.LargeConfetti,
                                        Color.LightGray, Color.DarkGray);
            g.FillPath(hatchBrush, path);

            // Coloca um pouco de partículas no fundo.
            int m = Math.Max(rect.Width, rect.Height);
            for (int i = 0; i < (int)(rect.Width * rect.Height / 30F); i++)
            {
                int x = random.Next(rect.Width);
                int y = random.Next(rect.Height);
                int w = random.Next(m / 50);
                int h = random.Next(m / 50);
                g.FillEllipse(hatchBrush, x, y, w, h);
            }

            //Cria uma session com o valor da imagem
            if (session != null)
                session[sessionName] = s;

            // Define a imagem.
            font.Dispose();
            hatchBrush.Dispose();
            g.Dispose();

            var stream = new MemoryStream();
            bitmap.Save(stream, ImageFormat.Gif);
            stream.Position = 0;

            return stream;
        }

        public static MemoryStream GetImage2(HttpSessionStateBase session, string sessionName)
        {
            Random random = new Random();

            string phrase = string.Empty;
            int width = 173,
                height = 50;

            for (int i = 0; i < 4; i++)
                phrase = String.Concat(phrase, random.Next(10).ToString());

            Bitmap CaptchaImg = new Bitmap(173, 50);
            Random Randomizer = new Random();
            Graphics Graphic = Graphics.FromImage(CaptchaImg);
            Graphic.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
            Graphic.TextRenderingHint = System.Drawing.Text.TextRenderingHint.AntiAlias;
            //Set height and width of captcha image
            Graphic.FillRectangle(new SolidBrush(Color.White), 0, 0, width, height);
            //Rotate text a little bit
            Graphic.RotateTransform(-3);
            Graphic.DrawString(phrase, new Font("Verdana", 25),
                new SolidBrush(Color.Black), 15, 15);
            Graphic.Flush();

            var stream = new MemoryStream();
            CaptchaImg.Save(stream, ImageFormat.Gif);
            stream.Position = 0;

            //Cria uma session com o valor da imagem
            if (session != null)
                session[sessionName] = phrase;

            return stream;
        }
    }
}