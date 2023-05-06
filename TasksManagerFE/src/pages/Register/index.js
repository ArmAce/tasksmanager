import React, { useEffect } from 'react';
import Form from './components/Form';

import { useNavigate } from 'react-router-dom';

import { Alert } from '../../components';

import { useAuth } from '../../hooks';


const Register = () => {
    const { userRegister } = useAuth();
    
    const submit = async (data) => {
        userRegister(data);
    }

    return (
        <> 
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header">
                            <h4 className="text-center font-weight-light my-2">Registrati</h4>
                        </div>
                        <div className="card-body">
                            
                            {<Form handleSubmit={submit}/>}
                        </div>              
                        <div className="card-footer text-center py-3">
                            <div className="small">                  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Register;