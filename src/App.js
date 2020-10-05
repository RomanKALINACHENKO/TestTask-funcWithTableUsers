import React, { useState} from 'react'
import AddUserComponent from './components/AddUserComponent'
import SortComponent from './components/SortComponent'
import UserSchemaStore from './validation'
import './App.scss'
 


function App() {
  
 const [users,setUsers] = useState(JSON.parse(localStorage.getItem('users')) || [])
 const [updateUser, setUpdateUser] = useState(false)
 const [user,setUser] = useState({})
 

  
const addUser = async(user)=>{
  console.log(user)
  console.log(users)
  if(user.gender === 'Male'){
    user.gender = true
  } else{
    user.gender = false
  }  
  
//VALIDATION user
const UserSchema = UserSchemaStore.complexUserSchema
const validationData = user
try {
  await  UserSchema.validate(validationData, {abortEarly: false})  
} catch (e) {
  
  const err = []
  e.inner.forEach((item) =>{
    err.push(item.message)  
  })
    
    console.log(err)
    return err
}

//VALIDATION user
   setUsers((state)=>{
    const User = {
      ...user,
      id: Date.now(),
      
    }
    const newArray = [
      ...state,
      User
    ]
      
        
     localStorage.setItem('users', JSON.stringify(newArray))
     return  newArray
   })
}
 
const deleteHandler = (id, e) =>{
   
  
   setUsers((state) =>{
    const idx = state.findIndex((user) => user.id === id)
    if(idx === -1) return
    
    const newArray = [
      ...state.slice(0, idx),
      ...state.slice(idx + 1)
    ]
    localStorage.setItem('users', JSON.stringify(newArray))
    return newArray
   })
 }

const sorting = (sortingType, sortBy)=>{
    
  console.log(sortingType,sortBy)
  switch (sortingType) {
    case 1: // Сортировка от меньшего к большему 0-9 || a-z

    setUsers((state)=>{
      const sortArr = state.sort((a, b)=>{
        return a[sortBy]-b[sortBy]
      })
      
      const newArray = sortArr.concat()
      
      localStorage.setItem('users', JSON.stringify(newArray))
      return newArray
    })
      break
    case 2: // Сортировка от большего  к меньшему 9-0 || z-a
   
    setUsers((state)=>{
      const sortArr = state.sort((a, b)=>{
        return b[sortBy]-a[sortBy]
      })
      
      const newArray = sortArr.concat()
      localStorage.setItem('users', JSON.stringify(newArray))
    return newArray
    })
      break
    default:
      break
  } 
}

const changeToUpdate= (data, e) =>{
  
  setUpdateUser((state)=>{
    return data.id
  })
  setUser(() =>{
    
      return {
        ...data
      }
    
  })
  
}

const updatingUser = (e) =>{
  const nameProperty = e.target.name
   
  const valueInput = e.target.value
 setUser((state)=>{
   state[nameProperty]=valueInput
  return {...state
   } 
 })
}



const saveUpdatingUser = (e) => {
  
  setUsers((state) =>{
    let nextState = []
    state.map((User) =>{
      if (User.id === updateUser) {
      return nextState.push(user)
      
      } else{
       return nextState.push(User)
      }
    })
    localStorage.setItem('users', JSON.stringify(nextState))
    return nextState
  })
  setUpdateUser((state) =>{
    return false
  })
}
  

  return (
    <div className="container" >
    <main className="">
     <h1>Table</h1>
     <div className="table-responsive border rounded">
      <table className="table table-striped table-sm">
        <thead className="" >
          <tr>
            <th>№ <SortComponent sortingBy="id" sorting={sorting}  /></th>
            <th>First Name <SortComponent sortingBy="firstName" sorting={sorting}  /></th>
            <th> Last Name <SortComponent sortingBy="lastName" sorting={sorting}  /></th>
            <th>Phone <SortComponent sortingBy="phone" sorting={sorting}  /></th>
            <th>Gender <SortComponent sortingBy="gender" sorting={sorting}  /></th>
            <th>Age <SortComponent sortingBy="age" sorting={sorting}  /></th>
          </tr>
        </thead>
        <tbody>
          { users.length ?
            users.map((data)=>
            (data.id === updateUser) ?  
                <tr className="bg-warning" key={user.id} > 
              <td>
                 
              {user.id} 
              </td>
              <td>
              <input type="text" className="form-control"
              value= {user.firstName} onChange={updatingUser}  name="firstName" required />
                </td>
              <td>
              <input type="text" className="form-control" 
              value= {user.lastName} onChange={updatingUser} name="lastName" required />
                </td>
              <td>
              <input type="text" className="form-control" 
              value= {user.phone} onChange={updatingUser} name="phone" />
                </td>
              <td>
              <input type="text" className="form-control" 
              value= {user.gender ? 'Male':'Female'} name="gender" required
               onChange={updatingUser} />
                </td>
              <td>
              <input type="text" className="form-control" 
              value= {user.age} onChange={updatingUser} name="age" required />
                </td>
              <td onClick={saveUpdatingUser} >(✓)</td>
                </tr>
               : 
                <tr key={data.id} onDoubleClick={changeToUpdate.bind(this,data)}>
              <td>{data.id}</td>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.phone}</td>
              <td>{data.gender ? 'Male':'Female'}</td>
              <td>{data.age}</td>
              <td onClick={deleteHandler.bind(this,data.id)} >(X)</td>
                </tr>
              
            
            )
             :  (<tr>
                     <td>
                  No have user now...
                   </td>
              </tr>)
             }   
        </tbody>
      </table>
     </div>
    </main>
    <div className="col-md-3 "></div>
        <AddUserComponent  onCreate={addUser} />
    </div >
  )
  
}



export default App
