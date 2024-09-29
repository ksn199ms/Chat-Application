import { BrowserRouter, Routes , Route, Navigate } from "react-router-dom"

import Auth from "./pages/Auth/Auth"
import Chat from "./pages/Chat/Chat"
import Profile from "./pages/Profile/Profile"
import { useAppStore } from "./store"
import { useEffect, useState } from "react"
import { apiClient } from "./lib/api-client"
import { GET_USER_INFO } from "./utils/constants"


const PrivateRoute = ({children}) => {
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to='/auth' />
}

const AuthRoute = ({children}) => {
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to='/chat' /> : children
}


function App() {

  const {userInfo, setUserInfo} = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserdata = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO,{
          withCredentials: true
        })
        if(response.status === 200 && response.data.id) {
          setUserInfo(response.data)
        }else{
          setUserInfo(undefined)
        }
        console.log(response);
      } catch (error) {
        console.log(error);
        setUserInfo(undefined)
      }finally{
        setLoading(false)
      }
    }
    if(!userInfo) {
      getUserdata();
    }else{
      setLoading(false)
    }
  },[userInfo, setUserInfo])

  if(loading) {
    return (
      <div>Loading...</div>
    ) 
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path='*' element={<Navigate to='/auth' />} />

      <Route path='/auth' element={<AuthRoute><Auth/></AuthRoute>} />
      <Route path='/chat' element={<PrivateRoute><Chat/></PrivateRoute>} />
      <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
