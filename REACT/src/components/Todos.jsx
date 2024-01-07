import { useState, useEffect } from "react";
let todosCopy = [];
import "./Todos.css";
const Todos = () => {
  //   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const currentUser = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  };
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    console.log("mount");
    console.log(todos);
    fetchData();

    return () => {
      if (todosCopy.length > 0) {
        console.log(todos);
        console.log("unmount");
        console.log(todosCopy);
        updateDataOnServer(todosCopy);
      }
    };
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/todos?userId=${currentUser.id}`);
      const newData = await response.json();
      setTodos(newData);
      todosCopy = newData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const updateDataOnServer = async (updatedData) => {
    try {
      await fetch(`http://localhost:3000/todos?userId=${currentUser.id}/updateData`, {
        method: "PUT", // Use the appropriate HTTP method for updating data on the server
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      console.log("Data updated on the server:", updatedData);
    } catch (error) {
      console.error("Error updating data on the server:", error);
    }
  };
  const todosElements = todos.map((todo, index) => (
    <div key={todo.id} className="todo-item">
      <span>{todo.id}</span> {/* Displaying the index (1-based) */}
      <textarea
        value={todo.title}
        onChange={(e) => textareaChange(todo.id, e.target.value)}
      />
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => checkBoxChange(todo.id)} // Assuming you have a function to handle checkbox change
      />
    </div>
  ));

  function checkBoxChange(todoId) {
    console.log(todos);
    todosCopy = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    console.log(todosCopy);
    setTodos((prevTodos) => {
      console.log("checkBoxChange");
      // Map over the previous todos and toggle the 'completed' property of the matching todo
      return prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      );
    });
    setTodos(todosCopy);
    console.log(todos);
    updateDataOnServer(todosCopy);
  }

  const textareaChange = (todoId, newText) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, title: newText } : todo
      );
    });
  };
  return (
    <div className="todo-list-container">
      <h1>Explore our van options</h1>
      <div className="todo-list">{todosElements}</div>
    </div>
  );
}

export default Todos;
