'use client'

import React, {useEffect, useState} from 'react';
import AuctionCard from "@/app/auctions/AuctionCard";
import AppPagination from "@/app/components/AppPagination";
import {getData} from "@/app/actions/auctionAction";
import {Auction, PagedResult} from "@/types";
import Filters from './Filters';
import {useParamsStore} from "@/hooks/useParamsStore";
import {shallow} from "zustand/shallow";
import qs from 'query-string'
import EmptyFilter from "@/app/components/EmptyFilter";


 function Listings() {
     const [data,setData] = useState<PagedResult<Auction>>()
     const params = useParamsStore(state => ({
         pageNumber: state.pageNumber,
         pageSize: state.pageSize,
         searchTerm: state.searchTerm,
         orderBy: state.searchBy,
         filterBy: state.filterBy,

     }),shallow) // give us all params in single object
     // this is the way to get all nesesery variables we could go with state=>state to get it all
     const setParams = useParamsStore(state=>state.setParams)
     const url = qs.stringifyUrl({url: '',query:params})

     function setPageNumber(pageNumber:number) {
         setParams({pageNumber})
     }
     
     useEffect(() => {
         getData(url).then(data=>{
             setData(data)
         })
     },[url]);

     if (!data) return <h3>Loading....</h3>
     
     return (
        <>     
         <Filters/>
            {data.totalCount ===0 
                ? (
                <EmptyFilter showReset />
            )   : <>
                    <div className={'grid grid-cols-4 gap-6'}>
                        {data.listOfMotorcycles.map(auction=>(
                            <AuctionCard auction={auction} key={auction.id}/>
                        ))}
                    </div>
                    <div className={'inline-flex space-x-4 p-1 justify-center mt-9'}>
                        <AppPagination pageChanged={setPageNumber}
                                       currentPage={params.pageNumber}
                                       pageCount={data.pageCount}/>
                    </div>
                </>
            }
        </>
 
    );
}

export default Listings;