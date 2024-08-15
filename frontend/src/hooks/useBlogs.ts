import { useState, useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export interface Blog {
    title: string,
    content: string,
    id: number,
    author: {
        name: string
    }
}

export function useBlog({id}: {id: number}){
    const [ loading, setLoading ] = useState(true);
    const [ blog, setBlog ] = useState<Blog>();

useEffect( () =>{
    axios.get(`${BACKEND_URL}/api/v1/book/blog/${id}`,
       { headers: {
            Authorization: "Bearer "+localStorage.getItem("token")
        }}
    )
    .then(response => {
        setBlog(response.data);
        setLoading(false);
    })
}, [])

return {
    loading,
    blog
}
}

export function useBlogs(){
const [ loading, setLoading ] = useState(true);
const [ blogs, setBlogs ] = useState<Blog[]>([]);

useEffect( () =>{
    axios.get(`${BACKEND_URL}/api/v1/book/blog/bulk`,
       { headers: {
            Authorization: "Bearer "+localStorage.getItem("token")
        }}
    )
    .then(response => {
        setBlogs(response.data);
        setLoading(false);
    })
}, [])

return {
    loading,
    blogs
}
}