import { useBlog } from '../hooks/useBlogs'
import { useParams, useNavigate } from 'react-router-dom'
import { FullBlog } from '../components/FullBlog'
import { AppBar } from '../components/AppBar'

export function Blog(){
 const { id }: any = useParams();
 const {loading, blog} = useBlog({id})
 const navigate = useNavigate()

 if(loading || !blog){
    return <div>
        <AppBar label={"New"} onClick={() => navigate("/postblog")}/>
        <div className="flex justify-center w-full h-screen px-20">
            <div className="p-10 w-3/5 pt-14">
         <div className="bg-slate-200 rounded rounded-full h-10 pt-4 w-1/2 animate-pulse"></div>
        <div className="pt-4">
            <div className="bg-slate-100 w-1/4 h-4 rounded rounded-full animate-pulse"></div>
         </div>
         <div className="pt-4">
         <div className="bg-slate-200 w-full h-80 animate-pulse rounded rounded-lg"></div>
          </div>
            </div>
        </div>
        </div>
 }
 return <div>
    <FullBlog blog={blog}/>
 </div>
}