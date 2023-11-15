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
            Console.WriteLine("Cleaning the database...");
            sprawdzoneDbContext.Auctions.RemoveRange(sprawdzoneDbContext.Auctions);
        }
        Console.WriteLine("updating");
        var auctions = new List<Auction>()
            {
            new Auction
            {
                Id = new Guid(),
                Status = Status.Live,
                ReservePrice = 20000,
                Seller = "bob",
                AuctionEnd = DateTime.UtcNow.AddDays(10),
                Motorcycle = new Motorcycle
                {
                    Make = "MV Agusta",
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
                Id = new Guid(),
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
            new Auction
            {
                Id = new Guid(),
                Status = Status.Live,
                ReservePrice = 90000,
                Seller = "alice",
                AuctionEnd = DateTime.UtcNow.AddDays(60),
                Motorcycle = new Motorcycle
                {
                    Make = "Aprilla",
                    Model = "Tuono",
                    Color = "Black",
                    Mileage = 9999,
                    Year = 2023,
                    ImageUrl = "https://wlassets.aprilia.com/wlassets/aprilia/master/Range/tuono_v4/models_page/Tuono-V4-1100-Factory/2023/Aprilia_TuonoV4_Factory_website-2023_Box_900x675_1/original/Aprilia_TuonoV4_Factory_website-2023_Box_900x675_1.jpg",
                    Displacement = 1077,
                    FunFactor = 10,
                    HorsePower = 175,
                    Torque = 121,
                    MotorcycleType = MotorcycleType.HyperNaked,

                }
            },
            new Auction
            {
                Id = new Guid(),
                Status = Status.Live,
                ReservePrice = 90000,
                Seller = "alice",
                AuctionEnd = DateTime.UtcNow.AddDays(60),
                Motorcycle = new Motorcycle
                {
                    Make = "BMW",
                    Model = "S1000XR",
                    Color = "White/Red",
                    Mileage = 198,
                    Year = 2023,
                    ImageUrl = "https://ultimatemotorcycling.com/wp-content/uploads/2020/08/2021-BMW-S-1000-XR-First-Look-adventure-sport-touring-adv-motorcycle-featured-scaled.jpg",
                    Displacement = 999,
                    FunFactor = 9,
                    HorsePower = 121,
                    Torque = 114,
                    MotorcycleType = MotorcycleType.Touring,

                }
            },
            new Auction
            {
                Id = new Guid(),
                Status = Status.Live,
                ReservePrice = 90000,
                Seller = "alice",
                AuctionEnd = DateTime.UtcNow.AddDays(60),
                Motorcycle = new Motorcycle
                {
                    Make = "MV Agusta",
                    Model = "Brutale",
                    Color = "Black/Red",
                    Mileage = 250,
                    Year = 2021,
                    ImageUrl = "https://www.mvagusta.com/images/main/brutale-xl.png",
                    Displacement = 798,
                    FunFactor = 9,
                    HorsePower = 112,
                    Torque = 70,
                    MotorcycleType = MotorcycleType.Naked,

                }
            },
            new Auction{
                Id = new Guid(),
                Status = Status.Live,
                ReservePrice = 90000,
                Seller = "alice",
                AuctionEnd = DateTime.UtcNow.AddDays(60),
                Motorcycle = new Motorcycle
                {
                    Make = "MV Agusta",
                    Model = "Brutale 1000rr",
                    Color = "Black/Red",
                    Mileage = 250,
                    Year = 2021,
                    ImageUrl = "https://motogen.pl/wp-content/uploads/2019/12/mv2-640x400.jpg",
                    Displacement = 1000,
                    FunFactor = 10,
                    HorsePower = 208,
                    Torque = 120,
                    MotorcycleType = MotorcycleType.HyperNaked,

                }
            },


            };

        sprawdzoneDbContext.AddRange(auctions);
        sprawdzoneDbContext.SaveChanges();

    }
}