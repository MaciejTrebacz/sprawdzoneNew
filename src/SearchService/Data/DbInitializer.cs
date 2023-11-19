﻿using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.Services;
using System.Text.Json;

namespace SearchService.Data
{
    public class DbInitializer
    {
        public static async Task InitDb(WebApplication app)
        {
            await DB.InitAsync("SearchDb", MongoClientSettings
                .FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection")));

            await DB.Index<Item>()
                .Key(x => x.Make, KeyType.Text)
                .Key(x => x.Model, KeyType.Text)
                .Key(x => x.FunFactor, KeyType.Text)
                .CreateAsync();

            var count = await DB.CountAsync<Item>();
            
            using var scope = app.Services.CreateScope();
            var httpClinet = scope.ServiceProvider.GetRequiredService<AuctionSvcHttpClient>();
            var items = await httpClinet.GetItemsForSearchDb();

            Console.WriteLine(items.Count);

            if (items.Count > 0) await DB.SaveAsync(items);
            //if (count == 0)
            //{
            //    await Console.Out.WriteLineAsync("No data - will atemp to seed");
            //    var itemData = await File.ReadAllTextAsync("Data/auctions.json");
            //    var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            //    var items = JsonSerializer.Deserialize<List<Item>>(itemData, options);

            //    await DB.SaveAsync(items);
            //}
        }
    }
}
