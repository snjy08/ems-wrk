import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';


function Edit({ employee, onEditSuccess }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(employee.f_Name);
  const [email, setEmail] = useState(employee.f_Email);
  const [mobile, setMobile] = useState(employee.f_Mobile);
  const [designation, setDesignation] = useState(employee.f_Designation);
  const [gender, setGender] = useState(employee.f_Gender);
  const [course, setCourse] = useState(employee.f_Course);
  const [image, setImage] = useState(employee.f_Image);
  const [newImage, setNewImage] = useState(null); // State to store the new image
  const handleClose = () => {
    setShow(false);
    setNewImage(null); // Reset new image when closing the modal
  };

  const handleShow = () => setShow(true);

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]); // Store the new image temporarily
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('f_Id', employee.f_Id);
    formData.append('f_Name', name);
    formData.append('f_Email', email);
    formData.append('f_Mobile', mobile);
    formData.append('f_Designation', designation);
    formData.append('f_Gender', gender);
    formData.append('f_Course', course);

    if (newImage) {
      formData.append('f_Image', newImage);
    }

    try {
      const response = await axios.put(`http://localhost:4000/employee/${employee._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });


      console.log(response.data.data)
      onEditSuccess();
      alert(response.data.message);
      handleClose();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div>
      <button type="button" className="btn btn-link btn-sm btn-rounded" onClick={handleShow}>
        Edit
      </button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
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
              <Form.Control type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
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
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Female"
                name="gender"
                value="Female"
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="courses">
              <Form.Label>Courses</Form.Label>
              <Form.Check
                type="checkbox"
                label="MCA"
                checked={course === "MCA"}
                value="MCA"
                onChange={(e) => setCourse(e.target.value)}
              />
              <Form.Check
                type="checkbox"
                label="BCA"
                checked={course === "BCA"}
                value="BCA"
                onChange={(e) => setCourse(e.target.value)}
              />
              <Form.Check
                type="checkbox"
                label="BSc"
                checked={course === "BSC"}
                value="BSC"
                onChange={(e) => setCourse(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <br></br>
              {newImage ? (
                <img
                  src={URL.createObjectURL(newImage)}
                  alt="Preview"
                  style={{ width: "85px", height: "85px" }}
                  className=""
                />
              ) : (
                <img
                  src={`http://localhost:4000/uploads/${image}`}
                  alt=""
                  style={{ width: "85px", height: "85px" }}
                  className=""
                />
              )}
              <Form.Control className='mt-1' type="file" onChange={handleImageChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Edit;
