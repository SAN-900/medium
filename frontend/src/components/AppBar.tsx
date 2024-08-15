import { Link } from 'react-router-dom'
import { Button } from './Button'

export function AppBar({label, onClick}:{label:string, onClick:() => void}){

    return <div className="flex justify-between px-10 py-2 border-b">
        <Link to={'/blogs'}>
        <div className="text-blue-400 text-2xl font-semibold">Medium</div>
        </Link>
        <div className="flex justify-center">
            <div className="pr-4">
                <Button label={label} onClick={onClick}/>
            </div>
            <Avatar name={"Sawan"}/>
        </div>
    </div>
}

export function Avatar({ name }:{ name: string}){

    return <div>
<div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-blue-100 rounded-full dark:bg-blue-400">
    <span className="font-medium text-lg text-gray-600 dark:text-gray-300">{name[0]}</span>
</div>
    </div>
}
