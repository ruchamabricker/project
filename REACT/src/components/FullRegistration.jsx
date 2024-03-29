import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useServer } from "./Server";

function FullRegistration({ id, username, password }) {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, updateDataOnServer } = useServer();
  const [editedUser, setEditedUser] = useState({ ...currentUser });

  useEffect(() => {
    setEditedUser((prevEditedUser) => ({
      ...prevEditedUser,
      id: currentUser.id,
      website: password,
      username: username,
    }));
  }, [currentUser.id]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setEditedUser((prevUser) => {
      if (
        name === "street" ||
        name === "zipcode" ||
        name === "city" ||
        name === "suite"
      ) {
        return {
          ...prevUser,
          address: {
            ...prevUser.address,
            [name]: value,
          },
        };
      } else if (name === "lat" || name === "lng") {
        return {
          ...prevUser,
          address: {
            ...prevUser.address,
            geo: {
              ...prevUser.address.geo,
              [name]: value,
            },
          },
        };
      } else if (
        name === "companyName" ||
        name === "catchPhrase" ||
        name === "bs"
      ) {
        if (name === "companyName") {
          return {
            ...prevUser,
            company: {
              ...prevUser.company,
              ["name"]: value,
            },
          };
        } else
          return {
            ...prevUser,
            company: {
              ...prevUser.company,
              [name]: value,
            },
          };
      } else
        return {
          ...prevUser,
          [name]: value,
        };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDataOnServer("users", editedUser, "PATCH", setCurrentUser);
    navigate(`/home`);
  };

  return (
    <div>
      <h2>Edit User Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input type="text" name="id" value={id} readOnly />
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
          <input type="text" name="username" value={username} readOnly />
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
            value={editedUser.address?.street}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Suite:
          <input
            type="text"
            name="suite"
            value={editedUser.address?.suite}
            onChange={handleInputChange}
          />
        </label>

        <label>
          City:
          <input
            type="text"
            name="city"
            value={editedUser.address?.city}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Zipcode:
          <input
            type="text"
            name="zipcode"
            value={editedUser.address?.zipcode}
            onChange={handleInputChange}
          />
        </label>

        <h3>Geo Location</h3>
        <label>
          Lat:
          <input
            type="text"
            name="lat"
            value={editedUser.address?.geo?.lat}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Lng:
          <input
            type="text"
            name="lng"
            value={editedUser.address?.geo?.lng}
            onChange={handleInputChange}
          />
        </label>
        <br></br>
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
          <input type="text" name="website" value={password} readOnly />
        </label>

        <h3>Company</h3>
        <label>
          Company Name:
          <input
            type="text"
            name="companyName"
            value={editedUser.company?.name}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Catch Phrase:
          <input
            type="text"
            name="catchPhrase"
            value={editedUser.company?.catchPhrase}
            onChange={handleInputChange}
          />
        </label>
        <label>
          BS:
          <input
            type="text"
            name="bs"
            value={editedUser.company?.bs}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FullRegistration;
