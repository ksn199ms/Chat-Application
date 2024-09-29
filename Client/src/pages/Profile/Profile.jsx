import { useAppStore } from '@/store'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { IoArrowBack } from 'react-icons/io5'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { colors, getColor } from '@/lib/utils'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Profile = () => {

  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useAppStore()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [image, setImage] = useState(null)
  const [hovered, setHovered] = useState(false)
  const [selecetedColor, setSelectedColor] = useState(0)

  const saveChanges = () => {

  }
  return (
    <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10'>
  <div className="flex flex-col gap-10 w-[80vw] md:w-max">
    <div>
      <IoArrowBack className='text-4xl lg:text-6xl text-white/90 cursor-pointer' />
    </div>
    <div className="grid grid-cols-2">
      <div 
        className="w-32 h-32 md:w-48 md:h-48 relative flex items-center justify-center"
        onMouseEnter={() => setHovered(true)} 
        onMouseLeave={() => setHovered(false)}
        style={{ width: '8rem', height: '8rem', borderRadius: '50%' }}
      >
        <Avatar className="rounded-full overflow-hidden h-full w-full">
          {image ? (
            <AvatarImage src={image} className="object-cover w-full h-full bg-black" />
          ) : (
            <div className={`uppercase text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selecetedColor)}`} 
              style={{ width: '8rem', height: '8rem' }}>
              {firstName ? firstName.split('').shift() : userInfo.email.split('').shift()}
            </div>
          )}
        </Avatar>

        {hovered && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full'>
            {image ? (
              <FaTrash className='text-white text-3xl cursor-pointer' />
            ) : (
              <FaPlus className='text-white text-3xl cursor-pointer' />
            )}
          </div>
        )}
      </div>
      
      <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
        <div className="w-full">
          <Input placeholder='Email' type='email' value={userInfo.email} disabled className='rounded-lg p-6 bg-[#2c2e3b] border-none' />
        </div>

        <div className="w-full">
          <Input placeholder='First Name' type='text' value={userInfo.firstName} onChange={(e) => setFirstName(e.target.value)} className='rounded-lg p-6 bg-[#2c2e3b] border-none' />
        </div>

        <div className="w-full">
          <Input placeholder='Last Name' type='text' value={userInfo.lastName} onChange={(e) => setLastName(e.target.value)} className='rounded-lg p-6 bg-[#2c2e3b] border-none' />
        </div>

        <div className="w-full flex gap-5">
          {colors.map((color, index) => (
            <div key={index} className={`${color} w-8 h-8 rounded-full cursor-pointer transition-all duration-300 ${selecetedColor === index ? 'outline outline-white/50 outline-2' : ''}`} style={{ backgroundColor: color }} onClick={() => setSelectedColor(index)} />
          ))}
        </div>
      </div>
    </div>
    <div className="w-full">
      <Button className='w-full h-16 bg-purple-700 hover:bg-purple-900 transition-all duration-300' onClick={saveChanges}>
        Save Changes
      </Button>
    </div>
  </div>
</div>

  )
}

export default Profile