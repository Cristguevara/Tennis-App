"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import NavBar from "@/components/navBar";
import Alert from "@/components/Alert";
import { valdateToken } from '@/hooks/validateToken'
import LoadingAnimation from '@/components/loading'

const EditUser = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true)
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false)
  const [alertComp, setAlertComp] = useState(<Alert/>)

  const getUser = async () => {
    const res = await fetch(`/api/users/${params.id}`);
    const data = await res.json();
    console.log(data)
    if(data.ok){
        setUserInfo({ name: data.user.name, email: data.user.email });
    }else{
      alert('Error al recuperar la información del usuario.')
    }
    return
  };

  useEffect(() => {
      async function validateToken(){
        const data = await valdateToken()
        if(!data.ok || !data.isAdmin){
            router.push('/')
        }
        await getUser();
        setLoading(false)
      }
      validateToken()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    openAlert();
  };

  const handleChange = (e) =>
  setUserInfo({ ...userInfo, [e.target.name]: e.target.value });

  const validate = () => {
    let errors = {};

    if (!newTask.title) {
      errors.title = "Se requiere el nombre del usuario";
    }
    if (!newTask.description) {
      errors.description = "Se requiere email";
    }
    return errors;
  };

  const updateTask = async () => {
    try {
      //console.log('userInfo: ',userInfo)
      const res = await fetch(`/api/users/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({name:userInfo.name}),
      });
      const data = await res.json()
      if(data.ok){
        router.push("/home");
        router.refresh();
      }else{
        alert('Error al editar usuario')
      }
    } catch (error) {
      console.error(error);
    }
  };

  function openAlert(){
    setShowAlert(true)
    setAlertComp(
    <Alert title={'Editar usuario'} 
    description={'¿Está seguro que desea editar el usuario?'} 
    // data={data} 
    funcRequest={updateTask}
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
      <div className="flex justify-center mt-40">
        <form onSubmit={handleSubmit}>
          <header className="flex justify-between">
            <h1 className="font-bold text-3xl mb-4">
            Editar Usuario
            </h1>
          </header>
          <label >Nombre</label>
          <input
            type="text"
            placeholder="Nombre del usuario"
            name="name"
            onChange={handleChange}
            value={userInfo.name}
            className=" border-2 w-full p-4 rounded-lg my-4 "
          />
          <label >Correo electrónico</label>
          <input
            type="text"
            placeholder="Nombre del torneo"
            name="email"
            onChange={handleChange}
            value={userInfo.email}
            className=" border-2 w-full p-4 rounded-lg my-4 "
            disabled={true}
          />

          <div className="w-full flex flex-row justify-between">
            <button onClick={()=>router.push('/home')} type="button" className="bg-red-600 text-white font-semibold px-8 py-2 rounded-lg">
              Cancelar
            </button>
            <button className="bg-green-600 text-white font-semibold px-8 py-2 rounded-lg">
                Guardar
            </button>
          </div>
        </form>
      </div></>
      }
    </>
  );
};

export default EditUser;