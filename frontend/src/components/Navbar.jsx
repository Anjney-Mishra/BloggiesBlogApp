import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Menu from './Menu';
import { UserContext } from '../contexts/UserContext';
const Navbar = () => {
    const [prompt,setPrompt] = useState("")
    const [menu,setMenu] = useState(false)
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    const path=useLocation().pathname


    const showMenu = () => {
      setMenu(!menu)
    }

  return (
    <div className='flex item-center justify-between px-6 md:px-[200px] py-4'>
        <h1 className='text-xl font-extrabold'><Link to="/">Blogiies</Link></h1>
        {path==="/" && <div className='flex justify-center items-center space-x-0'>
            <p onClick={()=>prompt?navigate("?search="+prompt):navigate("/")}><FaSearch /></p>
            <input type="text" onChange={(e)=>setPrompt(e.target.value)} className='outline-none px-3 py-1 text-lg md:text-xl' placeholder='Search a post' />
        </div>}
        <div className='hidden md:flex items-center justify-center space-x-2 md:space-x-4'>
            {user?<h3><Link to='/write'>Write Post</Link></h3>:<h3><Link to='/login'>Login</Link></h3>}
            {user? <div onClick={showMenu}><p className='text-2xl cursor-pointer relative'><GiHamburgerMenu /></p> {menu && <Menu/>}</div>:<h3><Link to='/register'>Register</Link></h3>}
        </div>
        <div className='md:hidden text-lg' onClick={showMenu}>
          <p className='text-2xl cursor-pointer relative'><GiHamburgerMenu /></p>
          {menu && <Menu/>}
        </div>
    </div>
  )
}

export default Navbar