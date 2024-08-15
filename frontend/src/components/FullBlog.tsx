import { AppBar } from '../components/AppBar'
import { Blog } from '../hooks/useBlogs'
import { useNavigate } from 'react-router-dom'

export function FullBlog({blog}: {blog: Blog}){
    const navigate = useNavigate();

    return <div>
        <AppBar  label={"New"} onClick={() => navigate("/postblog")}/>
        <div className="flex justify-center h-screen w-full px-20">
        <div className="w-3/5">
            <div className="px-12 pt-8">
         <div className="text-4xl font-bold pt-4">{blog.title}</div>
         <div className="text-slate-400 pt-2">Post on 15th august 2024</div>
         <div className="font-semibold text-slate-600 pt-2">{blog.content}</div>
            </div>
        </div>
        </div>
    </div>
}