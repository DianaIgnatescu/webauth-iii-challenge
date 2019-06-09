import React from 'react';

const Users = (props) => {
return (
    <div>
      <h2>List of Users</h2>
      <ul>
        {props.users.map(user => (
          <li key={user.id}>
            <p><span>Name:</span> {user.username} </p>
            <p><span>Department:</span> {user.department} </p>
          </li>
        ))}
      </ul>
    </div>
);
};

export default Users;
