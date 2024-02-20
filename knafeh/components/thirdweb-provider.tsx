"use client";
import { ACCOUNT_FACTORY } from "@/constants/contracts";
import { ThirdwebProvider, coinbaseWallet, embeddedWallet, metamaskWallet, smartWallet, walletConnect } from "@thirdweb-dev/react";

import React from 'react'

const ThirdwebWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThirdwebProvider
            activeChain={"mumbai"}
            clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
            supportedWallets={[
                smartWallet(embeddedWallet(), {
                    factoryAddress: ACCOUNT_FACTORY,
                    gasless: true
                }),
                metamaskWallet(),
                coinbaseWallet(),
                walletConnect(),
            ]}
        >
            {children}
        </ThirdwebProvider>
    )
}

export default ThirdwebWrapper