'use server'

import {Auction, PagedResult} from "@/types";
import {fetchWrapper} from "@/lib/fetchWrapper";
import {FieldValues} from "react-hook-form";

export async function getData(query:string): Promise<PagedResult<Auction>> {
    return await fetchWrapper.get(`search${query}`)
}

export async function updateAuctionTest() {
    const data = {
        mileage: Math.floor(Math.random() *100000) +1
    }
    return await fetchWrapper.put("auctions/c8c3ec17-01bf-49db-82aa-1ef80b833a9f",data)
}

export async function createAuction(data:FieldValues) {
    return await fetchWrapper.post("auctions",data)
}

export async function getDetailedViewData(id:string): Promise<Auction> {
    return await fetchWrapper.get(`auctions/${id}`)
}