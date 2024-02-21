"use client"
import { POSTBOARD } from "@/constants/contracts";
import { useContract, useContractEvents, useContractRead } from "@thirdweb-dev/react";
import Post from "./post";

interface Prop {
    compareBy: any;
}

const Posts = ({ compareBy }: Prop = {
    compareBy: "NOTHING"
}) => {
    const { contract: postBoardContract } = useContract(POSTBOARD);
    const { data: currentPosts, isLoading } = useContractEvents(postBoardContract, "PostCreated", {
        subscribe: true
    });

    return (
        <>
            {!isLoading && currentPosts?.filter((post) => compareBy === "NOTHING" || post.data.author === compareBy).map((post) => <Post post={post} />)}
        </>
    )
}

export default Posts

