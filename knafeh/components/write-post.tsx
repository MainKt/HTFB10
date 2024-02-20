"use client";
import { Web3Button, useContract, useContractWrite } from '@thirdweb-dev/react';
import { POSTBOARD } from '@/constants/contracts';
import React, { useState } from 'react'
import { posix } from 'path';

const WritePost = () => {
    const [content, setContent] = useState("");
    const { contract: postBoardContract } = useContract(POSTBOARD);
    const { mutateAsync, isLoading, error } = useContractWrite(postBoardContract, "createPost");
    return (
        <article>
            <textarea
                placeholder="Write something"
                onChange={(e) => {
                    setContent(e.target.value)
                    console.log(e.target.value)
                }}
            >
            </textarea>
            <footer className='container flex justify-center'>
                <Web3Button
                    contractAddress={POSTBOARD}
                    action={() => mutateAsync({ args: [content] })}
                >
                    Post
                </Web3Button>
            </footer>
        </article >
    )
}

export default WritePost