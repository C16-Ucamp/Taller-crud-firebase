import React, { useEffect, useState } from 'react'
import { db } from './Firebase/firebase'
import { collection, getDocs, addDoc, deleteDoc, updateDoc,doc } from 'firebase/firestore'

const App = () => {
 // users: estado actual
 // setUser: estado que se actualiza 
 // useState, que contiene el estado inicial
  const [users,setUser] = useState([])
  const userCollectionRef = collection(db,'reservas')
  const [name, setName] = useState("")
  const [mail, setMail]= useState("")
  const [phone, setPhone] = useState(0)

  //--------Update--------
  const [formUpdate, setFormUpdate] = useState(false)
  const [item, setItem] = useState(null)

  const createUser = async() =>{
    await addDoc(userCollectionRef, {nombre:name, correo:mail, telefono:phone})
    getUsers()
  }

  const getUsers = async() =>{
    const data = await getDocs(userCollectionRef)
    setUser(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
  }

  const borrarUsuario = async(id) =>{
    const userDoc = doc(db,'reservas',id)
    await deleteDoc(userDoc)
    getUsers()
  }

  const formUpdateOpen = (data) => {
    setFormUpdate(true)
    setItem(data)
  }

  const handleChange = (e) =>{
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
    console.log(setItem)
  }
 
  const onUpdate = async(id) =>{
    await updateDoc(doc(db,'reservas',id), item);
    getUsers()
  }

  useEffect(() =>{
    getUsers();
  },[]);

  return (
    <div>
      <h1>Taller Crud-Firebase</h1>

      <input type="text" placeholder='Nombre' onChange={(e) =>{setName(e.target.value)}}  />
      <input type="text" placeholder='Correo' onChange={(e) =>{setMail(e.target.value)}} />
      <input type="number" placeholder='Telefono' onChange={(e) =>{setPhone(e.target.value)}} />
      <button onClick={createUser}>Enviar</button>


      {users.map((item)=>{
      return(
        <div key={item.id}>
         <h1>Nombre: {item.nombre}</h1>
         <h1>Correo:{item.correo}</h1>
         <h1>Telefono: {item.telefono}</h1>
         <button onClick={()=> borrarUsuario(item.id)}>Borrar</button>
         <button onClick={()=> formUpdateOpen(item)}>Editar</button>
        </div>
      )
    })}

    {
      formUpdate && 
      <>
      <input type="text" placeholder='Nombre' value={item.nombre} name="nombre" onChange={handleChange}/>
      <input type="text" placeholder='Correo' value={item.correo} name="correo" onChange={handleChange}/>
      <input type="text" placeholder='Telefono' value={item.telefono} name="telefono" onChange={handleChange}/>
      <button onClick={()=> onUpdate(item.id)}>Guardar</button>
      </>
    }


    </div>

 

  )
}

export default App
