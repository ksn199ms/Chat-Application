import { useState } from 'react';
import Victory from '@/assets/victory.svg';
import Background from '@/assets/login2.png';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {apiClient} from '@/lib/api-client';
import { SIGNUP_ROUTE } from '@/utils/constants';

const Auth = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateSignup = () => {
    if(!email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return false;
    }else if(password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }else if(password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }else if(!email.includes("@")) {
      toast.error("Invalid email");
      return false;
    }else if(!email.length) {
      toast.error("Email is required");
      return false;
    }
    return true;
  }

  const handleLogin = async () => {
    // Login logic
  };

  const handleSignup = async () => {
    // Signup logic
    if(validateSignup()) {
      const response = await apiClient.post(SIGNUP_ROUTE, { email, password });
      console.log(response);
    }
  };

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-gray-50'>
      <div className='h-auto w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] bg-white border border-gray-200 shadow-xl rounded-3xl grid grid-cols-1 xl:grid-cols-2'>
        {/* Left Section */}
        <div className='flex flex-col gap-8 items-center justify-center p-10'>
          {/* Welcome Text */}
          <div className='text-center'>
            <div className='flex items-center justify-center gap-3'>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className='h-12 md:h-16' />
            </div>
            <p className='mt-3 text-gray-600 font-semibold'>Fill in the details to get started with the best chat app</p>
          </div>

          {/* Tabs for Login/Signup */}
          <div className='w-full'>
            <Tabs className='w-full'>
              <TabsList className='bg-transparent w-full flex border-b border-gray-300'>
                <TabsTrigger value='login'
                  className='w-1/2 text-lg font-medium p-3 transition duration-300 text-gray-700 border-b-2 data-[state=active]:border-purple-500 data-[state=active]:text-purple-700'
                >
                  Login
                </TabsTrigger>
                <TabsTrigger value='signup'
                  className='w-1/2 text-lg font-medium p-3 transition duration-300 text-gray-700 border-b-2 data-[state=active]:border-purple-500 data-[state=active]:text-purple-700'
                >
                  Sign up
                </TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value='login' className='flex flex-col gap-5 mt-8'>
                <Input 
                  type="email" 
                  placeholder="Email" 
                  className='rounded-full p-4 border border-gray-300 focus:outline-none focus:border-purple-500 transition'
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  className='rounded-full p-4 border border-gray-300 focus:outline-none focus:border-purple-500 transition'
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <Button 
                  className='rounded-full bg-purple-600 text-white p-4 hover:bg-purple-700 transition-all duration-300'
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </TabsContent>

              {/* Signup Form */}
              <TabsContent value='signup' className='flex flex-col gap-5 mt-8'>
                <Input 
                  type="email" 
                  placeholder="Email" 
                  className='rounded-full p-4 border border-gray-300 focus:outline-none focus:border-purple-500 transition'
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  className='rounded-full p-4 border border-gray-300 focus:outline-none focus:border-purple-500 transition'
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <Input 
                  type="password" 
                  placeholder="Confirm Password" 
                  className='rounded-full p-4 border border-gray-300 focus:outline-none focus:border-purple-500 transition'
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                <Button 
                  className='rounded-full bg-purple-600 text-white p-4 hover:bg-purple-700 transition-all duration-300'
                  onClick={handleSignup}
                >
                  Sign up
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className='hidden xl:flex items-center justify-center'>
          <img src={Background} alt="Login Background" className='h-[700px] object-cover' />
        </div>
      </div>
    </div>
  );
}

export default Auth;
