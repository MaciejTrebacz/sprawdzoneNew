namespace AuctionService.Models;

public abstract class  Vehicle {
    public Guid Id { get; set; }
    public string Make { get; set; }
    public string Model { get; set; }
    public int Year { get; set; }
    public int HorsePower { get; set; }
    public int Torque { get; set; }
    public int Displacement { get; set; }
    public string Color { get; set; }
    public int Mileage { get; set; }
    public string ImageUrl { get; set; }

}