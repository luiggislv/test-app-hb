import React from 'react'
import {db} from '../firebase'

const Firestore = (props) => {

    const [hobbies, setHobbies] = React.useState([])
    const [hobbie, setHobbie] = React.useState('')
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [id, setId] = React.useState('')
  
  
    React.useEffect(() => {
  
      const obtenerDatos = async () => {
  
        try {
  
          /*const data = await db.collection(props.user.uid).get()*/

          /*const db = firebase.firestore()*/
          const data = await db.collection('hobbies').get()
          const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          console.log(arrayData)
          setHobbies(arrayData)
          
        } catch (error) {
          console.log(error)
        }
  
      }
  
      obtenerDatos()
  
    }, [])
  
    const agregar = async (e) => {
      e.preventDefault()
  
      if(!hobbie.trim()){
        console.log('está vacio')
        return
      }
  
      try {
  
        const nuevoHobbie = {
          nombre: hobbie
        }
        /*const data = await db.collection(props.user.uid).add(nuevoHobbie)*/
        const data = await db.collection('hobbies').add(nuevoHobbie)
  
        setHobbies([
          ...hobbies,
          {...nuevoHobbie, id: data.id}
        ])
  
        setHobbie('')
        
      } catch (error) {
        console.log(error)
      }
  
      console.log(hobbie)
    }
  
    const eliminar = async (id) => {
      try {
        
        await db.collection('hobbies').doc(id).delete()
  
        const arrayFiltrado = hobbies.filter(item => item.id !== id)
        setHobbies(arrayFiltrado)
  
      } catch (error) {
        console.log(error)
      }
    }
  
    const activarEdicion = (item) => {
      setModoEdicion(true)
      setHobbie(item.nombre)
      setId(item.id)
    }
  
    const editar = async (e) => {
      e.preventDefault()
      if(!hobbie.trim()){
        console.log('vacio')
        return
      }
      try {
        
        await db.collection('hobbies').doc(id).update({
          nombre: hobbie
        })
        const arrayEditado = hobbies.map(item => (
          item.id === id ? {id: item.id, nombre: hobbie} : item
        ))
        setHobbies(arrayEditado)
        setModoEdicion(false)
        setHobbie('')
        setId('')
      } catch (error) {
        console.log(error)
      }
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <h3>Lista de Hobbies</h3>
                    <ul className="list-group">
                        {
                        hobbies.map(item => (
                            <li className="list-group-item" key={item.id}>
                            {item.nombre}
                            <button 
                                className="btn btn-danger btn-sm float-right"
                                onClick={() => eliminar(item.id)}
                            >
                                Eliminar
                            </button>
                            <button 
                                className="btn btn-warning btn-sm float-right mr-2"
                                onClick={() => activarEdicion(item)}
                            >
                                Editar
                            </button>
                            </li>
                        ))
                        }
                    </ul>
                </div>
                <div className="col-md-6">
                    <h3>
                        {
                        modoEdicion ? 'Editar Hobbie' : 'Agregar Hobbie'
                        }
                    </h3>
                    <form onSubmit={modoEdicion ? editar : agregar}>
                        <input 
                        type="text"
                        placeholder="Ingrese hobbie"
                        className="form-control mb-2"
                        onChange={e => setHobbie(e.target.value)}
                        value={hobbie}
                        />
                        <button 
                        className={
                            modoEdicion ? 'btn btn-warning btn-block' : 'btn btn-dark btn-block'
                        }
                        type="submit"
                        >
                        {
                            modoEdicion ? 'Editar' : 'Agregar'
                        }
                        </button>
                    </form>
                </div>
            </div> 
        </div>
    )
}

export default Firestore