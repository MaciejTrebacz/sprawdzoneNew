namespace Contracts;

public class BidPlaced
{
    public string Id { get; set; }
    public string AuctionId { get; set; }
    public string Bidder { get; set; }
    public DateTime BidTime { get; set; }
    public int Amount { get; set; }
    public BidStatus BidStatus { get; set; }
}

public enum BidStatus
{
    Accepted,
    Rejected,
    NotOverMinimumPrice,

}