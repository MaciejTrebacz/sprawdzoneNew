'use client'


import React from 'react';
import {PiMotorcycleFill} from "react-icons/pi";
import {useParamsStore} from "@/hooks/useParamsStore";

function Logo() {
    const reset = useParamsStore(state => state.reset)

    return (
        <div onClick={reset} className={'cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500'}>
            <PiMotorcycleFill size={34}/>
            <div>Sprawdzone.pl Auctions</div>
        </div>
    );
}

export default Logo;