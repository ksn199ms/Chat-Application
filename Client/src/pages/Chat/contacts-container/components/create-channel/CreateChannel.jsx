import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { apiClient } from '@/lib/api-client'
import { GET_ALL_CONTACTS_ROUTE } from '@/utils/constants'
import { useAppStore } from '@/store'
import { Button } from '@/components/ui/button'
import MultipleSelector from '@/components/ui/multipleselect'



const CreateChannel = () => {

    const {setSelectedChatType, setSelectedChatData} = useAppStore()

    const [newChannelModal, setNewChannelModal] = useState(false)
    const [allContacts, setAllContacts] = useState([])
    const [selectedContacts, setSelectedContacts] = useState([])
    const [channelName, setChannelName] = useState('')

    useEffect(() => {
       const getData = async () => {
        const response = await apiClient.get(GET_ALL_CONTACTS_ROUTE, { withCredentials: true });
        setAllContacts(response.data.contacts)
       };

       getData()
    },[])

    const createChannel = async () => {

    }
    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus className='text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300'
                            onClick={() => { setNewChannelModal(true) }}
                        />
                    </TooltipTrigger>
                    <TooltipContent className='bg-[#1c1b1e] mb-3 rounded-lg text-sm p-2 text-white '>
                        <p>Create New Channel</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
                <DialogContent className='bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col '>
                    <DialogHeader>
                        <DialogTitle>please fill up the details for new channel</DialogTitle>
                    </DialogHeader>
                    <div>
                        <Input placeholder="Channel Name" onChange={(e) => setChannelName(e.target.value)} value={channelName} className='rounded-lg p-6 mt-5 bg-[#2c2e3b] border-none' />
                    </div>
                    <div>
                        <MultipleSelector className='rounded-lg bg-[#2c2e3b] border-none py-2 text-white ' 
                        defaultOptions={allContacts}
                        placeholder = "serach Contacts"
                        value = {selectedContacts}
                        onChange = {setSelectedContacts}
                        emptyIndicator = {
                            <p className='text-center text-lg leading-10 text-gray-600'>No results found</p>
                        }
                        />
                    </div>
                    <div>
                        <Button className='w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300' onClick={createChannel}>Create Channel</Button>
                    </div>
                   
                </DialogContent>
            </Dialog>

        </>
    )
}

export default CreateChannel