import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import axios from 'axios'
import { BK_URL } from '../utils/constants'
import { Link, useNavigate } from 'react-router-dom'

const Menu = () => {
  const {user,setUser} = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = async() => {
    try {
      const res = await axios.get(BK_URL+"/api/auth/logout",{withCredentials: true})
      setUser(null)
      navigate("/login")

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 rounded-md md:right-32 p-4 space-y-4'>
        {!user && <h3 className='text-white text-sm cursor-pointer hover:text-gray-500'><Link to="/login">Login</Link></h3>}
        {!user && <h3 className='text-white text-sm cursor-pointer hover:text-gray-500'><Link>Register</Link></h3>}
        {user && <h3 className='text-white text-sm cursor-pointer hover:text-gray-500'>
          <Link to={"/profile/"+user._id}>Profile</Link></h3>}
        {user && <h3 className='text-white text-sm cursor-pointer hover:text-gray-500'><Link to="/write">Write</Link></h3>}
        {/* {user && <h3 className='text-white text-sm cursor-pointer hover:text-gray-500'><Link to={"/myblogs/"+user._id}>MyBlogs</Link></h3>} */}
        {user && <h3 onClick={handleLogout} className='text-white text-sm cursor-pointer hover:text-gray-500'>Logout</h3>}
    </div>
  )
}

export default Menu