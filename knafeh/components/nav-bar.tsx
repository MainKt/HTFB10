"use client";
import { ConnectWallet } from '@thirdweb-dev/react'
import React from 'react'
import Link from 'next/link';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <h1 className='text-4xl'><strong>Knafeh</strong></h1>
                </li>
            </ul>
            <ul>
                <li><Link role='anchor' href="/">Home</Link></li>
                <li><Link role='anchor' href="/chat">AI Chat</Link></li>
                <li><button className="secondary">Add service</button></li>
                <li><ConnectWallet /></li>
            </ul>
        </nav>
    )
}

export default NavBar