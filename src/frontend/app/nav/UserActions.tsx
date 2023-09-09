'use client'

import React from 'react';
import {Button, Dropdown} from "flowbite-react";
import Link from "next/link";
import {User} from "next-auth";
import {HiUser} from "react-icons/hi";
import {AiFillTrophy, AiOutlineLogout} from "react-icons/ai";
import {FaMotorcycle} from "react-icons/fa";
import {SiSessionize} from "react-icons/si";
import {signOut} from "next-auth/react";
import {usePathname, useRouter} from "next/navigation";
import {useParamsStore} from "@/hooks/useParamsStore";

type Props = {
    user: Partial<User>
}


function UserActions({user}:Props) {
    const router = useRouter()
    const pathname = usePathname()
    const setParams = useParamsStore(state => state.setParams)

    function setWinner(){
        setParams({winner: user.username,seller:undefined})
        if (pathname != '/') router.push('/')
    }
    function setSeller(){
        setParams({seller: user.username,winner:undefined})
        if (pathname != '/') router.push('/')
    }


    return (
        <Dropdown
            inline
            label={`Welcome ${user.name}`}
        >
            <Dropdown.Item icon={HiUser} onClick={setSeller}>
                    My auctions
            </Dropdown.Item>

            <Dropdown.Item icon={AiFillTrophy} onClick={setWinner}>
                    Auctions won
            </Dropdown.Item>

            <Dropdown.Item icon={FaMotorcycle}>
                <Link href={'/auctions/create'}>
                    Sell my motorcycle
                </Link>
            </Dropdown.Item>

            <Dropdown.Item icon={SiSessionize}>
                <Link href={'/session'}>
                    Sessions (dev only)
                </Link>
            </Dropdown.Item>

            <Dropdown.Divider/>

            <Dropdown.Item icon={AiOutlineLogout} onClick={()=> signOut({callbackUrl: '/'})}>
                Sign out
            </Dropdown.Item>

        </Dropdown>
    );
}

export default UserActions;