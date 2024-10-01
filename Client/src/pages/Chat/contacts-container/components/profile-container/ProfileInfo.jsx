import { apiClient } from '@/lib/api-client'
import { getColor } from '@/lib/utils'
import { useAppStore } from '@/store'
import { HOST, LOGOUT_ROUTE } from '@/utils/constants'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { IoPowerSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const ProfileInfo = () => {

  const { userInfo, setUserInfo } = useAppStore()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      const response = await apiClient.post(LOGOUT_ROUTE, {}, {withCredentials: true});
      if(response.status === 200) {
        toast.success('Logout successful')
        navigate('/auth')
        setUserInfo(null)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='absolute bottom-0 h-16 flex items-center justify-between px-5 w-full bg-[#2a2b33]'>
      {/* Avatar and Name on the left */}
      <div className="flex gap-3 items-center ">
        <div className='w-12 h-12 relative'>
          <Avatar className="w-12 h-12 rounded-full overflow-hidden">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt={`${userInfo.email}`}
                className="object-cover w-full h-full rounded-full"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }} // Ensure the image fits properly
              />
            ) : (
              <div className={`uppercase h-full w-full text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(userInfo.color)}`}
                style={{ fontSize: '1.5rem' }}>
                {userInfo.firstName ? userInfo.firstName.charAt(0) : userInfo.email.charAt(0)}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ""}
        </div>
      </div>
      
      {/* Edit Icon on the right */}
      <div className='flex gap-5 '>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit className='text-purple-500 text-xl font-medium'
                onClick={() => {navigate('/profile')}} />
            </TooltipTrigger>
            <TooltipContent className='bg-[#1c1b1e] mb-3 rounded-lg text-sm p-2 text-white '>
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp className='text-red-500 text-xl font-medium'
                onClick={logout} />
            </TooltipTrigger>
            <TooltipContent className='bg-[#1c1b1e] mb-3 rounded-lg text-sm p-2 text-white '>
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

export default ProfileInfo
