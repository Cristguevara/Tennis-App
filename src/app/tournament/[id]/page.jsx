'use client'
import NavBar from "@/components/navBar"
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { valdateToken } from '@/hooks/validateToken'
import PlayerList from "@/components/playerList";
import Alert from "@/components/Alert";
import LoadingAnimation from '@/components/loading'

export default function DetailsTournament(){

    const [infTourn, setInfTourn] = useState({
        name: "",
        details: "",
    });

    const [userInfo, setUserInfo] = useState({
        isAdmin : false,
        id : ''
    });

    const [loading, setLoading] = useState(true)
    const [subscriptions, setSubscriptions] = useState([]);
    const [showAlert, setShowAlert] = useState(false)
    const [alertComp, setAlertComp] = useState(<Alert/>)

    const params = useParams();
    const router = useRouter();

    const getTournaments = async () => {
        const res = await fetch(`/api/tournaments/${params.id}`);
        const data = await res.json();
        if(!data.ok){
            alert('Error al recuperar la información del torneo')
        }
        setInfTourn({ name: data.tournament.name, details: data.tournament.details });
        return
    };

    const getSubscriptions = async () => {
        const res = await fetch(`/api/tournaments/subscribe/${params.id}`);
        const data = await res.json();
        if(!data.ok){
            alert('Error al recuperar la información de las suscripciones')
        }
        console.log('getSubscriptions: ',data)
        setSubscriptions(data.subscriptions);
        return
    };

    useEffect( () => {
        async function validateToken(){
            const data = await valdateToken()
            if(data.ok){
                setUserInfo({isAdmin:data.isAdmin, id:data.id})
            }else{
                router.push('/')
            }
            if (params.id) {
                await getTournaments();
                await getSubscriptions()
            }
            setLoading(false)
          }
          validateToken()
    }, []);

    let isSubscribe = false
    
    subscriptions.map(s=>{if(s.player.id===userInfo.id){isSubscribe=true}})

    let havePlayers = false
    let players = subscriptions.map(s=>{
        return <PlayerList name={s.player.email} date={s.createdAt} isAdmin={userInfo.isAdmin} key={s.player.email} subId={s._id} deleteSub={openDeleteAlert}/>
    })
    if(players.length>0){
        havePlayers=true
    }

    async function sendSubscribe(){
        const data = await fetch('/api/tournaments/subscribe', {
            method: 'POST',
            body: JSON.stringify({tournamentId:params.id,userId:userInfo.id})
          });
          const res = await data.json();
          //console.log(res)
          if(!res.ok){
            alert(res.message)
          }else{
            setShowAlert(false)
            getSubscriptions()
          }
    }

    async function deleteSub(subId) {
        //console.log('Eliminado: ',subId)
        const res = await fetch(`/api/tournaments/subscribe`,{
            method:'DELETE',
            body: JSON.stringify({id:subId})
        });
        const data = await res.json();
        console.log(data)
        if(data.ok){
            setShowAlert(false)
            getSubscriptions()
        }else{
            alert(data.msg)
        }
    }

    function back(){
        router.push('/home')
    }

    function openAlert(){
        setShowAlert(true)
        setAlertComp(
        <Alert title={'Subscripción'} 
        description={'¿Está seguro que desea suscribirse al torneo?'} 
        // data={data} 
        funcRequest={sendSubscribe}
        cancel={setShowAlert}
        />) 
    }

    function openDeleteAlert(data){
        setShowAlert(true)
        setAlertComp(
        <Alert title={'Eliminar suscripción'} 
        description={'¿Está seguro que desea eliminar el usuario del torneo?'} 
        data={data} 
        funcRequest={deleteSub}
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
                    <p className="font-bold text-center text-2xl">{infTourn.name}</p>
                    <div className='flex flex-col items-center w-full mt-4'>
                     <img className='w-full max-w-[600px]' src='https://hips.hearstapps.com/hmg-prod/images/low-section-of-young-man-walking-with-racket-at-royalty-free-image-1667407305.jpg' width={2121} height={1414}/>
                    </div>
                    <p className="mt-4 text-justify ">{infTourn.details}</p>
                    {!userInfo.isAdmin&&<div className="flex flex-row justify-end px-8">
                        {isSubscribe? 
                        <p>Suscrito!</p> : 
                        <button onClick={()=>openAlert()} className="px-4 py-2 font-bold border-2 border-black rounded-lg">
                            Suscribirme
                        </button>
                        }
                    </div>}

                    <p className="mt-4 text-xl font-semibold">Jugadores inscritos</p>
                    <div className="flex flex-col mt-4">
                        <div className="flex flex-row px-4 py-2 w-full border-b-2 border-gray-500 font-semibold">
                            <div className="w-1/2">
                                <p>Email</p>
                            </div>
                            <div className="w-1/2">
                            <p>Fecha</p>
                            </div>
                        </div>
                        {havePlayers?players:<p>No existen jugadores suscritos aún.</p>}
                    </div>
                    <div className="flex flex-col items-start mt-4">
                        <button onClick={()=>back()} className="px-4 py-2 font-bold border-2 border-black rounded-lg">
                            Regresar
                        </button>
                    </div>
                </div>
            </div></>
            }
        </>
    )
}