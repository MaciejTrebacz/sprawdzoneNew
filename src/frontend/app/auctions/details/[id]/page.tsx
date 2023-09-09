import React from 'react';
import {getDetailedViewData} from "@/app/actions/auctionAction";
import Heading from "@/app/components/Heading";
import {CountdownTimer} from "@/app/auctions/CountdownTimer";
import MotorcycleImage from "@/app/auctions/MotorcycleImage";

async function Details({params} : {params: {id:string}}) {
    const motorcycleAuction = await getDetailedViewData(params.id)

    return (
        <div>
            <div className={'flex justify-between'}>
                <Heading title={`${motorcycleAuction.make} ${motorcycleAuction.model}`}/>
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
        </div>
    );
}

export default Details;