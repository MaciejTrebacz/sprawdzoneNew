'use server'

import {Auction, PagedResult} from "@/types";
import {fetchWrapper} from "@/lib/fetchWrapper";
import {FieldValues} from "react-hook-form";
import {revalidatePath} from "next/cache";

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