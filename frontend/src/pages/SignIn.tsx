import { Quote } from '../components/Quote'
import { Link, useNavigate } from 'react-router-dom'
import { InputBox } from '../components/InputBox'
import { useState } from 'react'
import { SigninBody} from '@saan45/zod'
import { Button } from '../components/Button'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export function SignIn(){
      const navigate = useNavigate();
      const [ postInputs, setPostInputs ] = useState<SigninBody>({
        email: '',
        password: ''
    })

async function sendRequest(){
   const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs)
   if(!response){
     console.log("something went wrong with the server")
   }
   const res = response.data.jwt;
   localStorage.setItem("token", res)
   navigate('/blogs')
}


    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <div className="flex justify-center h-screen flex-col">
        <div className="text-center font-extrabold text-3xl">
           Yeh! Login Now
        </div>
        <div className="text-slate-500 text-center">
            Don't have an account?
            <Link to={'/signup'} className="text-blue-500 underline"> Sign up</Link>
        </div>
        <div className="pt-4 ">
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
    <Button label={'Log in'} onClick={sendRequest}/>
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