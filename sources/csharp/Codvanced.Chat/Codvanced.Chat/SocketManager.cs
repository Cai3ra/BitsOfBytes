using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net.Sockets;
using System.Net;
using System.Threading;
using System.Net.NetworkInformation;

namespace Codvanced.Chat
{
    public class SocketManager
    {
        public Socket Server { get; set; }
        public Dictionary<string, Socket> Clients { get; set; }

        private Thread socketThread = null;
        private const string WELCOME_REQUEST = "Am I welcome?";
        private const string WELCOME_RESPONSE = "Welcome";

        public delegate void SetText(string text);
        public event SetText OnSetText;

        public SocketManager()
        {
            this.Clients = new Dictionary<string, Socket>();
        }

        public void StartServer(int port)
        {
            this.Server = new Socket(
                AddressFamily.InterNetwork,
                SocketType.Dgram,
                ProtocolType.Udp
            );

            IPEndPoint serverEndPoint = new IPEndPoint(IPAddress.Any, port);
            this.Server.Bind(serverEndPoint);

            socketThread = new Thread(new ThreadStart(ReceiveConnection));

            socketThread.Start();
        }

        public string OpenConnection(IPAddress address, int port)
        {
            string dictionaryKey = string.Format("{0}:{1}", address.ToString(), port);

            if (!this.Clients.ContainsKey(dictionaryKey))
            {
                Socket client = new Socket(
                    AddressFamily.InterNetwork,
                    SocketType.Dgram,
                    ProtocolType.Udp
                );

                IPEndPoint remote = new IPEndPoint(address, port);
                client.Connect(remote);

                if (client.Connected)
                {
                    this.Clients.Add(dictionaryKey, client);
                }
            }

            return dictionaryKey;
        }

        public void SendMessage(string message, string to)
        {
            if (this.Clients.ContainsKey(to))
            {
                this.Clients[to].Send(
                    Encoding.UTF8.GetBytes(message)
                );
            }
        }

        public void CloseConnection(string remoteConnection)
        {
            if (this.Clients.ContainsKey(remoteConnection))
            {
                var socket = this.Clients[remoteConnection];

                if (socket.Connected)
                {
                    socket.Dispose();
                    this.Clients.Remove(remoteConnection);
                }
            }
        }

        public void CloseServer()
        {
            if (socketThread != null && socketThread.IsAlive)
            {
                socketThread.Abort();
                this.Server.Shutdown(SocketShutdown.Both);
                this.Server.Dispose();
            }
        }

        public void CloseAAllConnections()
        {
            if (this.Clients != null && this.Clients.Count > 0)
            {
                string[] allKeys = this.Clients.Keys.ToArray();

                foreach (var connections in allKeys)
                {
                    CloseConnection(connections);
                }
            }
        }

        private void ReceiveConnection()
        {
            while (true)
            {

                try
                {
                    byte[] received = new byte[2048];
                    EndPoint origin = new IPEndPoint(IPAddress.Any, 0);

                    this.Server.ReceiveFrom(received, received.Length, SocketFlags.None, ref origin);
                    string valueReceived = Encoding.UTF8.GetString(received);
                    valueReceived = valueReceived.Replace("\0", "").Trim();

                    if (!string.IsNullOrWhiteSpace(valueReceived) && valueReceived.Equals(WELCOME_REQUEST))
                    {
                        this.Server.SendTo(Encoding.UTF8.GetBytes(WELCOME_RESPONSE), origin);    
                    }

                    if (OnSetText != null)
                    {
                        OnSetText(valueReceived);
                    }
                }
                catch
                {
                    //timeout
                }
            }
        }

        public string[] Scan(IPAddress start, IPAddress end, int port)
        {
            IList<string> successfulConnections = new List<string>();

            var startIPv4 = start.GetAddressBytes();
            var endIPv4 = end.GetAddressBytes();

            for (byte i = startIPv4[0]; i <= endIPv4[0] && i <= 255; i++)
            {
                for (byte j = startIPv4[1]; j <= endIPv4[1] && i <= 255; j++)
                {
                    for (byte k = startIPv4[2]; k <= endIPv4[2] && i <= 255; k++)
                    {
                        for (byte l = startIPv4[3]; l <= endIPv4[3] && i <= 255; l++)
                        {
                            var ipAddress = new IPAddress(new byte[] { i, j, k, l });
                            string tryConnect = null;

                            try
                            {
                                IPEndPoint origin = new IPEndPoint(IPAddress.Any, 0);

                                bool open = Ping(ipAddress.ToString(), 1, 100);
                                UdpClient client = new UdpClient();
                                client.Client.ReceiveTimeout = 500;
                                client.Connect(new IPEndPoint(ipAddress, port));

                                byte[] msg = Encoding.UTF8.GetBytes(WELCOME_REQUEST);
                                client.Send(msg, msg.Length);
                                var bytesReceived = client.Receive(ref origin);

                                string valueReceived = Encoding.UTF8.GetString(bytesReceived);
                                valueReceived = valueReceived.Replace("\0", "").Trim();

                                open &= !string.IsNullOrWhiteSpace(valueReceived)
                                    && valueReceived.Equals(WELCOME_RESPONSE);

                                if (open)
                                {
                                    successfulConnections.Add(tryConnect);
                                }
                            }
                            catch
                            {

                            }
                        }
                    }
                }
            }

            return successfulConnections.ToArray();
        }

        public bool Ping(string host, int attempts, int timeout)
        {
            Ping ping = new Ping();
            PingReply pingReply;

            for (int i = 0; i < attempts; i++)
            {
                try
                {
                    pingReply = ping.Send(host, timeout);

                    if (pingReply != null &&
                        pingReply.Status == System.Net.NetworkInformation.IPStatus.Success)
                        return true;
                }
                catch
                {
                    // Do nothing and let it try again until the attempts are exausted.
                    // Exceptions are thrown for normal ping failurs like address lookup
                    // failed.  For this reason we are supressing errors.
                }
            }

            // Return false if we can't successfully ping the server after several attempts.
            return false;
        }
    }
}
