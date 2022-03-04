import { useEffect, useState } from "react";
import { Error } from "./Error";

const Formulario = ( { grabarPaciente, paciente } ) => {

const initialSate = {
  nombre: '',
  propietario: '',
  email:'',
  alta:'',
  sintomas:''
}

useEffect(() => {
    Object.keys(paciente).length > 0 && setFormulario( paciente );
}, [paciente])


const [formulario, setFormulario] = useState( initialSate )
const [error, setError] = useState(false)

const { nombre, propietario, email, alta, sintomas } =  formulario

const handleInputChange = ({ target }) =>{
  setFormulario( { ...formulario,  [target.name] : target.value } );
}

const handleSubmit = (e) =>{

  e.preventDefault();

  if ([nombre,propietario,email.alta,sintomas].includes('')) {
      setError( true );
      return;
  } 
    
  
  setError( false );

  grabarPaciente( formulario );
  setFormulario( initialSate )

}

  return (
    <div className='md:w-1/2 lg:w-2/5'>
        <h2 className='font-black text-3xl text-center '>Seguimiento Pacientes</h2>

        <p className=' text-lg mt-5 mb-5 text-center'>
          Añade Pacientes y {' '}
          <span className=' text-indigo-600 font-bold'>Administralos</span>
        </p>

        <form 
            onSubmit={ handleSubmit }
            className=' bg-white shadow-md rounded-lg py-10 px-5 mb-5'
        >
          { error && <Error>
                        <p>Todos los campos son obligatorios</p>
                     </Error>
          }
          <div  className="mb-5">
              <label htmlFor="mascota" className="block text-gray-700 uppercase">Nombre Mascota</label>
              <input
                  id="mascota"
                  type="text"
                  placeholder='nombre de la mascota'
                  className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md focus:border-indigo-500"
                  name="nombre"
                  value={nombre}
                  onChange = { handleInputChange }
              />
          </div>

          <div className="mb-5">
              <label htmlFor="propietario" className="block text-gray-700 uppercase">Nombre Propietario</label>
              <input
                  id="propietario"
                  type="text"
                  placeholder='nombre del propietario'
                  className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md focus:border-indigo-500"
                  name="propietario"
                  value={ propietario }
                  onChange={ handleInputChange }
              />
          </div>

          <div className="mb-5">
              <label htmlFor="email" className="block text-gray-700 uppercase">Email</label>
              <input
                  id="email"
                  type="email"
                  placeholder='Email'
                  className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md focus:border-indigo-500"
                  name="email"
                  value={ email }
                  onChange={ handleInputChange }
              />
          </div>

          <div className="mb-5">
              <label htmlFor="alta" className="block text-gray-700 uppercase">Alta</label>
              <input
                  id="alta"
                  type="date"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md focus:border-indigo-500"
                  name="alta"
                  value={ alta }
                  onChange={ handleInputChange }
              />
          </div>

          <div className="mb-5">
              <label htmlFor="sintomas" className="block text-gray-700 uppercase">Sintomas</label>
              <textarea
                  id="sintomas"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md focus:border-indigo-500"
                  placeholder="Describe los sintomas"
                  name="sintomas"
                  value={ sintomas }
                  onChange={ handleInputChange }
              />
          </div>

          <input 
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
            value={ !paciente.id ? "Agregar Paciente" : "Editar Paciente" }
          />
        </form>
    </div>
  )
}

export default Formulario