import React from 'react';
import Heading from "@/app/components/Heading";
import AuctionForm from "@/app/auctions/AuctionForm";

function Create() {
    return (
        <div className={'mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg'}>
            <Heading title={'Sell your motorcycle!'} subtitle={'Please enter details of your motorcycle'}/>
            <AuctionForm/>

        </div>
    );
}

export default Create;