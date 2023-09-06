'use client'

import { Button } from 'flowbite-react';
import React from 'react';
import {signIn} from "next-auth/react";

function LoginButton() {
    return (
        <Button outline onClick={()=> signIn('id-server', {callbackUrl: '/'})}>
            Login here!
        </Button>
    );
}

export default LoginButton;