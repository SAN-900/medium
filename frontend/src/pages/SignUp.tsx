import { Quote } from '../components/Quote'
import { Link, useNavigate } from 'react-router-dom'
import { InputBox } from '../components/InputBox'
import { useState } from 'react'
import { SignupBody} from '@saan45/zod'
import { Button } from '../components/Button'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export function SignUp(){
   const navigate = useNavigate();
   const [ postInputs, setPostInputs ] = useState<SignupBody>({
        name: '',
        email: '',
        password: ''
    })


async function sendRequest(){
   const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs)
   if(response.status === 403){
     console.log("something went wrong with the server")
   }
   const jwt = await response.data.jwt;
   localStorage.setItem("token", jwt)
   navigate('/blogs')
}


    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
            <div className="flex justify-center h-screen flex-col">
        <div className="text-center font-extrabold text-3xl">
           Create an account
        </div>
        <div className="text-slate-500 text-center">
            Already have an account?
            <Link to={'/signin'} className="text-blue-500 underline"> Login</Link>
        </div>
        <div className="pt-4 ">
        <div className ="flex justify-center">
        <InputBox type={"text"} label={"Name"} placeholder={ "Enter your name"} onChange={e => {
            setPostInputs({
                ...postInputs,
                name: e.target.value
            })
        }}/>
    </div>
    <div className ="flex justify-center pt-4">
        <InputBox type={"text"} label={"Email"} placeholder={ "Enter your email"} onChange={e => {
            setPostInputs({
                ...postInputs,
                email: e.target.value
            })
        }}/>
    </div>
    <div className ="flex justify-center pt-4 pb-4">
        <InputBox type={"password"} label={"password"} placeholder={ "Enter your password"} onChange={e => {
            setPostInputs({
                ...postInputs,
                password: e.target.value
            })
        }}/>
    </div>
    <div className="flex justify-center">
    <Button label={'Sign up'} onClick={sendRequest}/>
    </div>
    </div>
    </div>
            </div>
            <div className="invisible lg:visible"> 
               <Quote/> 
            </div>
       </div>
    </div>
}