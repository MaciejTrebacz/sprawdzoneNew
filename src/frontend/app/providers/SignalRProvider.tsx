'use client'

import React, {ReactNode, useEffect, useState} from 'react';
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {useAuctionStore} from "@/hooks/useAuctionStore";
import {useBidStore} from "@/hooks/useBidStore";
import {Auction, AuctionFinished, Bid} from "@/types";
import {User} from "next-auth";
import {Toast} from "flowbite-react";
import AuctionCreatedToast from "@/app/components/AuctionCreatedToast";
import toast from "react-hot-toast";
import AuctionFinishedToast from "@/app/components/AuctionFinishedToast";
import {getDetailedViewData} from "@/app/actions/auctionAction";

type Props = {
    children: ReactNode
    user: User |null
}

function SignalRProvider({children,user}: Props) {
    const [connection,setConnection] = useState<HubConnection | null>(null)
    const setCurrentPrice = useAuctionStore(state=>state.setCurrentPrice)
    const addBid = useBidStore(state=>state.addBid)

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(process.env.NEXT_PUBLIC_NOTIFY_URL!)
            .withAutomaticReconnect()
            .build()
        setConnection(newConnection)
    }, []);

    useEffect(() => {
        if (connection){
            connection.start()
                .then(()=>{
                    console.log("Connected to notification hub")
                    
                    connection.on('BidPlaced',(bid:Bid)=>{
                        if (bid.bidStatus.includes("Accepted")) {
                            setCurrentPrice(bid.auctionId,bid.amount)
                        }
                        addBid(bid)
                    })
                    connection.on('AuctionCreated', (auction:Auction)=>{
                        return toast(<AuctionCreatedToast auction={auction}/>,{duration:3000})
                    })
                    connection.on('AuctionFinished', async (finishedAuction: AuctionFinished) => {
                        console.log(finishedAuction)
                        const auction = getDetailedViewData(finishedAuction.auctionId)
                        console.log(auction)
                        return toast.promise(auction, {
                            loading: 'Loading',
                            success: (auction) => <AuctionFinishedToast finishedAuction={finishedAuction} auction={auction}/>,
                            error: (err) => 'Auction Finished'
                        }, {success: {duration: 7000, icon: null}})
                    })
                }).catch(error=>"Error")
        }
            return () => {
                connection?.stop()
            }
    }, [connection,setCurrentPrice,addBid,user?.username]);


    return (
        children
    );
}

export default SignalRProvider;