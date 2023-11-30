
// import styles from './styles.module.css';
// import Link from 'next/link'
import { dateTransform } from '@/utils/dateTransform'

function PlayerList({name, date, isAdmin,subId, deleteSub}) {


  const handleClick = (event) => {
    deleteSub(subId)
  }

  return (
    
    <div className="flex flex-row px-4 py-2 w-full border-b-2 border-gray-500">
        <div className="w-1/2 flex items-center">
            <p>{name}</p>
        </div>
        <div className={isAdmin?"w-1/2 flex flex-row justify-between items-center":"w-1/2 flex flex-row"}>
            <p>{dateTransform(date)}</p>
            {isAdmin&&
            <button onClick={handleClick} className='py-1 px-2 border-2 border-red-400 rounded-lg'>
              Eliminar
            </button>
            }
        </div>
    </div>
  );
}
  
export default PlayerList;