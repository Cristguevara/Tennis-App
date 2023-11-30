import styles from './styles.module.css'
import { useRouter } from 'next/navigation'


export default function NavBar(){
    const router = useRouter()

    function logout(){
        console.log('logout')
        localStorage.removeItem('x-token')
        router.push('/')
    }


  return(
    <div className='w-full flex flex-col items-center py-4 justify-center bg-[#005883] relative overflow-hidden'>
        <div className="hidden sm:block absolute bottom-[-30px] left-[-50px]">
          <div className={`w-[300px] h-[300px] relative opacity-50 ${styles.rotateBubbles}`}>
            <div className="w-full h-full absolute">
              <div className="absolute w-[18%] h-[18%] rounded-full bg-white right-[41%]">
              </div>
              <div className="absolute w-[18%] h-[18%] rounded-full bg-white right-[41%] bottom-0">
              </div>
              <div className="absolute w-[18%] h-[18%] rounded-full bg-white top-[41%] right-0">
              </div>
              <div className="absolute w-[18%] h-[18%] rounded-full bg-white top-[41%] left-0">
              </div>
            </div>
            <div className="w-full h-full rotate-45">
              <div className="absolute w-[18%] h-[18%] rounded-full bg-white right-[41%]">
              </div>
              <div className="absolute w-[18%] h-[18%] rounded-full bg-white right-[41%] bottom-0">
              </div>
              <div className="absolute w-[18%] h-[18%] rounded-full bg-white top-[41%] right-0">
              </div>
              <div className="absolute w-[18%] h-[18%] rounded-full bg-white top-[41%] left-0">
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:block absolute bottom-[15px] left-[0px]">
          <div className={`w-[150px] h-[150px] relative rotateBubbles2 opacity-50 ${styles.rotateBubbles2}`}>
            <div className="w-full h-full absolute">
              <div className="absolute w-[16%] h-[16%] rounded-full bg-white right-[42%]">
              </div>
              <div className="absolute w-[16%] h-[16%] rounded-full bg-white right-[42%] bottom-0">
              </div>
              <div className="absolute w-[16%] h-[16%] rounded-full bg-white top-[42%] right-0">
              </div>
              <div className="absolute w-[16%] h-[16%] rounded-full bg-white top-[42%] left-0">
              </div>
            </div>
            <div className="w-full h-full rotate-45">
              <div className="absolute w-[16%] h-[16%] rounded-full bg-white right-[42%]">
              </div>
              <div className="absolute w-[16%] h-[16%] rounded-full bg-white right-[42%] bottom-0">
              </div>
              <div className="absolute w-[16%] h-[16%] rounded-full bg-white top-[42%] right-0">
              </div>
              <div className="absolute w-[16%] h-[16%] rounded-full bg-white top-[42%] left-0">
              </div>
            </div>
          </div>
        </div>

        <button onClick={logout} className='absolute right-[20px] bg-white rounded-lg text-semibold px-4 py-2 font-semibold'>
          Salir
        </button>
        
        <h1 className='text-4xl text-white font-bold'>Liga de Tenis App</h1>
      </div>
  )
}