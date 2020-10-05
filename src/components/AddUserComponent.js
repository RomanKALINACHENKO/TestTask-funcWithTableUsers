import React, { useState } from 'react'
import UserSchemaStore from '../validation'
import '../App.scss'




function AddUserComponent({onCreate}) {

 const [addUser, setAddUser] = useState({
  firstName:'',
  lastName: '',
  phone: '',
  gender: true,
  age: ''
 })
 const [errUser, setErrUser] = useState({
  firstNameErr:false,
  lastNameErr: false,
  phoneErr: false,
  genderErr: false,
  ageErr: false
 })

 const [disableSubmit,setDisableSubmit] = useState(false)

 const validationUserProperty = async(event) =>{
   const element = event.target
    const nameProperty = element.name
    
    const UserSchemaProperty = UserSchemaStore[nameProperty]
    const validationData = addUser[nameProperty]
    
  try {
    await  UserSchemaProperty.validate(validationData, {abortEarly: false})  
  } catch (e) {
    
    element.className='dangerCustom form-control'
    const err = []
    e.inner.forEach((item) =>{
      err.push(item.message)  
    })
      setErrUser((state) =>{
        const newState  = {
          ...state
        }
        const nameProp = `${nameProperty}Err`
        newState[nameProp] = err
        return newState
      })
      console.log(err)
      setDisableSubmit(true)
      return err
  }
  element.className='form-control'
  setErrUser((state) =>{
    const newState  = {
      ...state
    }
    const nameProp = `${nameProperty}Err`
    newState[nameProp] = false
    return newState
  })
  setDisableSubmit(false)
}
 
 const addUserHandler = (e) =>{
  e.preventDefault()
  
  onCreate(addUser)
  setAddUser({
    firstName:'',
    lastName: '',
    phone: '',
    gender: true,
    age: ''
   })
   setErrUser({
    firstNameErr:false,
    lastNameErr: false,
    phoneErr: false,
    genderErr: true,
    ageErr: false
   })
 }
 

 const inputHandler = (e) =>{
   const nameProperty = e.target.name
   
   const valueInput = e.target.value
  setAddUser((state)=>{
    state[nameProperty]=valueInput
   return {...state
    } 
  })
 }

  return (
    <div className="col-md-6 " >
          <h4 className="mb-3">Add new user</h4>
          <form className="needs-validation was-validated" onSubmit={addUserHandler}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName" >First name</label>
                <input type="text" className="form-control"
                   name="firstName" required value={addUser.firstName}
                   onBlur={validationUserProperty} onChange={inputHandler}  />
                  <div className="invalid-feedback">
                 { 
                 
                  errUser.firstNameErr && errUser.firstNameErr.map((msg, index) =>(
                      <h6 className=" text-info pt-3" key={index}>
                      {
                          msg
                        }
                      </h6>
                     ))
                  }
                      </div>
            
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" >Last name</label>
                <input type="text" className="form-control" value={addUser.lastName} 
                 name="lastName" onBlur={validationUserProperty} required onChange={inputHandler} />
                 <div className="invalid-feedback">
                 { 
                 
                  errUser.lastNameErr && errUser.lastNameErr.map((msg, index) =>(
                      <h6 className=" text-info pt-3" key={index}>
                      {
                          msg
                        }
                      </h6>
                     ))
                  }
                      </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-6 mb-3">
                <label htmlFor="phone" >Phone</label>
                <input type="text" className="form-control " value={addUser.phone}
                 name="phone" onBlur={validationUserProperty} required onChange={inputHandler} />
                 <div className="invalid-feedback">
                 { 
                 
                  errUser.phoneErr && errUser.phoneErr.map((msg, index) =>(
                      <h6 className=" text-info pt-3" key={index}>
                      {
                          msg
                        }
                      </h6>
                     ))
                  }
                      </div>
                 
                
              </div> 
              <div className="col-md-3 mb-3">
                <label htmlFor="gender" >Gender</label>
                <select className="form-control" value={addUser.gender} onChange={inputHandler} 
                onBlur={validationUserProperty} name="gender">
                  <option value={true} >Male</option>
                  <option value={false} >Female</option>
                </select>
                <div className="invalid-feedback">
                 { 
                  // errUser.genderErr && errUser.genderErr.map((msg, index) =>(
                  //     <h6 className=" text-info pt-3" key={index}>
                  //     {
                  //         msg
                  //       }
                  //     </h6>
                  //    ))
                  }
                      </div>
                </div>

                <div className="col-md-3 mb-3">
                <label htmlFor="age" >Age</label>
                <input type="text" className="form-control" name="age"  value={addUser.age}
                 required onBlur={validationUserProperty} onChange={inputHandler} />
                <div className="invalid-feedback">
                 { 
                 
                  errUser.ageErr && errUser.ageErr.map((msg, index) =>(
                      <h6 className=" text-info pt-3" key={index}>
                      {
                          msg
                        }
                      </h6>
                     ))
                  }
                      </div>
              </div>
              </div>
               
              
            <hr className="mb-4" />  
            <button disabled={disableSubmit}  className="btn btn-primary btn-lg btn-block" type="submit" >
              Let's add
            </button>
          </form>
        </div>
  )
}

export default AddUserComponent
