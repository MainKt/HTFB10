import { POSTBOARD } from "@/constants/contracts";
import { useContract, useContractEvents } from "@thirdweb-dev/react";

const Posts = () => {
    const { contract: postBoardContract } = useContract(POSTBOARD);
    const { data: posts, isLoading, error } = useContractEvents(postBoardContract, "PostCreated", {
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