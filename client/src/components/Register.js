import React from 'react';

const Register = (props) => {
  const { register, handleRegisterChange, handleRegister } = props;

  return (
    <div>
      <form>
        <h2>Register</h2>
        <input
          placeholder="Username..."
          name="username"
          id="username"
          onChange={handleRegisterChange}
        />
        <input
          placeholder="Password..."
          name="password"
          type="password"
          id="password"
          onChange={handleRegisterChange}
        />
        <input
          placeholder="Department..."
          name="department"
          id="department"
          onChange={handleRegisterChange}
        />
        <button type="submit" onClick={(event) => handleRegister(event, register)}>REGISTER</button>
      </form>
    </div>
  )
};

export default Register;
