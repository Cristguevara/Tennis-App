import styles from '../tournamentCard/styles.module.css';
import Link from 'next/link'
import { dateTransform } from '@/utils/dateTransform'

function UserCard({name,email, date, id,deleteUser}) {
    const handleClick = (event) => {
        deleteUser(id)
    }

  return (
      <div className='flex flex-row w-full border-2 border-[#005883] rounded-lg p-6'>
        <div className='flex flex-col items-center justify-center w-[50%]'>
            <img className='w-full max-w-[150px]' src='https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg' width={300} height={300}/>
        </div>
        <div className='flex flex-col justify-between w-[65%] p-4'>
            <h2 className='text-justify text-2xl font-semibold'>Nombre: {name!==''?name:'Sin nombre'}</h2>
            <p className='text-justify'>Correo electrónico: {email}</p>
            <p className='text-justify'>Fecha de registro: {dateTransform(date)}</p>
            <div className='flex flex-row justify-end px-4 gap-4 mt-2'>
                <Link href={`/user/${id}`}>
                    <button className={styles.btnGo}>Editar</button>
                </Link>
                <button onClick={handleClick} className={styles.btnGo}>Eliminar</button>
            </div>
        </div>
      </div>
  );
}
  
export default UserCard;