import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import Lottie from 'react-lottie'
import { animationDefaultOption, getColor } from '@/lib/utils'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { apiClient } from '@/lib/api-client'
import { HOST, SEARCH_CONTACTS_ROUTE } from '@/utils/constants'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'



const NewDm = () => {

    const [openNewContactModal, setOpenNewContactModal] = useState(false)
    const [searchedContacts, setSearchedContacts] = useState([])

    const searchContacts = async (searchTerm) => {
        try {
            if (searchTerm.length > 0) {
                const response = await apiClient.post(SEARCH_CONTACTS_ROUTE, { searchTerm }, { withCredentials: true });

                if (response.status === 200 && response.data.contacts) {
                    setSearchedContacts(response.data.contacts)
                }
            } else {
                setSearchedContacts([])
            }


        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus className='text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300'
                            onClick={() => { setOpenNewContactModal(true) }}
                        />
                    </TooltipTrigger>
                    <TooltipContent className='bg-[#1c1b1e] mb-3 rounded-lg text-sm p-2 text-white '>
                        <p>Select New Contact</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
                <DialogContent className='bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col '>
                    <DialogHeader>
                        <DialogTitle>Please select a contact</DialogTitle>
                        {/* <DialogDescription>
                            Please select a contact 
                        </DialogDescription> */}
                    </DialogHeader>
                    <div>
                        <Input placeholder="Search Contacts" onChange={(e) => { searchContacts(e.target.value); }} className='rounded-lg p-6 mt-5 bg-[#2c2e3b] border-none' />
                    </div>
                    <ScrollArea className='h-[250px]' >
                        <div className="flex flex-col gap-5">
                            {
                                searchedContacts.map((contact) => (
                                    <div key={contact._id} className='flex gap-3 items-center cursor-pointer'>
                                        <div className='w-12 h-12 relative'>
                                            <Avatar className="w-12 h-12 rounded-full overflow-hidden">
                                                {contact.image ? (
                                                    <AvatarImage
                                                        src={`${HOST}/${contact.image}`}
                                                        alt={`${contact.email}`}
                                                        className="object-cover w-full h-full rounded-full"
                                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }} // Ensure the image fits properly
                                                    />
                                                ) : (
                                                    <div className={`uppercase h-full w-full text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(contact.color)}`}
                                                        style={{ fontSize: '1.5rem' }}>
                                                        {contact.firstName ? contact.firstName.charAt(0) : contact.email.charAt(0)}
                                                    </div>
                                                )}
                                            </Avatar>
                                        </div>
                                        <div className="flex flex-col">
                                            <span>
                                                {
                                                    contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : contact.email
                                                }
                                            </span>

                                            <span className='text-sm'>
                                                {contact.email}
                                            </span>
                                        </div>
                                    </div>
                                    
                                ))
                            }
                        </div>
                    </ScrollArea>
                    {
                        searchedContacts.length <= 0 && (
                            <div className='flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center duration-1000 transition-all '>
                                <Lottie
                                    isClickToPauseDisabled={true}
                                    height={100}
                                    width={100}
                                    options={animationDefaultOption}
                                />
                                <div className="flex text-opacity-80 text-white flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center ">
                                    <h3 className="poppins-medium">
                                        Hi<span className='text-purple-500'>!</span> Search new <span className='text-purple-500'>Contact </span>

                                    </h3>
                                </div>
                            </div>
                        )
                    }
                </DialogContent>
            </Dialog>

        </>
    )
}

export default NewDm