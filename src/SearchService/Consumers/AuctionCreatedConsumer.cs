﻿using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
{
    private readonly IMapper _mapper;

    public AuctionCreatedConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }
    public async Task Consume(ConsumeContext<AuctionCreated> context)
    {
        Console.WriteLine($"Consuming auction created {context.Message.Make}{context.Message.Model}");

        var item = _mapper.Map<Motorcycle>( context.Message );

        if (item.Model == "Foo") throw new ArgumentException("cannot have name Foo");

        await item.SaveAsync();
    }
}