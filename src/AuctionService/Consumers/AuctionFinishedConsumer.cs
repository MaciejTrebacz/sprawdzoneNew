using AuctionService.Data;
using AuctionService.Models;
using Contracts;
using MassTransit;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Consumers;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    private readonly SprawdzoneDbContext _context;

    public AuctionFinishedConsumer(SprawdzoneDbContext context)
    {
        _context = context;
    }
    public async Task Consume(ConsumeContext<AuctionFinished> consumeContext)
    {
        Console.WriteLine($"Consuming finished Auction: {consumeContext.Message.AuctionId} for amount {consumeContext.Message.Amount}");

        var auction = await _context.Auctions.FindAsync(Guid.Parse(consumeContext.Message.AuctionId));

        if (auction == null) return;

        if (consumeContext.Message.ItemSold)
        {
            auction.Winner = consumeContext.Message.Winner;
            auction.SoldAmount = consumeContext.Message.Amount;
        }

        auction.Status = auction.SoldAmount > auction.ReservePrice
            ? Status.Finished
            : Status.ReserveNotMet;

        await _context.SaveChangesAsync();
    }
}