'use client'

import { Form } from '@/components/Form'
import { useLoading } from '@/hooks/useLoading'
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import { valdateToken } from '@/hooks/validateToken'

export default function LoginPage () {
  const { finishLoading, isLoading, startLoading } = useLoading()
  const router = useRouter()

  useEffect(() => {
    async function validateToken(){
      const data = await valdateToken()
      if(data.ok){
          router.push('/home')
      }
    }
    validateToken()
  }, []);

  const register = async (formData) => {
    startLoading()
    const {email,password,confirmPassword} = formData
    if(!email || !password ||!confirmPassword ){
        alert('Faltan campos obligatorios')
        finishLoading()
        return
    }
    if(password!==confirmPassword){
        alert('las contraseñas deben ser las mismas')
        finishLoading()
        return
    }
    console.log({body: JSON.stringify({email:email, password:password})})
    const data = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({email:email, password:password})
    });

    const res = await data.json();
    console.log(res)
    if(!res.ok){
        alert(res.message)
    }else{
        localStorage.setItem('x-token',res.token)
        router.push('/home')
    }
    //console.log(formData)
    finishLoading()
  }

  return (
    <>
      <div className='h-screen flex flex-col items-center mt-40'>
        <Form
            title='Registrate'
            onSubmit={register}
        >
            <div className='my-[10px] flex flex-col gap-4'>
            <Form.Input
                label='Correo'
                name='email'
                placeholder='Ingresa tu correo...'
            />
            <Form.Input
                placeholder='Ingresa tu contraseña...'
                label='Contraseña'
                name='password'
                type='password'
            />
            <Form.Input
                placeholder='Repite tu contraseña...'
                label='Confirmar contraseña'
                name='confirmPassword'
                type='password'
            />
            </div>
            <Form.SubmitButton buttonText='Crear cuenta' isLoading={isLoading} />
            <Form.Footer
            description='Ya tienes cuenta?'
            textLink='Inicia Sesión'
            link='/'
            />
        </Form>
      </div>
    </>
  )
}