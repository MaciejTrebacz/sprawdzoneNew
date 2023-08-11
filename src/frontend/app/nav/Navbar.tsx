import React from 'react';
import {PiMotorcycleFill} from "react-icons/pi";

function Navbar() {
    return (
        <header className={'sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md'}>
            <div className={'flex items-center gap-2 text-3xl font-semibold text-red-500'}>
                <PiMotorcycleFill size={34}/>
                <div>Sprawdzone.pl Auctions</div>
            </div>
            <div>Search</div>
            <div>Login</div>
        </header>
    );
}

export default Navbar;