'use client'

import React, {useState} from 'react';
import {Button} from "flowbite-react";
import Link from "next/link";
import {deleteAuction} from "@/app/actions/auctionAction";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

type Props={
    id: string
}

function DeleteAuction({id}: Props) {
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    function doDelete() {
        setLoading(true)
        deleteAuction(id)
            .then(res=>{
                if (res.error) throw res.error
                router.push('/')
            }).catch(error=>{toast.error(error.message + '' + 'couldnt delete it')
            }).finally(()=>setLoading(false))

    }

    return (
        <Button
            color={'failure'}
            isProcessing={loading}
            onClick={doDelete} >
            Delete Auction
        </Button>
    );
}

export default DeleteAuction;