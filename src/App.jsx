import { useEffect, useState } from "react"
import Formulario from "./components/Formulario"
import { Header } from "./components/Header"
import { ListadoPacientes } from "./components/ListadoPacientes"

export const App =  () => {

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect( () => {

    const obtenerLS = () => { 
                 setPacientes(JSON.parse( localStorage .getItem('pacientes')) ?? [] )
    };
    obtenerLS();
  },[]);

  useEffect(() => {
     localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes]) ;

  const generarId = () => {
      const radom = Math.random().toString(36).substring(2);
      const fecha = Date.now().toString(36);

      return radom+fecha
  }

  const grabarPaciente = ( paciente ) => {
    
    if ( !paciente.id ) {
      setPacientes( [...pacientes, {...paciente, id: generarId()} ] )
    } else {
      setPacientes( pacientes.map( (p) => ( p.id === paciente.id ? paciente : p )))
    }
    
    setPaciente( {} );
    
  }

  const eliminarPaciente = ( id ) => {
    setPacientes( pacientes.filter( p =>  p.id !== id  ));
  }

  return (
    <div className="container mx-auto mt-5">
       <Header />

        <div className="mt-12 md:flex">

        <Formulario 
            grabarPaciente={ grabarPaciente }
            paciente = { paciente }
        />

        <ListadoPacientes 
            pacientes = { pacientes } 
            setPaciente = { setPaciente }
            eliminarPaciente = { eliminarPaciente }
        />

        </div>
    </div>
  )
}

