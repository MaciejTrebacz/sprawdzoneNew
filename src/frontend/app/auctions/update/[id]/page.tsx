import React from 'react';
import Heading from "@/app/components/Heading";
import AuctionForm from "@/app/auctions/AuctionForm";
import {getDetailedViewData} from "@/app/actions/auctionAction";

async function Update({params} : {params: {id:string}}) {
    const auction = await getDetailedViewData(params.id)

    return (
        <div className={'mx-auto max-w-[75] shadow-lg p-10 bg-white rounded-lg'}>
            <Heading title={'Update your auction'} subtitle={'Please update the details of your auction'}/>
            <AuctionForm auctionToUpdate={auction}/>
        </div>
    );
}

export default Update;