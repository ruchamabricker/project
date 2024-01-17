import React, { createContext, useState, useContext } from "react";

export const ServerContext = createContext();

const Server = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  const fetchData = async ( entity, searchKey,
    searchValue,
    setEntity,
    start = 0,
    limit = null
  ) => {
    try {
      let url = `http://localhost:3000/${entity}?${searchKey}=${searchValue}`;
      if (limit) {
        url += `&_start=${start}&_limit=${limit}`;      }
      const response = await fetch(url);
      const newData = await response.json();
      setEntity(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateDataOnServer = async (entity, updatedData, method, setEntity) => {
    const URL =
      method === "POST"
        ? `http://localhost:3000/${entity}`
        : `http://localhost:3000/${entity}/${updatedData.id}`;
    try {
      const response = await fetch(URL, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const newData = await response.json();
      if (setEntity !== null) {
        switch (method) {
          case "POST":
            setEntity((prevData) =>
              Array.isArray(prevData)
                ? [...prevData, newData]
                : { ...prevData, ...newData }
            );
            break;

          case "PUT":
            setEntity((prevData) =>
              prevData.map((item) => (item.id === newData.id ? newData : item))
            );
            break;

          case "DELETE":
            setEntity((prevData) =>
              prevData.filter((item) => item.id !== updatedData.id)
            );
            break;

          case "PATCH":
            setEntity((prevData) =>
              Array.isArray(prevData)
                ? prevData.map((item) =>
                    item.id === newData.id ? newData : item
                  )
                : { ...prevData, ...newData }
            );
            break;

          default:
            console.warn("Unsupported method:", method);
        }
      }
      console.log("Data updated on the server:", newData.id);
    } catch (error) {
      console.error("Error updating data on the server:", error);
    }
  };

  return (
    <ServerContext.Provider value={{ currentUser, setCurrentUser, fetchData, updateDataOnServer }}>
      {children}
    </ServerContext.Provider>
  );
};

export const useServer = () => {
  return useContext(ServerContext);
};

export default Server;