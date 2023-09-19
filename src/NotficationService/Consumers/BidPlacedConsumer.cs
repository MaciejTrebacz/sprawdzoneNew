using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotficationService.Hubs;

namespace NotficationService.Consumers;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public BidPlacedConsumer(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine("Consuming Bid Placed message received");

        await _hubContext.Clients.All.SendAsync("BidPlaced", context.Message);
    }
}