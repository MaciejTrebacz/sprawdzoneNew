using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/auctions")]
public class AuctionsController : ControllerBase
{
    private readonly SprawdzoneDbContext _context;
    private readonly IMapper _mapper;

    public AuctionsController(SprawdzoneDbContext context,IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions()
    {
        var auctions = await _context.Auctions
            .Include(x => x.Motorcycle)
            .OrderBy(x => x.Motorcycle.HorsePower)
            .ToListAsync();
        return _mapper.Map<List<AuctionDto>>(auctions);
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
        var result = await _context.SaveChangesAsync();
        return result > 0 
            ? CreatedAtAction(nameof(GetAuctionById),new {auction.Id}, _mapper.Map<AuctionDto>(auction))
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