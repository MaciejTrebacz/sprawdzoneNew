using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.RequestHelpers;

namespace SearchService.Controllers
{
    [ApiController]
    [Route("api/search")]
    public class SearchController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Motorcycle>>> SearchMotorcycles(
            [FromQuery] SearchParams searchParams)
        {
            var query = DB.PagedSearch<Motorcycle,Motorcycle>();

            if (!string.IsNullOrEmpty(searchParams.SearchTerm))
            {
                query.Match(Search.Full, searchParams.SearchTerm).SortByTextScore();
            }

            query = searchParams.OrderBy switch
            {
                "make" => query.Sort(x => x.Ascending(e => e.Make)),
                "new" => query.Sort(x => x.Descending(e => e.CreatedAt)),
                _ => query.Sort(x => x.Ascending(e => e.AuctionEnd)),
            };


            query = searchParams.FilterBy switch
            {
                "finished" => query.Match(x=>x.AuctionEnd < DateTime.UtcNow),
                "endingSoon" => query
                    .Match(x=>x.AuctionEnd < DateTime.UtcNow
                        .AddDays(1) && x.AuctionEnd > DateTime.UtcNow),
                _ => query.Match(x=>x.AuctionEnd > DateTime.UtcNow)
            };

            if (!string.IsNullOrEmpty(searchParams.Seller))
            {
                query.Match(Search.Full, searchParams.Seller);
                query.Match(x=>x.Seller == searchParams.Seller);
            }

            if (!string.IsNullOrEmpty(searchParams.Winner))
            {
                query.Match(Search.Full, searchParams.Winner).SortByTextScore();
            }


            query.PageNumber(searchParams.PageNumber);
            query.PageSize(searchParams.PageSize);

            var result = await query.ExecuteAsync();

            return Ok(new PaginatedSearch
            {
                ListOfMotorcycles = result.Results,
                PageCount = result.PageCount,
                TotalCount = result.TotalCount,
            });
        } 
    }
}
