using MongoDB.Entities;
using SearchService.Models;

namespace SearchService;

public class AuctionSvcHttpClient
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public AuctionSvcHttpClient(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }

    public async Task<List<Motorcycle>> GetMotorcyclesForSearchDb()
    {
        var lastUpdated = await DB.Find<Motorcycle, string>()
            .Sort(x => x.Descending(motorcycle => motorcycle.UpdatedAt))
            .Project(x => x.UpdatedAt.ToString())
            .ExecuteFirstAsync();  // getting last date 

        return await _httpClient.GetFromJsonAsync<List<Motorcycle>>(
            _config["AuctionServiceUrl"] + "/api/auctions?date=" + lastUpdated);

    }

}