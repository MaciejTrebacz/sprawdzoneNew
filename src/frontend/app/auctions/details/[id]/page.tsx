import React from 'react';
import {getDetailedViewData} from "@/app/actions/auctionAction";
import Heading from "@/app/components/Heading";
import {CountdownTimer} from "@/app/auctions/CountdownTimer";
import MotorcycleImage from "@/app/auctions/MotorcycleImage";
import DetailedSpecs from "@/app/auctions/details/[id]/DetailedSpecs";
import {getCurrentUser} from "@/app/actions/authActions";
import EditButton from "@/app/auctions/details/[id]/EditButton";
import DeleteButton from "@/app/auctions/details/[id]/DeleteButton";

async function Details({params} : {params: {id:string}}) {
    const motorcycleAuction = await getDetailedViewData(params.id)
    const user = await getCurrentUser();


    return (
        // TODO: update details add more of them
        <div>
            <div className={'flex justify-between'}>
                <div className="flex">
                    <Heading title={`${motorcycleAuction.make} ${motorcycleAuction.model}`}/>
                    {user?.username === motorcycleAuction.seller && (
                        <>
                            <EditButton id={motorcycleAuction.id}/>
                            <DeleteButton id={motorcycleAuction.id}/>
                        </>
                    )}
                </div>
                <div className={'flex gap-3'}>
                    <h3 className={'text-2xl font-semibold'}>Time remaining:</h3>
                    <CountdownTimer auctionEnd={motorcycleAuction.auctionEnd}/>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-3">
                <div className="w-full bg-gray-200 aspect-h-10 aspect-w-16 rounded-lg overflow-hidden">
                    <MotorcycleImage imageUrl={motorcycleAuction.imageUrl}/>
                </div>

                <div className="border-2 rounded-lg p-2 bg-gray-100">
                    <Heading title={'bids'}/>
                </div>
            </div>
            <div className="mt-3 grid grid-cols-1 rounded-lg">
                <DetailedSpecs auction={motorcycleAuction}/>
            </div>
        </div>
    );
}

export default Details;