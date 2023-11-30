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

  const login = async (formData) => {
    try{
      startLoading()
      const data = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      const res = await data.json();
      console.log(res)
      if(!res.ok){
        alert(res.message)
      }else{
        localStorage.setItem('x-token',res.token)
        router.push('/home')
      }
      finishLoading()
    }catch(err){
      console.log(err)
      finishLoading()
    }
    
  }

  return (
    <>
      <div className='h-screen flex flex-col items-center mt-40'>
        <Form
          title='Inicia Sesión'
          onSubmit={login}
        >
          <div className='my-4 flex flex-col gap-6'>
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
          </div>
          <Form.SubmitButton buttonText='Iniciar Sesión' isLoading={isLoading} />
          {/* <Form.Footer
            description='Te olvidate tu contraseña?'
            link='/forget-password'
            textLink='Recuperar contraseña'
          /> */}
          <Form.Footer
            description='¿Aún no tienes cuenta?'
            link='/register'
            textLink='Registrate'
          />
        </Form>
      </div>
    </>
  )
}

