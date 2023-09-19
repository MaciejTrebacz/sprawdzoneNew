using AuctionService.Data;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    private readonly SprawdzoneDbContext _sprawdzoneDbContext;

    public BidPlacedConsumer(SprawdzoneDbContext sprawdzoneDbContext)
    {
        _sprawdzoneDbContext = sprawdzoneDbContext;
    }
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine($"Consuming bid placed of ID: {context.Message.AuctionId} for amount {context.Message.Amount}");

        var id = Guid.Parse(context.Message.AuctionId);
        var auction = await _sprawdzoneDbContext.Auctions.FindAsync(Guid.Parse(context.Message.AuctionId));
        
        if (auction is null) return;

        if (auction.CurrentHighBid is null 
            || context.Message.BidStatus.Contains("Accepted") 
            && context.Message.Amount > auction.CurrentHighBid)
        {
            auction.CurrentHighBid = context.Message.Amount;
            await _sprawdzoneDbContext.SaveChangesAsync();
        }
    }
}