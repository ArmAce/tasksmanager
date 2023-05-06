import React, { useState } from "react";
import { INITIAL_USER } from "../../../constants/initials";
import { Link } from "react-router-dom";


const Form = ({ handleSubmit }) => {
  
  const [ dataInput, setDataInput ] = useState(INITIAL_USER.FORM_REGISTER);

  const handleChange = (e) => {
    let value = e.target.value;
    
    setDataInput((prevState) => ({
        ...prevState,
        [e.target.name]: value
    }));
  };

  const validateForm = () => {
    return dataInput.email === "" || dataInput.password === "";
  }

  return (
    <form onSubmit={ ( e ) => { e.preventDefault(); handleSubmit(dataInput)} }>

      <div className="row mb-3">
        <div className="col-md-12">
          <input 
            className="form-control" 
            name="email" 
            type="text"
            value={ dataInput.email } 
            onChange={ handleChange } 
            placeholder="Email"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-12">
          <input 
            className="form-control" 
            name="name" 
            type="text"
            value={ dataInput.name } 
            onChange={ handleChange } 
            placeholder="Name"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-12">
          <input 
            className="form-control" 
            name="password" 
            type="password" 
            value={ dataInput.password } 
            onChange={ handleChange } 
            placeholder="Password" 
          />
        </div>
      </div>
      <h6 className="mb-2">Hai già un account? <Link to='/login'>Accedi</Link></h6> 
      <div className="d-flex align-items-center justify-content-between mt-0 mb-0">
        <button disabled={ validateForm() } type="submit" className="btn btn-primary w-100" >
          Registrati
        </button>
      </div>
    </form>
  );
};

export default Form;