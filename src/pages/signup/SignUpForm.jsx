import React, { useState, useEffect } from 'react';
//npm install --save axios
import api from "../../api";


function SignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(2022, errors);
  }, [errors]);

  const onSubmit = (e) => {
    e.preventDefault();
    api.register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      passwordConfirmation: formData.passwordConfirmation
    }).then(res => {
      console.log(3033, res.data);
    }).catch(err => {
      setErrors(err.response.data)
    })
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <div >
      <form onSubmit={onSubmit}>
        <h1>Join Us!</h1>
        <div className="form-group">
          <label className="control-label">Username</label>
          <input
            className="form-control "
            name="username"
            value={formData.username}
            onChange={onChange}
            type="text" />
          {errors.username ? <span style={{ color: 'red' }}> {errors.username}</span> : ''}
        </div>

        <div className="form-group">
          <label className="control-label">Email</label>
          <input
            className="form-control "
            name="email"
            value={formData.email}
            onChange={onChange}
            type="text" />
          {errors.email ? <span style={{ color: 'red' }}> {errors.email}</span> : ''}
        </div>

        <div className="form-group">
          <label className="control-label">Password</label>
          <input
            className="form-control "
            name="password"
            value={formData.password}
            onChange={onChange}
            type="password" />
        </div>

        <div className="form-group">
          <label className="control-label">Password Confirm</label>
          <input
            className="form-control "
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={onChange}
            type="password" />
        </div>
        <div className='form-group'>
          <button className='btn btn-primary btm-lg'>Submit</button>
        </div>
      </form>
    </div>

    /* <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="basic-addon1">@</span>
    </div>
    <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
    
    <div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
    <div class="input-group-append">
      <span class="input-group-text" id="basic-addon2">@example.com</span>
    </div>
    </div>
    
    <label for="basic-url">Your vanity URL</label>
    <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="basic-addon3">https://example.com/users/</span>
    </div>
    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"/>
    </div>
    
    <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">$</span>
    </div>
    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"/>
    <div class="input-group-append">
      <span class="input-group-text">.00</span>
    </div>
    </div>
    
    <div class="input-group">
    <div class="input-group-prepend">
      <span class="input-group-text">With textarea</span>
    </div>
    <textarea class="form-control" aria-label="With textarea"></textarea>
    </div> */



  );
}


export default SignUpForm;
