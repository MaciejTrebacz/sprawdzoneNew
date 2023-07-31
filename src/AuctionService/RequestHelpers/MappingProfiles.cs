﻿using AuctionService.DTOs;
using AuctionService.Models;
using AutoMapper;

namespace AuctionService.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Auction, AuctionDto>().IncludeMembers(x => x.Motorcycle);
        CreateMap<Motorcycle, AuctionDto>();
        CreateMap<CreateAuctionDto, Auction>()
            .ForMember(d => d.Motorcycle, o => o.MapFrom(s => s));
        CreateMap<CreateAuctionDto, Motorcycle>();


    }
    
}