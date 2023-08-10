FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app
EXPOSE 80

# copy all .csproj files and restore as distinct layers.Use of the sam dockerfile in the project to take advantage of docker caching


COPY Sprawdzone.pl.sln Sprawdzone.pl.sln
COPY src/AuctionService/AuctionService.csproj src/AuctionService/AuctionService.csproj
COPY src/SearchService/SearchService.csproj src/SearchService/SearchService.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj
COPY src/GetewayService/GatewayService.csproj src/GetewayService/GatewayService.csproj

#Restore package deps

RUN dotnet restore Sprawdzone.pl.sln

# Copy the app folder over


COPY src/AuctionService src/AuctionService
COPY src/Contracts src/Contracts
WORKDIR /app/src/AuctionService
RUN dotnet publish -c Release -o /app/src/out

# Build runtime image

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app/src/out .
ENTRYPOINT ["dotnet", "AuctionService.dll"]