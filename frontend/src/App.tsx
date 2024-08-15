import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Blogs } from './pages/Blogs'
import { Blog } from './pages/Blog'
import { PostBlog } from './pages/PostBlog'
function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="signup" element ={< SignUp />} />
        <Route path="signin" element ={ < SignIn />} />
        <Route path="blogs" element={ < Blogs />} />
        <Route path="postblog" element={ < PostBlog />}/>
        <Route path="blog/:id" element={ < Blog /> }/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
