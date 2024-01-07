// function FullRegisteration(password, userName) {




//   return (
//     <>
//       <h1>home</h1>
//     </>
//   )
// }

// export default FullRegisteration

import React, { useState } from 'react';

const FullRegistration = ({ user }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // כאן תוכל להעביר את המשתנה editedUser לפונקציה שמתעדכנת בשרת, לדוג.
    console.log('User details submitted:', editedUser);
  };

  return (
    <div>
      <h2>Edit User Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input
            type="text"
            name="id"
            value={editedUser.id}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Username:
          <input
            type="text"
            name="username"
            value={editedUser.username}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Email:
          <input
            type="text"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
        </label>

        <h3>Address</h3>
        <label>
          Street:
          <input
            type="text"
            name="street"
            value={editedUser.address.street}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Suite:
          <input
            type="text"
            name="suite"
            value={editedUser.address.suite}
            onChange={handleInputChange}
          />
        </label>

        <label>
          City:
          <input
            type="text"
            name="city"
            value={editedUser.address.city}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Zipcode:
          <input
            type="text"
            name="zipcode"
            value={editedUser.address.zipcode}
            onChange={handleInputChange}
          />
        </label>

        <h3>Geo Location</h3>
        <label>
          Lat:
          <input
            type="text"
            name="lat"
            value={editedUser.address.geo.lat}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Lng:
          <input
            type="text"
            name="lng"
            value={editedUser.address.geo.lng}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={editedUser.phone}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Website:
          <input
            type="text"
            name="website"
            value={editedUser.website}
            onChange={handleInputChange}
          />
        </label>

        <h3>Company</h3>
        <label>
          Company Name:
          <input
            type="text"
            name="companyName"
            value={editedUser.company.name}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Catch Phrase:
          <input
            type="text"
            name="catchPhrase"
            value={editedUser.company.catchPhrase}
            onChange={handleInputChange}
          />
        </label>

        <label>
          BS:
          <input
            type="text"
            name="bs"
            value={editedUser.company.bs}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FullRegistration;