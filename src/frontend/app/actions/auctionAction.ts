'use server'

import {Auction, Bid, PagedResult} from "@/types";
import {FieldValues} from "react-hook-form";
import {revalidatePath} from "next/cache";
import { fetchWrapper } from "../lib/fetchWrapper";

export async function getData(query:string): Promise<PagedResult<Auction>> {
    return await fetchWrapper.get(`search${query}`)
}

export async function createAuction(data:FieldValues) {
    return await fetchWrapper.post("auctions",data)
}

export async function getDetailedViewData(id:string): Promise<Auction> {
    return await fetchWrapper.get(`auctions/${id}`)
}

export async function updateAuction(id:string,data:FieldValues) {
    const res = await fetchWrapper.put(`auctions/${id}`,data)
    revalidatePath(`/auctions/${id}`)
    return res
}

export async function deleteAuction(id:string) {
    console.log(id)
    return await fetchWrapper.del(`auctions/${id}`)
}

export async function getBidForAuction(auctionId:string): Promise<Bid[]> {
    return await fetchWrapper.get(`bids/${auctionId}`)
}

export async function placeBidForAuction(auctionId:string,amount:number) {
    return await fetchWrapper.post(`bids?auctionId=${auctionId}&amount=${amount}`,{})
}
