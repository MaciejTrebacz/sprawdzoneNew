# Sprawdzone.pl

![Logo](https://github.com/MaciejTrebacz/sprawdzoneNew/assets/106514256/f4c54675-df33-47d9-87e8-be96217f8a20)

## Elevating motorcycle auction experience for an auction platform where the community of users provides thorough reviews to assist customers in making informed bids with confidence.

## Main features

- **Search service using MongoDB for querying and MassTransit for communication**
  ![Sprawdzone](https://github.com/MaciejTrebacz/sprawdzoneNew/assets/106514256/8f1203ad-8cf3-4ac3-8b69-ddcbc6a54473)

- **Bidding Service using SignalR for real-time updates**
  ![Screenshot_4](https://github.com/MaciejTrebacz/sprawdzoneNew/assets/106514256/e882d544-9cc8-4cac-9d28-a3eac809f247)

- **Using background service to update finished auctions, synchronizing auctions using gRPC**

## Web App Features

- Microservices app with .NET and Next.js
- Users can perform CRUD operations on Auctions
- User registration and authentication
- Bidding Service using SignalR for real-time updates
- Participants can use live chat for each event.
- Admin panel for managing users and listings [IN PROGRESS]
- User profiles and transaction history
- Generating motorcycle reports [IN PROGRESS]
- Using grpc to synchronize auctions beetwen services 

## Used Technologies

- C#
- .NET
- React
- TypeScript
- NEXT.js
- MassTransit
- RabbitMQ
- MongoDB
- Postgres
- SignalR
- Docker
- SQL Server
- gRPC

## Getting Started

1. Clone this repository:

```
git clone https://github.com/MaciejTrebacz/sprawdzoneNew.git
```

For proper running identity duende server while using microservices please add this line to your C:\Windows\System32\drivers\etc\hosts.txt file 
https://www.hostinger.com/tutorials/how-to-edit-hosts-file
```
127.0.0.1 id.mojesprawdzone.pl app.mojesprawdzone.pl api.mojesprawdzone.pl
```

Make sure you have installed Docker on your computer. After that, you can run the below command from the `/sprawdzoneNew/` directory and get started with the `Sprawdzone.pl` immediately.
```gitbash
docker compose up
```

You should be able to browse the application by using the below URL:
```
https://app.mojesprawdzone.pl
```

Note: Publishing the app on Kubernetes is in progress.


