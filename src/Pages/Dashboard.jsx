import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Edit from '../Componenets/Edit';
import Add from '../Componenets/Add';
import PageNotFound from './PageNotFound';
import { addEmployeeResponseContext } from '../contexts/ContextShare';
function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}
function Dashboard() {
    const { addEmployeeResponse, setAddEmployeeResponse } = useContext(addEmployeeResponseContext)
 
    const [employees, setEmployees] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    console.log(searchKey)
    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/employees?search=${searchKey}`);
            setEmployees(response.data.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [searchKey, addEmployeeResponse]);
  
  
    const deleteEmployee = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/employee/${id}`);

            console.log(response.data);
            fetchEmployees()
            alert("Deleted")
        } catch (error) {

            console.error('Error deleting employee:', error);
        }
    };
    const user = JSON.parse(localStorage.getItem('user'));
    const handleEditSuccess = () => {
      
        fetchEmployees();
    };

    return (
        <div>
            {
                user ? <>
                    <div
                        className="p-5 text-center bg-image v"
                        style={{
                            backgroundImage: "url('https://www.analyticsinsight.net/wp-content/uploads/2018/12/Employee-management.jpg')",
                            height: "80vh"
                        }}
                    >
                        <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <div className="text-white">
                                    <h1 className="mb-3">Welcome</h1>
                                    <h4 className="mb-3"><i>Management is doing things right; leadership is doing the right things</i></h4>
                                    <Add />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='me-auto ms-4'>

                        </div>
                        <div className="input-group rounded ms-auto me-4" style={{ width: "500px" }}>
                            <h5 className='me-5 mt-1 fw-bold'>Total Count : <span style={{ color: "green" }}>{employees.length}</span></h5>
                            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} aria-describedby="search-addon" />
                            <span className="input-group-text border-0" id="search-addon">
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                    </div>
                    <div style={{ minHeight: "500px" }}>
                        <table className="table align-middle mb-0 bg-white container mt-5">
                            <thead className="bg-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile Number</th>
                                    <th>Designation</th>
                                    <th>Gender</th>
                                    <th>Course</th>
                                    <th>Create Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map(employee => (
                                    <tr key={employee._id}>
                                        <td><p className="fw-bold  mb-1">{employee.f_Id}</p></td>
                                        <td>
                                            <img
                                                src={`http://localhost:4000/uploads/${employee.f_Image}`}
                                                alt=""
                                                style={{ width: "45px", height: "45px" }}
                                                className="rounded-circle"
                                            />
                                        </td>
                                        <td><p className="fw-bold  mb-1">{employee.f_Name}</p></td>
                                        <td> <p className="fw-bold  mb-1">{employee.f_Email}</p></td>
                                        <td><p className="fw-bold  mb-1">{employee.f_Mobile}</p></td>
                                        <td><p className="fw-bold  mb-1">{employee.f_Designation}</p></td>
                                        <td><p className="fw-bold  mb-1">{employee.f_Gender}</p></td>
                                        <td><p className="fw-bold  mb-1">{employee.f_Course}</p></td>
                                        <td><p className="fw-bold  mb-1">{formatDate(employee.createdAt)}</p></td>
                                        <td className='d-flex justify-content-center align-items-center mt-3'>
                                            <Edit employee={employee} onEditSuccess={handleEditSuccess} />
                                            <button type="button" className="btn btn-link btn-sm btn-rounded" onClick={() => deleteEmployee(employee._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div></> : <div style={{ height: "82vh" }} className='d-flex justify-content-center align-items-center' >
                    <PageNotFound />
                </div>}
        </div >
    );
}

export default Dashboard;
