import React from 'react';
import {PiMotorcycleFill} from "react-icons/pi";
import Search from "@/app/nav/Search";
import Logo from "@/app/nav/Logo";
import {useParamsStore} from "@/hooks/useParamsStore";

function Navbar() {
    
    return (
        <header className={'sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md'}>
            <Logo/>
            <Search/>
            <div>Login</div>
        </header>
    );
}

export default Navbar;