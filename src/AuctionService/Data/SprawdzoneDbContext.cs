using AuctionService.Models;
using AutoMapper.Configuration;
using MassTransit;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Data;

public class SprawdzoneDbContext :DbContext
{
    public SprawdzoneDbContext(DbContextOptions options) : base(options)
    {
        
    }

    public DbSet<Auction> Auctions { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.AddInboxStateEntity();
        modelBuilder.AddOutboxMessageEntity();
        modelBuilder.AddOutboxStateEntity();
    }
}