import React from 'react';

const Login = (props) => {
  const { login, handleLoginChange, handleLogin } = props;
  return (
    <div>
      <form>
        <h2>Log In</h2>
        <input
          placeholder="Username..."
          id="username"
          name="username"
          // value={login.username}
          onChange={handleLoginChange}
        />
        <input
          placeholder="Password..."
          id="password"
          name="password"
          type="password"
          // value={login.password}
          onChange={handleLoginChange}
        />
        <button type="submit" onClick={(event) => handleLogin(event, login)}>LOGIN</button>
      </form>

    </div>
  )
};

export default Login;
