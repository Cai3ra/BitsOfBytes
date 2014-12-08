using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Net.Sockets;
using System.Net;
using System.Diagnostics;
using System.Threading;

namespace Codvanced.Chat
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly SocketManager socketManager;
        private const int PORT = 3000;

        public MainWindow()
        {
            InitializeComponent();
            this.button2.Click += new RoutedEventHandler(button2_Click);
            this.Closing += new System.ComponentModel.CancelEventHandler(MainWindow_Closing);

            this.socketManager = new SocketManager();
            this.socketManager.OnSetText += new SocketManager.SetText(socketManager_OnSetText);
            this.socketManager.StartServer(PORT);
        }

        void socketManager_OnSetText(string text)
        {
            this.txtMessage.Dispatcher.Invoke(
                new Action(
                    delegate()
                    {
                        this.txtMessage.Text = string.Format(
                            "{0}{1}{2}",
                            this.txtMessage.Text,
                            text,
                            Environment.NewLine
                        );
                    }
                )
            );
        }

        void MainWindow_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            this.socketManager.CloseServer();
            this.socketManager.CloseAAllConnections();
        }

        void button2_Click(object sender, RoutedEventArgs e)
        {
            Send();
        }

        private void txtSendMessage_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.Return)
            {
                Send();
            }
        }

        private void Send()
        {
            string remoteConnection =
                this.socketManager.OpenConnection(
                    IPAddress.Parse(
                        this.txtIP.Text
                    )
                    , PORT
                );

            this.socketManager.SendMessage(
                this.txtSendMessage.Text,
                remoteConnection
            );

            this.txtSendMessage.Text = string.Empty;
        }

        private void ScanAll()
        {
            this.socketManager.Scan(
               new IPAddress(new byte[] { 127, 0, 0, 1 }),
               new IPAddress(new byte[] { 127, 0, 0, 1 }),
               PORT
            );

            this.socketManager.Scan(
                new IPAddress(new byte[] { 10, 248, 8, 1 }),
                new IPAddress(new byte[] { 10, 248, 8, 255 }),
                PORT
            );
        }

        private void button1_Click(object sender, RoutedEventArgs e)
        {
            ScanAll();
        }
    }
}
