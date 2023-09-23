﻿import {Auction, PagedResult} from "@/types";
import {create} from "zustand";

type State={
    listOfMotorcycles: Auction[]
    totalCount: number
    pageCount: number
}

type Actions={
    setData: (data: PagedResult<Auction>)=>void
    setCurrentPrice: (auctionId:string,amount:number)=>void
}

const initialState:State ={
    listOfMotorcycles:[],
    pageCount:0,
    totalCount:0
}

export const useAuctionStore = create<State & Actions>((set)=>({
    ...initialState,
    setData: (data:PagedResult<Auction>) => {
        set(()=>({
            listOfMotorcycles:data.listOfMotorcycles,
            totalCount:data.totalCount,
            pageCount:data.pageCount
        }))
    },
    
    
    setCurrentPrice: (auctionId:string, amount:number) => {
        set((state)=>({
            listOfMotorcycles: state.listOfMotorcycles.map((auction)=>auction.id=== auctionId 
                ? {...auction,currentHighBid:amount}
                : auction)   
        }))
    },
}))