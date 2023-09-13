'use client'


import React from 'react';
import {PiMotorcycleFill} from "react-icons/pi";
import {useParamsStore} from "@/hooks/useParamsStore";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";

function Logo() {
    const reset = useParamsStore(state => state.reset)
    const pathname = usePathname()
    const router = useRouter()


    function doReset() {
        if (pathname !== '/') router.push('/')
        reset()
    }

    return (
        <div onClick={doReset} className={'cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500'}>
            <PiMotorcycleFill size={34}/>
            <div>Sprawdzone.pl</div>
        </div>
    );
}

export default Logo;