using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotficationService.Hubs;

namespace NotficationService.Consumers;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public AuctionFinishedConsumer(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }
    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        Console.WriteLine("Consuming auction FINISHED message received");

        await _hubContext.Clients.All.SendAsync("AuctionFinished", context.Message);
    }
}