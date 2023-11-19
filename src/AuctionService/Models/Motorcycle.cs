using System.ComponentModel.DataAnnotations.Schema;

namespace AuctionService.Models;


[Table("Motorcycles")]
public class Motorcycle : Vehicle
{
    public int FunFactor { get; set; }
    public MotorcycleType MotorcycleType { get; set; }

    // navigation properties
    public Auction Auction { get; set; }
    public Guid AuctionId { get; set; }


}