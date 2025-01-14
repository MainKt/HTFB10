import React from 'react'
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogTrigger, DialogDescription } from './ui/dialog'

const Modal = () => {
    return (
        <>
            <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Modal