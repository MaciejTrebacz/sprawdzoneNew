import React from 'react';
import AuctionCard from "@/app/auctions/AuctionCard";
import {Auction, PagedResult} from "@/types";
import AppPagination from "@/app/components/AppPagination";

async function getData(): Promise<PagedResult<Auction>> {
    const res = await fetch('http://localhost:6001/search?pageSize=1')
    if (!res.ok) throw new Error('Failed to fetch data')

    return res.json()
}

async function Listings() {
    const data = await getData()

    return (
        <>       
            <div className={'grid grid-cols-4 gap-6'}>
                {data && data.listOfMotorcycles.map(auction=>(
                    <AuctionCard auction={auction} key={auction.id}/>
                ))}
            </div>
            <div className={'flex justify-center mt-9 items-center'}>
                <AppPagination currentPage={1} pageCount={data.pageCount}/>
            </div>
            
        </>
 
    );
}

export default Listings;