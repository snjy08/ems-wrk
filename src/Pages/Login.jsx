import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await  axios.post('http://localhost:4000/login', { f_userName: name, f_Pwd: password });
            const userData = response.data.data;
            localStorage.setItem('user', JSON.stringify(userData));
            alert(response.data.message)
            navigate('/home')
        } catch (error) {
            console.error('Login error:', error.response.data);
            setError(error.response.data);
        }
    };

    return (
        <div>
            <section className="vh-100">
                <div style={{ minHeight: "200px" }}></div>
                <div className="container-fluid h-custom" >
                    <div className="">
                        <h2 className="fw-bold mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h2>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <div className="" style={{ width: "400px" }}>
                            <form onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <input type="text" id="form3Example3" className="form-control form-control-lg" placeholder="EnterUser Name" value={name} onChange={(e) => setName(e.target.value)} />
                                    <label className="form-label" htmlFor="form3Example3">User Name</label>
                                </div>

                                <div className="form-outline mb-3">
                                    <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>

                                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
