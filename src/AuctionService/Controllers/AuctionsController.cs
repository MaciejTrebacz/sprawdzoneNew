using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/auctions")]
public class AuctionsController : ControllerBase
{
    private readonly SprawdzoneDbContext _context;
    private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publishEndpoint;

    public AuctionsController(SprawdzoneDbContext context,IMapper mapper,IPublishEndpoint publishEndpoint)
    {
        _context = context;
        _mapper = mapper;
        _publishEndpoint = publishEndpoint;
    }

    [HttpGet]
    public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions(string date) // getting only auctions after specific date(updating)
    {
        var query = _context.Auctions
            .OrderBy(x => x.Motorcycle.Make)
            .AsQueryable();// to be able to make another queries

        if (!string.IsNullOrEmpty(date))
        {
            query = query
                .Where(x => x.UpdatedAt
                    .CompareTo(DateTime.Parse(date)
                        .ToUniversalTime()) >0); // CompareTo method return >0 if instance is later than value | and we have to parse our string date to DateTime and change it to universal Time
        }

        return await query.ProjectTo<AuctionDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
    {
        var result = await _context.Auctions
            .Include(x => x.Motorcycle)
            .FirstOrDefaultAsync(x => x.Id == id);
        if (result == null) return NotFound();
        return _mapper.Map<AuctionDto>(result);
    }

    [HttpPost]
    public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto createAuctionDto)
    {
        var auction = _mapper.Map<Auction>(createAuctionDto);
        // TODO: Add current user as seller
        
        await _context.Auctions.AddAsync(auction);

        var newAuction = _mapper.Map<AuctionDto>(auction);

        await _publishEndpoint.Publish(_mapper.Map<AuctionCreated>(newAuction));
        // now publishing is transaction and using entity framework to save messages in postgresql so if we cannot save changes something went wrong here but our databases are SAME
        var result = await _context.SaveChangesAsync();

   


        return result > 0 
            ? CreatedAtAction(nameof(GetAuctionById),new {auction.Id}, newAuction)
            : BadRequest("Something wrong with saving");
    }





    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateAuction(Guid id,UpdateAuctionDto updateAuctionDto)
    {
        var auctionToUpdate = await _context.Auctions
            .Include(x => x.Motorcycle)
            .FirstOrDefaultAsync(x => x.Id == id);
        //TODO: check seller == username
        if (auctionToUpdate == null) return NotFound();

        _mapper.Map(updateAuctionDto, auctionToUpdate);

        var auctionToSend = _mapper.Map<AuctionUpdated>(auctionToUpdate);
        await _publishEndpoint.Publish(auctionToSend);

        var result = await _context.SaveChangesAsync();

        return result > 0
            ? Ok()
            : BadRequest("Something wrong with saving");

    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAuction(Guid id)
    {
        var auctionToDelete = await _context.Auctions.FindAsync(id);
        if (auctionToDelete is null) return NotFound();
        //TODO: check seller == username

        _context.Auctions.Remove(auctionToDelete);
        var result = await _context.SaveChangesAsync();

        return result > 0
            ? Ok()
            : BadRequest("Something wrong with deleting");

    }

}