using System.ComponentModel.DataAnnotations;

namespace AuctionService.DTOs;

public class CreateAuctionDto
{
    [Required]
    public string Make { get; set; }
    [Required]

    public string Model { get; set; }
    [Required]

    public int Year { get; set; }
    [Required]

    public int HorsePower { get; set; }
    [Required]

    public int Torque { get; set; }
    [Required]

    public int Displacement { get; set; }
    [Required]

    public string Color { get; set; }
    [Required]

    public int Mileage { get; set; }
    [Required]

    public string ImageUrl { get; set; }
    [Required]

    public int ReservePrice { get; set; }
    [Required]

    public DateTime AuctionEnd { get; set; }
    
}