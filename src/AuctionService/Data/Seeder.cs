using AuctionService.Models;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Data;

public class Seeder
{
    public static void Seed(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        SeedData(scope.ServiceProvider.GetService<SprawdzoneDbContext>());
    }

    private static void SeedData(SprawdzoneDbContext sprawdzoneDbContext)
    {
            sprawdzoneDbContext.Database.Migrate(); // apply migration if needed

            if (sprawdzoneDbContext.Auctions.Any())
            {
                Console.WriteLine("Already have data");
                return;
            }

            var auctions = new List<Auction>()
            {
            new Auction
            {
                Id = Guid.Parse("afbee524-5972-4075-8800-7d1f9d7b0a0c"),
                Status = Status.Live,
                ReservePrice = 20000,
                Seller = "bob",
                AuctionEnd = DateTime.UtcNow.AddDays(10),
                Motorcycle = new Motorcycle
                {
                    Make = "MvAgusta",
                    Model = "Rush",
                    Color = "Black",
                    Mileage = 0,
                    Year = 2023,
                    ImageUrl = "https://www.cycleworld.com/resizer/SKICmpAI4Xod5tPTZrndBvzuX30=/1440x0/smart/cloudfront-us-east-1.images.arcpublishing.com/octane/N7CK33I35JDFPA6KIFCAFW3TBA.jpg",
                    Displacement = 998,
                    FunFactor = 10,
                    HorsePower = 212,
                    Torque = 116,
                    MotorcycleType = MotorcycleType.HyperNaked,

                }
            },

            new Auction
            {
                Id = Guid.Parse("c8c3ec17-01bf-49db-82aa-1ef80b833a9f"),
                Status = Status.Live,
                ReservePrice = 90000,
                Seller = "alice",
                AuctionEnd = DateTime.UtcNow.AddDays(60),
                Motorcycle = new Motorcycle
                {
                    Make = "Ducati",
                    Model = "Monster 821",
                    Color = "Red",
                    Mileage = 15035,
                    Year = 2018,
                    ImageUrl = "https://motorecenzje.com/wp-content/uploads/2020/05/Ducati-monster-821.jpg",
                    Displacement = 821,
                    FunFactor = 7,
                    HorsePower = 108,
                    Torque = 86,
                    MotorcycleType = MotorcycleType.Naked,

                }
            },
           
            
            };

            sprawdzoneDbContext.AddRange(auctions);
            sprawdzoneDbContext.SaveChanges();

    }
}