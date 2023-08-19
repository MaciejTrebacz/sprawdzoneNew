'use client'

import React, {useEffect, useState} from 'react';
import AuctionCard from "@/app/auctions/AuctionCard";
import AppPagination from "@/app/components/AppPagination";
import {getData} from "@/app/actions/auctionAction";
import {Auction} from "@/types";


 function Listings() {
     const [auctions, setAuctions] = useState<Auction[]>([])
     const [pageCount, setPageCount] = useState(0)
     const [pageNumber, setPageNumber] = useState(1)

     useEffect(() => {
         getData(pageNumber).then(data=>{
             setAuctions(data.listOfMotorcycles)
             setPageCount(data.pageCount)
         })
     }, [pageNumber]);

     if (auctions.length ===0) return <h3>Loading....</h3>

     return (
        <>       
            <div className={'grid grid-cols-4 gap-6'}>
                {auctions.map(auction=>(
                    <AuctionCard auction={auction} key={auction.id}/>
                ))}
            </div>
            <div className={'inline-flex space-x-4 p-1 justify-center mt-9'}>
                <AppPagination pageChanged={setPageNumber} currentPage={pageNumber} pageCount={pageCount}/>
            </div>
            
        </>
 
    );
}

export default Listings;