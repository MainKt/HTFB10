import Posts from '@/components/posts'
import User from '@/components/user'
import React from 'react'

interface Prop {
    params: {
        profile: string
    }
}

const page = ({ params: { profile } }: Prop) => {
    return (
        <>
            <User address={profile} />
            <Posts compareBy={profile} />
        </>
    )
}

export default page