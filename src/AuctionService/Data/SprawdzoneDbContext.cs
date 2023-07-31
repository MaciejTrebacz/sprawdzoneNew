using AuctionService.Models;
using AutoMapper.Configuration;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Data;

public class SprawdzoneDbContext :DbContext
{
    public SprawdzoneDbContext(DbContextOptions options) : base(options)
    {
        
    }

    public DbSet<Auction> Auctions { get; set; }
}