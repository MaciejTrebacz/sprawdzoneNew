'use client'

import React from 'react';
import {Button, Dropdown} from "flowbite-react";
import Link from "next/link";
import {User} from "next-auth";
import {HiUser} from "react-icons/hi";
import {AiFillCar, AiFillTrophy, AiOutlineLogout} from "react-icons/ai";
import {FaMotorcycle} from "react-icons/fa";
import {SiSessionize} from "react-icons/si";
import {signout} from "next-auth/core/routes";
import {signOut} from "next-auth/react";

type Props = {
    user: Partial<User>
}


function UserActions({user}:Props) {
    return (
        <Dropdown
            inline
            label={`Welcome ${user.name}`}
        >
            <Dropdown.Item icon={HiUser}>
                <Link href={'/'}>
                    My auctions
                </Link>
            </Dropdown.Item>

            <Dropdown.Item icon={AiFillTrophy}>
                <Link href={'/'}>
                    Auctions won
                </Link>
            </Dropdown.Item>

            <Dropdown.Item icon={FaMotorcycle}>
                <Link href={'/'}>
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