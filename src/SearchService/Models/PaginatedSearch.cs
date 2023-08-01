namespace SearchService.Models;

public class PaginatedSearch
{
    public IReadOnlyList<Motorcycle> ListOfMotorcycles { get; set; }
    public int PageCount { get; set; }
    public long TotalCount { get; set; }
}