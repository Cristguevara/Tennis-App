import { useState } from 'react'
import LoadingAnimation from '@/components/loading'

function Alert({title, description, data, funcRequest, cancel}) {

    const [loading, setLoading] = useState(false)

    const handleClick = (event) => {
        setLoading(true)
        if(data){
            funcRequest(data)
        }else{
            funcRequest()
        }
    }

    

  return (
    <div className='fixed h-[100vh] w-full  z-[200]'>
        <div className='relative h-full w-full flex flex-col items-center justify-center'>
        <div className='absolute h-full w-full bg-black/40'>
        </div>
        {loading?
        <div className='w-full max-w-[500px] max-h-[400px] rounded-lg bg-white p-8 z-[210]'>
            <LoadingAnimation/>
        </div>:
        <div className='w-full max-w-[500px] rounded-lg bg-white p-8 z-[210]'>
            <p className='text-xl font-bold'>{title}</p>
            <p className='mt-4 mb-8'>{description}</p>
            <div className="w-full flex flex-row justify-between">
            <button onClick={()=>{cancel(false)}}  className="bg-red-600 text-white font-semibold px-8 py-2 rounded-lg">
                Cancelar
            </button>
            <button onClick={handleClick} className="bg-green-600 text-white font-semibold px-8 py-2 rounded-lg">
                Confirmar
            </button>
            </div>
        </div>
        }
        </div>
    </div>
  );
}
  
export default Alert;