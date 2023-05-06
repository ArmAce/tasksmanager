import React, { useState } from "react";
import { INITIAL_USER } from "../../../constants/initials";
import { Link } from "react-router-dom";

const Form = ({ handleSubmit }) => {
  
  const [ dataInput, setDataInput ] = useState(INITIAL_USER.FORM_LOGIN);

  const handleChange = (e) => {
    let value;
    switch(e.target.type) {
      case 'checkbox':
        value = e.target.checked;
        break;
      default:
        value = e.target.value;
    }
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
            name="password" 
            type="password" 
            value={ dataInput.password } 
            onChange={ handleChange } 
            placeholder="Password" 
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-12">
          <div className="form-check mb-1">
            <input 
              className="form-check-input" 
              name="remember" 
              type="checkbox" 
              value={ dataInput.remember } 
              onChange={ handleChange } 
            />
            <label className="form-check-label" htmlFor="inputRememberPassword">Ricordami</label>
          </div>
        </div>
      </div>
       
      <h6 className="mb-2">Non hai un account? <Link to='/register'>Registrati</Link></h6> 
      <div className="d-flex align-items-center justify-content-between mt-0 mb-0">
        <button disabled={ validateForm() } type="submit" className="btn btn-primary w-100" >
          Login
        </button>
      </div>
    </form>
  );
};

export default Form;