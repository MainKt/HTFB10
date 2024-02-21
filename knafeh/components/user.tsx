"use client"
import React from 'react'
import Avatar from './avatar'
import { useContract, useContractEvents, useContractRead } from '@thirdweb-dev/react';
import { POSTBOARD } from '@/constants/contracts';

const User = ({ address }: { address: any }) => {
    const { contract: postBoardContract } = useContract(POSTBOARD);
    const { data: posts, isLoading } = useContractEvents(postBoardContract, "ProfileUpdated", {
        subscribe: true
    });

    return (
        <article>
            <header>
                <Avatar seed={address} />
                <h2>{address.slice(0, 8)}</h2>
            </header>
            <h2>About me</h2>
            <br />
            <small> Loading bio...  </small>
        </article>
    )

    return (
        <>
            {isLoading ?
                (
                    <article>
                        <header>
                            <Avatar seed={address} />
                            <h2>{address.slice(0, 8)}</h2>
                        </header>
                        <h2>About me</h2>
                        <br />
                        Loading bio...
                    </article>
                )
                : posts?.filter(
                    (post: any) => post.args?.address === address
                ).map((post: any, index: number) => (
                    <article key={index}>
                        <header>
                            <Avatar seed={address} />
                            <p>{address}</p>
                            <p>{post.data.displayName}</p>
                        </header>
                        <h2>About me</h2>
                        <br />
                        {post.data.bio}
                    </article>
                ))}
        </>
    )
}

export default User