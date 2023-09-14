'use client'

import React, {useState} from 'react';
import {Button} from "flowbite-react";

function AuthTest() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>();

    function doUpdate(){
        setResult(undefined)
        setLoading(true)

    }

    return (
        <div className={'flex items-center gap-4'}>
            <Button outline isProcessing={loading} onClick={doUpdate}>
                Test Auth
            </Button>
            <div>
                {JSON.stringify(result,null,2)}
            </div>
        </div>

    );
}

export default AuthTest;