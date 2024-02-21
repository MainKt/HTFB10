import React, { useState } from 'react'
import Avatar from './avatar'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { MediaRenderer, useContract, useContractWrite } from '@thirdweb-dev/react'
import { POSTBOARD } from '@/constants/contracts'
import Link from 'next/link'

const Post = ({ post }: {
    post: any
}) => {
    const [likes, setLikes] = useState(0);
    const { contract: postBoardContract } = useContract(POSTBOARD);

    const { mutateAsync: likePost } = useContractWrite(postBoardContract, "likePost");
    const { mutateAsync: unLikePost } = useContractWrite(postBoardContract, "unLikePost");

    return (
        <article>
            <header>
                <Link href={`/${post.data.author}`}>
                    <Avatar seed={post.data.author} />
                    {post.data.displayName === "" ? post.data.author.slice(0, 8) : post.data.displayName}
                </Link>
            </header>
            {post.data.content}
            {post.data.media === "" && <MediaRenderer src={post.data.media} />}
            <footer className="flex items-center">
                <div className="flex items-center w-1/2 mr-6">
                    <Link href={""}>
                        <ArrowUp className="mr-0.5" onClick={() => setLikes(likes + 1)} />
                        <ArrowDown className="mr-3" onClick={() => setLikes(likes - 1)} />
                    </Link>
                    <p>{likes}</p>
                </div>
                <p className="w-1/8"> {new Date(post.data.timestamp.toNumber() * 1000).toLocaleString()} </p>
            </footer>
        </article>
    )
}

export default Post