"use client";
import { ConnectWallet } from '@thirdweb-dev/react'
import React from 'react'
import Link from 'next/link';
import { grandHotel } from '@/utils/font';
import { BotIcon, HomeIcon } from 'lucide-react';

const NavBar = () => {
    return (
        <nav className='fixed left-0 pl-10 pt-5'>
            <ul>
            </ul>
            <ul className='flex-col'>
                <li>
                    <h1 className={`text-6xl ${grandHotel.className}`}><strong>Knafeh</strong></h1>
                </li>
                <li><Link role='anchor' href="/" className='flex items-center'><HomeIcon className='mr-1' />Home</Link></li>
                <li><Link role='anchor' href="/chat" className='flex items-center'><BotIcon className='mr-1' />AI Chat</Link></li>
                <li><button className="secondary">Add service</button></li>
                <li><ConnectWallet /></li>
            </ul>
        </nav>
    )
}

export default NavBar