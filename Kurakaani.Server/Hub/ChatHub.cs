using Microsoft.AspNetCore.SignalR;

namespace Kurakaani.Server.Hub
{
    public class ChatHub : Microsoft.AspNetCore.SignalR.Hub
    {
        private readonly IDictionary<string, UserRoomConnection> _connection;

        public ChatHub(IDictionary<string, UserRoomConnection> connection)
        {
            _connection = connection;
        }

        public async Task JoinRoom(UserRoomConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName: userConnection.Room!);
            _connection[Context.ConnectionId] = userConnection;
            await Clients.Group(userConnection.Room!)
                .SendAsync("ReceiveMessage","Lets program bot", $"{userConnection.User} has joined the group");

            await SendConnectedUser(userConnection.Room!);
        }

        public async Task SendMessage(string message)
        {
            if (_connection.TryGetValue(Context.ConnectionId, out UserRoomConnection userConnection))
            {
                await Clients.Group(userConnection.Room!)
                    .SendAsync("ReceiveMessage", userConnection.User,message, DateTime.Now);
            }
        }

        public override Task OnDisconnectedAsync(Exception ex)
        {
            if (!_connection.TryGetValue(Context.ConnectionId, out UserRoomConnection userConnection))
            {
                return base.OnDisconnectedAsync(ex); 
            }
            Clients.Group(userConnection.Room!)
                .SendAsync("ReceiveMessage", "Let Program bot", $"{userConnection.User} has left the group");

            SendConnectedUser(userConnection.Room!);
            return base.OnDisconnectedAsync(ex);
        }
        
        public Task SendConnectedUser(string room)
        {
            var users = _connection.Values
                .Where(u => u.Room == room)
                .Select(s => s.User);

            return Clients.Group(room).SendAsync("ConnectedUser", users);

        }
    }
}
