'use client'

import React, {useState} from 'react';
import Image from 'next/image';

type Props={
    imageUrl:string
}

function MotorcycleImage({imageUrl}:Props) {

    const [isLoading, setIsLoading] = useState(true);
    return (
        <Image
            src={imageUrl}
            alt={'motorcycle image'}
            fill
            priority // to dont attempt to lazy load images
            className={`'object-cover group-hover:opacity-75 duration-700 ease-in-out
            ${isLoading ? 'grayscale blur-2xl scale-110': 'grayscale-0 blur-0 scale-100'}
            '`} // cover avalaible area keeping aspect ratio
            sizes={'(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw'}
            onLoadingComplete={()=>setIsLoading(false)}
        />
    );
}

export default MotorcycleImage;