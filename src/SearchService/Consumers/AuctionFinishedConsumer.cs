using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionFinishedConsumer :IConsumer<AuctionFinished>
{
    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        Console.WriteLine($"Consuming finished Auction: {context.Message.AuctionId} for amount {context.Message.Amount}");

        var auction = await DB.Find<Motorcycle>().OneAsync(context.Message.AuctionId);

        if (auction == null) return;

        if (context.Message.ItemSold)
        {
            auction.Winner = context.Message.Winner;
            auction.SoldAmount = (int)context.Message.Amount;
        }

        auction.Status = "Finished";

        await auction.SaveAsync();
    }
}