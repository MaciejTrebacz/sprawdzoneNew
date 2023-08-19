import React from 'react';
import Image from "next/image";
import {CountdownTimer} from "@/app/auctions/CountdownTimer";
import MotorcycleImage from "@/app/auctions/MotorcycleImage";
import {Auction} from "@/types";
import {Button} from "flowbite-react";

type Props = {
    auction: Auction
}

function AuctionCard({auction}: Props) {
    return (
        <a href={'#'} className={'group'}>
            <div className={'w-full bg-gray-200 aspect-w-16 aspect-h-10 rounded-lg overflow-hidden'}>
                <div>
                    <MotorcycleImage imageUrl={auction.imageUrl}/>
                    <div className={'absolute top-0 left-px'}>
                        <CountdownTimer auctionEnd={auction.auctionEnd}/>
                    </div>
                </div>
            </div>
            <div className={"flex justify-between items-center mt-4"}>
                <h3 className={"text-gray-700"}>{auction.make} {auction.model}</h3>
                <p className="font-semibold text-sm">{auction.year}</p>
            </div>
        </a>
    )
}


export default AuctionCard;