"use client";
import { ConnectWallet } from '@thirdweb-dev/react'
import React, { use, useState } from 'react'
import Link from 'next/link';
import { grandHotel } from '@/utils/font';
import { BotIcon, HomeIcon } from 'lucide-react';
import { ArchiveXIcon } from 'lucide-react';

const NavBar = () => {
    const [addServicemodalOpen, setAddServiceModalOpen] = useState(false)
    const [revokeServicemodalOpen, setRevokeServiceModalOpen] = useState(false)
    const [serviceIconVisible, setServiceIconVisible] = useState(false)
    const [isHovered, setIsHovered] = useState(false);

    return (
        <nav className='lg:fixed lg:left-0 sm:top-0 lg:pl-10 lg:pt-5'>
            <ul className='lg:flex-col sm:flex-row'>
                <li className='lg:mb-8 sm:mr-4'>
                    <h1 className={`text-6xl ${grandHotel.className}`}><strong>Knafeh</strong></h1>
                </li>
                <li><Link role='anchor' href="/" className='flex items-center'>
                    <HomeIcon className='mr-1' />Home
                </Link>
                </li>
                {serviceIconVisible &&
                    <li className='flex items-center' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        <BotIcon className='mr-1' />
                        <Link role='anchor' href="/chat">AI Chat
                        </Link>
                        {isHovered &&
                            <ArchiveXIcon onClick={() => setRevokeServiceModalOpen(true)} color='red' className='ml-2' />
                        }
                    </li>
                }
                <li>
                    <button onClick={() => setAddServiceModalOpen(!addServicemodalOpen)}>Add service</button>
                </li>
                <li><ConnectWallet /></li>
            </ul>
            {addServicemodalOpen && (
                <dialog open>
                    <article>
                        <header>
                            <h2>Add a third party service</h2>
                        </header>
                        <p>
                            <blockquote>
                                All your user data and activity will be leased out to the third party service.
                            </blockquote>
                        </p>
                        <ul className='flex-row justify-center'>
                            <li><label htmlFor="service-url">Service URL</label></li>
                            <li><input id="service-url" type="url" /></li>
                        </ul>
                        <footer className='flex-row justify-center items-center'>
                            <button className="p-2" onClick={() => setAddServiceModalOpen(false)}>Cancel</button>
                            <button className='p-2' onClick={() => {
                                setAddServiceModalOpen(false)
                                setServiceIconVisible(true)
                            }}>Confirm</button>
                        </footer>
                    </article>
                </dialog>
            )}
            {
                revokeServicemodalOpen && (
                    <dialog open>
                        <article>
                            <header>
                                <h2>Revoke the service</h2>
                            </header>
                            Are you sure you want to revoke the AI chat service?
                            <footer className='flex-row justify-center items-center'>
                                <button className="p-2" onClick={() => setRevokeServiceModalOpen(false)}>Cancel</button>
                                <Link href={"/"}>
                                    <button className='p-2' onClick={() => {
                                        setRevokeServiceModalOpen(false)
                                        setServiceIconVisible(false)
                                    }}>Revoke</button>
                                </Link>
                            </footer>
                        </article>
                    </dialog>
                )
            }
        </nav>
    )
}

export default NavBar