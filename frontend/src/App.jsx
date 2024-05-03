import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetails from './pages/PostDetails'
import CreatePost from './pages/CreatePost'
import EditPostPage from './pages/EditPostPage'
import Profile from './pages/Profile'
import { UserContextProvider } from './contexts/UserContext'
import Myblogs from './components/Myblogs'
import {Toaster} from 'react-hot-toast'

function App() {

  return (
    <UserContextProvider>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/posts/post/:id' element={<PostDetails/>}/>
      <Route exact path='/write' element={<CreatePost/>}/>
      <Route exact path='/myblogs/:id' element={<Myblogs/>}/>
      <Route exact path='/edit/:id' element={<EditPostPage/>}/>
      <Route exact path='/profile/:id' element={<Profile/>}/>
    </Routes>
    <Toaster position='top-left'/>
    </UserContextProvider>


  )
}

export default App
