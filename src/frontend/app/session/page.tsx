import React from 'react';
import Heading from "@/app/components/Heading";
import {getSession, getTokenWorkaround} from "@/app/actions/authActions";
import AuthTest from "@/app/session/AuthTest";
import {getToken} from "next-auth/jwt";

async function Session() {
    const session = await getSession()
    const token = await getTokenWorkaround()

    return (
        <>
            <Heading title={'Session dashboard'}/>
            <div className="bg-blue-200 border-2 border-blue-500">
                <h3 className={'text-lg'} content={'Session data'}/>
                <pre>{JSON.stringify(session, null,2)}</pre>
            </div>

            <div className="bg-green-200 border-2 border-green-500 mt-4">
                <h3 className={'text-lg'} content={'Token data'}/>
                <pre className={'overflow-auto'}>{JSON.stringify(token, null,2)}</pre>
            </div>

            <div className={"mt-4"}>
                <AuthTest/>
            </div>

        </>
    );
}

export default Session;