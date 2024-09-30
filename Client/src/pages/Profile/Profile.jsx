import { useAppStore } from '@/store'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { IoArrowBack } from 'react-icons/io5'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { colors, getColor } from '@/lib/utils'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { apiClient } from '@/lib/api-client'
import { ADD_PROFILE_IMAGE_ROUTE, DELETE_PROFILE_IMAGE_ROUTE, HOST, UPDATE_PROFILE_ROUTE } from '@/utils/constants'

const Profile = () => {

  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useAppStore()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [image, setImage] = useState(null)
  const [hovered, setHovered] = useState(false)
  const [selectedColor, setselectedColor] = useState(0)
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName)
      setLastName(userInfo.lastName)
      setselectedColor(userInfo.color)
    }
    if(userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`)
    }
  }, [userInfo])

  const validateProfile = () => {
    if (!firstName || !lastName) {
      toast.error('Please enter your first and last name')
      return false
    }
    return true
  }
  

    const saveChanges = async () => {
      if (validateProfile()) {
        try {
          const response = await apiClient.post(UPDATE_PROFILE_ROUTE,{firstName,lastName,color:selectedColor},{withCredentials: true})

          if(response.status === 200 && response.data) {
            setUserInfo(response.data)
            toast.success('Profile updated successfully')
            navigate('/chat')
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    const handleNacvigate = () => {
      if(userInfo.profileSetup){
        navigate('/chat');
      }else{
        toast.warning('Please setup your profile first')
      }
    }

    const handleFileInputChange = () => {
      fileInputRef.current.click();
    }

    const handleImageChange = async (e) => {
      const file = e.target.files[0];
      if(file){
        const formData = new FormData();
        formData.append('profile-image', file);
        const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {withCredentials: true});
        if(response.status === 200 && response.data.image) {
          setUserInfo({ ...userInfo, image: response.data.image })
          toast.success('Profile image updated successfully')
        }
      }
    }

    const deleteImageChange = async () => {
      try {
        const response = await apiClient.delete(DELETE_PROFILE_IMAGE_ROUTE, {withCredentials: true});
        if(response.status === 200 && response.data) {
          setUserInfo({ ...userInfo, image: null })
          toast.success('Profile image deleted successfully')
          setImage(null)
        }
      } catch (error) {
        console.log(error);
      }
    }

    return (
      <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10'>
        <div className="flex flex-col gap-10 w-[80vw] md:w-max">
          <div onClick={handleNacvigate}>
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
                  <div className={`uppercase text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}
                    style={{ width: '8rem', height: '8rem' }}>
                    {firstName ? firstName.split('').shift() : userInfo.email.split('').shift()}
                  </div>
                )}
              </Avatar>

              {hovered && (
                <div className='absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full' onClick={image ? deleteImageChange : handleFileInputChange}>
                  {image ? (
                    <FaTrash className='text-white text-3xl cursor-pointer' />
                  ) : (
                    <FaPlus className='text-white text-3xl cursor-pointer' />
                  )}
                </div>
              )}
              <input type="file" className='hidden' name='profile-image' ref={fileInputRef} onChange={handleImageChange} accept=".png, .jpg, .jpeg, .webp, .gif, .svg" />
            </div>

            <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
              <div className="w-full">
                <Input placeholder='Email' type='email' value={userInfo.email} disabled className='rounded-lg p-6 bg-[#2c2e3b] border-none' />
              </div>

              <div className="w-full">
                <Input placeholder='First Name' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} className='rounded-lg p-6 bg-[#2c2e3b] border-none' />
              </div>

              <div className="w-full">
                <Input placeholder='Last Name' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} className='rounded-lg p-6 bg-[#2c2e3b] border-none' />
              </div>

              <div className="w-full flex gap-5">
                {colors.map((color, index) => (
                  <div key={index} className={`${color} w-8 h-8 rounded-full cursor-pointer transition-all duration-300 ${selectedColor === index ? 'outline outline-white/50 outline-2' : ''}`} style={{ backgroundColor: color }} onClick={() => setselectedColor(index)} />
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