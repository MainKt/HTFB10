"use client";
import { Web3Button, useContract, useContractWrite } from '@thirdweb-dev/react';
import { POSTBOARD } from '@/constants/contracts';
import React, { useRef, useState } from 'react'

const WritePost = () => {
    const [content, setContent] = useState("");
    const { contract: postBoardContract } = useContract(POSTBOARD);
    const { mutateAsync, isLoading, error } = useContractWrite(postBoardContract, "createPost");
    const textareaRef: any = useRef(null);
    const clearTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.value = '';
        }
    };
    return (
        <article>
            <textarea
                placeholder='Write a post...'
                ref={textareaRef}
                name="Write something"
                onChange={(e) => {
                    setContent(e.target.value)
                }}
                maxLength={280}
                style={{ resize: "none", height: "20vh" }}
                className='p-4'
            >
            </textarea>
            <footer className='container flex justify-center'>
                <Web3Button
                    contractAddress={POSTBOARD}
                    action={() => {
                        mutateAsync({ args: [content] })
                        clearTextarea()
                    }}
                    className='flex-1'
                >
                    Post
                </Web3Button>
            </footer>
        </article >
    )
}

export default WritePost