import { Link } from 'react-router-dom'

interface BlogValue {
    authorName: string,
    publishDate: string,
    title: string,
    content: string,
    id: number
}

export function BlogCard({authorName, publishDate, title, content, id}: BlogValue){


    return <div className="p-2 border-e">
    <div className="flex justify-center p-6 flex-col border-b max-w-2xl">
        <div className="flex space-x-1">
        <div className="">
            <Avatar name={authorName}/>
         </div>
         <div className="flex space-x-2 text-slate-400 text-sm pt-1">
            <div className="font-semibold text-slate-600">{authorName}</div>
            <div className="h-1 w-1 bg-slate-600 rounded mt-2"></div>
            <div>{publishDate}</div>
         </div>
         </div>
         <Link to={`/blog/${id}`}>
         <div className="max-w-lg cursor-pointer">
            <div className="text-2xl font-bold">{title}</div>
            <div className="text-slate-600">{content.slice(0, 100) + "..."}</div>
        </div>
        </Link>
        <div className="text-sm text-slate-600 font-thin pt-4">{ `${Math.ceil(content.length/100)} minutes read`}</div>
    </div>
    </div>
}

function Avatar({ name }:{ name: string}){

    return <div>
<div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-xs text-gray-600 dark:text-gray-300">{name[0]}</span>
</div>
    </div>
}