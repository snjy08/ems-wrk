import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { addEmployeeResponseContext } from '../contexts/ContextShare';

function Add() {
  const [show, setShow] = useState(false);
  const { addEmployeeResponse, setAddEmployeeResponse } = useContext(addEmployeeResponseContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState('');
  const [image, setImage] = useState(null);
  
  const resetState = () => {
    setName('');
    setEmail('');
    setMobile('');
    setGender('');
    setCourse('');
    setImage('');
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    resetState();
    setShow(false);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('f_Name', name);
    formData.append('f_Email', email);
    formData.append('f_Mobile', mobile);
    formData.append('f_Designation', designation);
    formData.append('f_Gender', gender);
    formData.append('f_Course', course);
    formData.append('f_Image', image);

    try {
      const response = await axios.post('http://localhost:4000/employee', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    
      setAddEmployeeResponse(response.data.data);
      alert(response.data.message);
      handleClose();
    } catch (error) {
      console.error('Error adding employee:', error);
      alert(error.response.data.message);
    }
  };
  return (
    <div>
      <a onClick={handleShow} className="btn btn-outline-light btn-lg" href="#!" role="button">
        Create Employee
      </a>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>

            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="mobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="designation">
              <Form.Label>Designation</Form.Label>
              <Form.Control as="select" value={designation} onChange={(e) => setDesignation(e.target.value)}>
                <option value="">Select Designation</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Project Manager">Project Manager</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Check
                type="radio"
                label="Male"
                name="gender"
                value="Male"
                onChange={(e) => setGender(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Female"
                name="gender"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="courses">
              <Form.Label>Courses</Form.Label>
              <Form.Check
                type="checkbox"
                label="MCA"

                value="MCA"
                onChange={(e) => setCourse(e.target.value)}
              />
              <Form.Check
                type="checkbox"
                label="BCA"

                value="BCA"
                onChange={(e) => setCourse(e.target.value)}
              />
              <Form.Check
                type="checkbox"
                label="BSc"

                value="BSC"
                onChange={(e) => setCourse(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Add;
