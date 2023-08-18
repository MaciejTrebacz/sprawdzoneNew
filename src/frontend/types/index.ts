export type PagedResult<T> = {
    listOfMotorcycles: T[]
    pageCount: number
    totalCount: number
}

export type Auction = {
    reservePrice: number
    seller: string
    winner?: string
    soldAmount: number
    currentHighBid: number
    createdAt: string
    updatedAt: string
    auctionEnd: string
    status: string
    make: string
    model: string
    year: number
    horsePower: number
    torque: number
    displacement: number
    color: string
    mileage: number
    imageUrl: string
    id: string
}