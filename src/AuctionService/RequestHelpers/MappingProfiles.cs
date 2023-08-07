using AuctionService.DTOs;
using AuctionService.Models;
using AutoMapper;
using Contracts;

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
        CreateMap<Auction,AuctionUpdated>().IncludeMembers(m=>m.Motorcycle);
        CreateMap<Motorcycle,AuctionUpdated>();
        CreateMap<AuctionUpdated,Motorcycle>();


        CreateMap<UpdateAuctionDto, Auction>()
            .ForMember(d => d.Motorcycle, o => o.MapFrom(s => s));
        CreateMap<UpdateAuctionDto, Motorcycle>();
        CreateMap<AuctionDto, AuctionCreated>();
    }
    
}