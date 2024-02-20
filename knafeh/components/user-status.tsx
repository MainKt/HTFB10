"use client"
import { STATUS_CONTRACT_ADDRESS } from "@/constants/constants";
import { ConnectWallet, useAddress, useConnect, useContract, useContractRead, useDisconnect } from "@thirdweb-dev/react"
import { Web3Button } from "@thirdweb-dev/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


const userStatus = () => {
    const address = useAddress()
    const disconnect = useDisconnect();

    const [newStatus, setNewStatus] = useState("");
    const [characterCount, setCharacterCount] = useState(0);

    const { contract } = useContract(STATUS_CONTRACT_ADDRESS);
    const { data: status, isLoading } = useContractRead(
        contract,
        "getStatus",
        [address]
    )

    if (!address) {
        return <div>
            <ConnectWallet modalSize="compact" />
            <p>Please connect your wallet</p>
        </div>
    }

    return (
        <>
            <Link href={"/account/${address}"}>
                <p>{address.slice(0, 6)}...{address.slice(-4)}</p>
            </Link>
            <Button onClick={() => disconnect()}>Disconnect</Button>

            {!isLoading && status && <p>{status}</p>}

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Update</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>New Status</DialogTitle>
                        <DialogDescription>
                            <p>Update your status on the blockchain</p>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Web3Button contractAddress={STATUS_CONTRACT_ADDRESS} action={(contract) => contract.call("setStatus", [newStatus])}>Update Status</Web3Button>
        </>
    )
}

export default userStatus