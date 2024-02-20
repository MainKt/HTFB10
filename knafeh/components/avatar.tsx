import React, { useMemo } from 'react'
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

const Avatar = (seed: any) => {
    const avatar = useMemo(() => {
        return createAvatar(lorelei, {
            seed: `${seed.seed}`,
            size: 128,
        }).toDataUriSync();
    }, []);

    return <img className="float-start inline rounded-full h-10 w-10 object-cover shadow-lg" src={avatar} alt="Avatar" />;

}

export default Avatar