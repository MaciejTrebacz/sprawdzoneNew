using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionUpdatedConsumer : IConsumer<AuctionUpdated>
{
    private readonly IMapper _mapper;

    public AuctionUpdatedConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async  Task Consume(ConsumeContext<AuctionUpdated> context)
    {
        Console.WriteLine($"Updating {context.Message.Model}");

        var motorcycleToUpdate = _mapper.Map<Motorcycle>(context.Message);


        var result = await DB.Update<Motorcycle>()
            .MatchID(context.Message.Id)
            .ModifyOnly(
                b => new { b.Make, b.Model, b.Year, b.HorsePower, b.Torque, b.Displacement, b.Color, b.Mileage },
                motorcycleToUpdate)
            .ExecuteAsync();
    }
}