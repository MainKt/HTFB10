"use client"
import { POSTBOARD } from "@/constants/contracts";
import { useContract, useContractEvents, useContractRead } from "@thirdweb-dev/react";

const Posts = () => {
    const { contract: postBoardContract } = useContract(POSTBOARD);
    const { data: posts, isLoading } = useContractEvents(postBoardContract, "PostCreated", {
        subscribe: true
    });

    return (
        <>
            {!isLoading && posts?.map((post, index) => <article>
                <header>{post.data.author}</header>
                {post.data.content}
                <footer>{new Date(post.data.timestamp.toNumber() * 1000).toLocaleString()}</footer>
            </article>)
            }
        </>
    )
}

export default Posts

