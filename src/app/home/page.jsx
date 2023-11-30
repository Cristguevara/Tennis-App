'use client'

import styles from './styles.module.css'
import { useRouter } from 'next/navigation'
import { valdateToken } from '@/hooks/validateToken'
import { useEffect,useState } from 'react'
import NavBar from '@/components/navBar'
import TournamentCard from '@/components/tournamentCard'
import UserCard from '@/components/userCard'
import Alert from '@/components/Alert'
import LoadingAnimation from '@/components/loading'




export default function HomePage () {
  async function getTournaments () {
    const res = await fetch('/api/tournaments')
    const  data = await res.json()
    setTournaments(data.tournaments)
    return data
  }

  const router = useRouter()

  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showUsers, setShowUsers] = useState(false)
  //const [email, setEmail] = useState('')
  const [tournaments, setTournaments] = useState([])
  const [users, setUsers] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [alertComp, setAlertComp] = useState(<Alert/>)

  useEffect( () => {
    async function validateToken(){
      const data = await valdateToken()
      if(!data.ok){
        router.push('/')
      }
      await getTournaments()
      setLoading(false)
      setIsAdmin(data.isAdmin)
      //setEmail(data.setEmail)
    }
    validateToken()
  }, [])

  

  let tournamentsList = tournaments.map(t=>{
    return <TournamentCard name={t.name} details={t.details} isAdmin={isAdmin} id={t._id} key={t._id} deleteTournament={openAlert}/>
  })

  let usersList = users.map(t=>{
    return <UserCard name={t.name} email={t.email} date={t.createdAt} id={t._id} deleteUser={openDeleteAlert} key={t._id}/>
  })

  async function deleteTournament(id) {
    console.log('Eliminado: ',id)
    const res = await fetch(`/api/tournaments/${id}`,{method:'DELETE'});
    const data = await res.json();
    console.log(data)
    if(data.ok){
      setShowAlert(false)
      getTournaments()
    }else{
      alert(data.msg)
    }
  }

  async function getUsers() {
    setShowUsers(true)
    const res = await fetch('/api/users')
    const  data = await res.json()
    console.log('data users: ',data)
    if(data.ok){
      setUsers(data.users)
    }else{
      alert('Error al solicitar los usuarios.')
    }
    return data
  }

  async function deleteUser(id) {
    console.log('Id user: ',id)
    const res = await fetch(`/api/users/${id}`,{method:'DELETE'});
    const data = await res.json();
    console.log(data)
    if(data.ok){
      getUsers()
      setShowAlert(false)
    }else{
      alert(data.msg)
    }
  }
  

  function openAlert(data){
    setShowAlert(true)
    setAlertComp(
    <Alert title={'Eliminar torneo'} 
    description={'¿Está seguro que desea eliminar el torneo?'} 
    data={data} 
    funcRequest={deleteTournament}
    cancel={setShowAlert}
    />) 
  }

  function openDeleteAlert(data){
    setShowAlert(true)
    setAlertComp(
    <Alert title={'Eliminar torneo'} 
    description={'¿Está seguro que desea eliminar el torneo?'} 
    data={data} 
    funcRequest={deleteUser}
    cancel={setShowAlert}
    />) 
  }
  
  

  return (
    <>{loading ?
      <div className='w-full flex items-center justify-center h-screen'>
        <div className='max-w-[500px]'>
          <LoadingAnimation/>
        </div>
      </div>:
        <>
        {showAlert&&alertComp}
        <NavBar/>
        <div className='flex flex-col items-center w-full mt-4'>
          <div className='w-full max-w-[800px] flex flex-col'>
            { 
                isAdmin?
                <div className='flex flex-row mb-4 justify-between w-full'>
                  <div className='flex flex-row gap-4'>
                    <button onClick={()=>{setShowUsers(false)}} className="px-4 py-2 font-bold border-2 border-black rounded-lg">
                        Torneos
                    </button>
                    <button onClick={()=>{getUsers()}} className="px-4 py-2 font-bold border-2 border-black rounded-lg">
                        Usuarios
                    </button>
                  </div>
                  <button onClick={()=>{router.push('/tournament/new')}} className="px-4 py-2 font-bold border-2 border-black rounded-lg">
                      Nuevo torneo
                  </button>
                </div> :
                <></> 
            }
          </div>
          <div className='w-full max-w-[800px] flex flex-col gap-6 pb-8'>
            {showUsers?usersList:tournamentsList}
          </div>
        </div></>
      }
    </>
  )
}