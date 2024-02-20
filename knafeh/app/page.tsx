"use client";
import Posts from "@/components/posts";
import WritePost from "@/components/write-post";

export default function Home() {
  return (
    <>
      <WritePost />
      <Posts />
    </>
  );
}
