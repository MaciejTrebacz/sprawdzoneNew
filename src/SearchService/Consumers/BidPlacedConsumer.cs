using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine($"Consuming bid placed of ID: {context.Message.AuctionId} for amount {context.Message.Amount}");

        var motorcycle = await DB.Find<Motorcycle>().OneAsync(context.Message.AuctionId) ;


        if (context.Message.BidStatus.Contains("Accepted")
            && context.Message.Amount > motorcycle.CurrentHighBid)
        {
            motorcycle.CurrentHighBid = context.Message.Amount;
            await motorcycle.SaveAsync();
        }
    }
}