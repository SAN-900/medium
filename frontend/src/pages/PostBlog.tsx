import { AppBar } from '../components/AppBar'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function PostBlog(){
   const [title, setTitle] = useState<string>("");
   const [content, setContent] = useState("");
   const navigate = useNavigate();
   
    return <div>
        <AppBar  label={"Publish"} onClick={async () =>{
            const response = await axios.post(`${BACKEND_URL}/api/v1/book/blog`,{
                title,
                content
            },{
            headers: {
                authorization: "Bearer " +localStorage.getItem("token")
            }
        })
            navigate(`/blog/${response.data.id}`)
        }}/>
       <div className="flex justify-center pt-4">
        <input onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-1/2 h-10 rounded border border-slate-200 placeholder:px-2 text-2xl"/>
       </div>
       <div className="">
        <TextEditor onChange={(e) => setContent(e.target.value)}/>
       </div>
    </div>
}

function TextEditor({onChange}: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}){

    return <div className="flex justify-center pt-4 h-80">
<textarea onChange={onChange} id="message" rows={4} className="block p-2.5 w-1/2 text-sm text-gray-300 bg-gray-500 rounded-lg border border-gray-200 focus:ring-blue-200 focus:border-blue-200 dark:bg-gray-100 dark:border-gray-200 dark:placeholder-gray-700 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-200" placeholder="Write your content here..."></textarea>

    </div>
}