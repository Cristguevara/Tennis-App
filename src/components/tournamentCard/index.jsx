
import styles from './styles.module.css';
import Link from 'next/link'

function TournamentCard({name, details, isAdmin, id,deleteTournament}) {
    const handleClick = (event) => {
        deleteTournament(id)
    }

  return (
    
      <div className='flex flex-row w-full border-2 border-[#005883] rounded-lg p-6'>
        <div className='flex flex-col items-center justify-center w-[50%]'>
            <img className='w-full max-w-[350px]' src='https://hips.hearstapps.com/hmg-prod/images/low-section-of-young-man-walking-with-racket-at-royalty-free-image-1667407305.jpg' width={2121} height={1414}/>
        </div>
        <div className='flex flex-col justify-between w-[65%] p-4'>
            <h2 className='text-center text-2xl font-semibold'>{name}</h2>
            <p className='text-justify'>{details}</p>
            <div className={isAdmin?'flex flex-row justify-between px-4':'flex flex-row justify-end px-4'}>
                {isAdmin&&<button onClick={handleClick} className={styles.btnGo}>Eliminar</button>}
                {isAdmin&&
                    <Link href={`/tournament/edit/${id}`}>
                        <button className={styles.btnGo}>Editar</button>
                    </Link>
                }
                <Link href={`/tournament/${id}`}>
                    <button className={styles.btnGo}>Ver</button>
                </Link>
            </div>
        </div>
      </div>
  );
}
  
export default TournamentCard;