import { BlogCard } from '../components/BlogCard'
import { AppBar } from '../components/AppBar'
import { useBlogs } from '../hooks/useBlogs'
import { useNavigate  }from 'react-router-dom'

export function Blogs(){
  const{ blogs, loading }= useBlogs();
  const navigate = useNavigate()

    if(loading){
      return <div>
        <AppBar  label={"New"} onClick={() => navigate("/postblog")}/>
       <div className="flex justify-center grid grid-cols-1 lg:grid-cols-3">
        <div className="px-20 col-span-2 ">
       <div role="status" className="max-w-3xl h-screen p-4 space-y-4 divide-y divide-gray-200 border-e animate-pulse dark:divide-gray-200 md:p-6 dark:border-gray-200">
    <div className="p-6 h-32 flex items-center justify-between pt-6">
        <div className="">
            <div className="h-2.5 bg-gray-300 mt-4 rounded-full dark:bg-gray-600 w-24 mb-3.5"></div>
            <div className="w-32 h-2 mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex p-6 h-40 items-center justify-between pt-8">
        <div>
            <div className="h-2.5 bg-gray-300 mt-4 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex p-6 h-40 items-center justify-between pt-6">
        <div>
            <div className="h-2.5 bg-gray-300 mt-4 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex p-6 h-40 items-center justify-between pt-6">
        <div>
            <div className="h-2.5 bg-gray-300 mt-4 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
      <div className="flex p-6 h-40 items-center justify-between pt-6">
        <div>
            <div className="h-2.5 bg-gray-300 mt-4 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
      <div className="flex p-6 h-40 items-center justify-between pt-6">
        <div>
            <div className="h-2.5 bg-gray-300 mt-4 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <span className="sr-only">Loading...</span>
</div>
</div>
</div>
      </div>
    }
  
    return <div>
      <AppBar  label={"New"} onClick={() => navigate("/postblog")}/>
    <div className="h-screen flex justify-center grid grid-cols-1 lg:grid-cols-3">
           <div className=" px-20 col-span-2">
           {
            blogs.map(blog => <div>
       <BlogCard authorName={blog.author.name} title={blog.title} content={blog.content} id={blog.id} publishDate={'14th August 2024'}/>
    </div>)
           } 
    </div>
    </div>
    </div>
}
