"use client";
import Posts from "@/components/posts";
import WritePost from "@/components/write-post";

export default function Home() {
  return (
    <>
      <div className="flex flex-col w-full max-w-md pb-12 mx-auto stretch">
        <WritePost />
        <Posts />
      </div>
    </>
  );
}
