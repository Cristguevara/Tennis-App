"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { valdateToken } from '@/hooks/validateToken'
import NavBar from "@/components/navBar";
import Alert from "@/components/Alert";
import LoadingAnimation from '@/components/loading'

const NewTournament = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false)
  const [alertComp, setAlertComp] = useState(<Alert/>)

  const getTournament = async () => {
    const res = await fetch(`/api/tournaments/${params.id}`);
    const data = await res.json();
    console.log(data)
    if(data.ok){
      setNewTask({ title: data.tournament.name, description: data.tournament.details });
    }else{
      alert('Error al recuperar la información del torneo.')
    }
    return
  };

  useEffect(() => {
    async function validateToken(){
      const data = await valdateToken()
      if(!data.ok || !data.isAdmin){
          router.push('/')
      }
      if (params.id) {
          await getTournament();
      }
      setLoading(false)
    }
    validateToken()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let errs = validate();

    // if (Object.keys(errs).length) return setErrors(errs);

    // setIsSubmitting(true);


    openAlert();
    
    //router.push("/");
  };

  const handleChange = (e) =>
    setNewTask({ ...newTask, [e.target.name]: e.target.value });

  const validate = () => {
    let errors = {};

    if (!newTask.title) {
      errors.title = "Se requiere el nombre del torneo";
    }
    if (!newTask.description) {
      errors.description = "Se requiere descripción";
    }

    return errors;
  };

  const createTask = async () => {
    try {
      if(!newTask.title ||!newTask.description){
        alert('Nombre y descripción son requeridos')
        return
      }
      const res = await fetch("/api/tournaments", {
        method: "POST",
        body: JSON.stringify({name:newTask.title, details:newTask.description}),
      });
      const data = await res.json()
      if(data.ok){
        router.push("/home");
        router.refresh();
      }else{
        setShowAlert(false)
        alert('Error al crear torneo')
      }
    } catch (error) {
      console.error(error);
      setShowAlert(false)
      alert('Error al crear torneo')
    }
  };

  function openAlert(){
    setShowAlert(true)
    setAlertComp(
    <Alert title={params.id ?'Editar torneo':'Crear torneo'} 
    description={params.id ?'¿Está seguro que desea editar el torneo?':'¿Está seguro que desea crear un torneo?'} 
    // data={data} 
    funcRequest={params.id ? updateTask:createTask}
    cancel={setShowAlert}
    />) 
  }

  const updateTask = async () => {
    try {
      if(!newTask.title ||!newTask.description){
        alert('Nombre y descripción son requeridos')
        return
      }
      const res = await fetch(`/api/tournaments/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({name:newTask.title, details:newTask.description}),
      });
      const data = await res.json()
      if(data.ok){
        router.push("/home");
        router.refresh();
      }else{
        setShowAlert(false)
        alert('Error al editar torneo')
      }
    } catch (error) {
      console.error(error);
      setShowAlert(false)
      alert('Error al editar torneo')
    }
  };

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
                    <h1 className="font-bold text-3xl">
                      {!params.id ? "Crear torneo" : "Editar torneo"}
                    </h1>
                  </header>
                  <input
                    type="text"
                    placeholder="Nombre del torneo"
                    name="title"
                    onChange={handleChange}
                    value={newTask.title}
                    className=" border-2 w-full p-4 rounded-lg my-4 "
                  />

                  <textarea
                    name="description"
                    placeholder="Detalles del torneo"
                    onChange={handleChange}
                    value={newTask.description}
                    className=" border-2 w-full p-4 rounded-lg my-4"
                    rows={3}
                  ></textarea>

                  <div className="w-full flex flex-row justify-between">
                    <button onClick={()=>router.push('/home')} type="button" className="bg-red-600 text-white font-semibold px-8 py-2 rounded-lg">
                      Cancelar
                    </button>
                    <button className="bg-green-600 text-white font-semibold px-8 py-2 rounded-lg">
                      {params.id ? "Guardar" : "Crear"}
                    </button>
                  </div>
                </form>
              </div></>
            }
    </>
  );
};

export default NewTournament;