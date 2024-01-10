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
    fetchData();
  }, []);



  const [sortCriteria, setSortCriteria] = useState("sequential");
  const [searchCriteria, setSearchCriteria] = useState("");

  const filteredAndSortedTodos = todos
    .filter((todo) => {
      return (
        todo.id.toString().includes(searchCriteria) ||
        todo.title.toLowerCase().includes(searchCriteria.toLowerCase()) ||
        todo.completed.toString().includes(searchCriteria)
      );
    })
    .sort((a, b) => {
      switch (sortCriteria) {
        case "sequential":
          return a.id - b.id;
        case "performance":
          return a.completed === b.completed ? a.id - b.id : a.completed ? -1 : 1;
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "random":
          return Math.random() - 0.5;
        default:
          return 0;
      }
    });

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchCriteria(e.target.value);
  };

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
  const updateDataOnServer = async (updatedData, method) => {
    console.log(updatedData)
    const URL = (method === 'POST') ? `http://localhost:3000/todos` : `http://localhost:3000/todos/${updatedData.id}`;
    try {
      await fetch(URL, {
        method: method, // Use the appropriate HTTP method for updating data on the server
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      console.log("Data updated on the server:", updatedData.id);
    } catch (error) {
      console.error("Error updating data on the server:", error);
    }
  };

  function handleDelete(todo) {
    setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== todo.id));
    updateDataOnServer(todo, 'DELETE');
  }

  function handleAddTodo() {
    setTodos((prevTodos) => {
      const newTodo = { userId: currentUser.id, title: '', completed: false };
      const updatedTodos = [...prevTodos, newTodo];
      updateDataOnServer(newTodo, 'POST');
      return updatedTodos;
    });
  }


  function checkBoxChange(todoId) {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === todoId) {
          const updatetedtodo = { ...todo, completed: !todo.completed }
          updateDataOnServer(updatetedtodo, 'PUT');
          return updatetedtodo;
        }
        else return todo;
      });
    });
  }

  const textareaChange = (todoId, newText) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        //const todo = todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        if (todo.id === todoId) {
          const updatetedtodo = { ...todo, title: newText }
          updateDataOnServer(updatetedtodo, 'PUT');
          return updatetedtodo;
        }
        else {
          return todo;
        }
      }
      );
    });
  };
  const todosElements = filteredAndSortedTodos.map((todo, index) => (
    <div key={index} className="todo-item">
      <span>{index + 1}</span> {/* Displaying the index (1-based) */}
      <textarea
        value={todo.title}
        onChange={(e) => textareaChange(todo.id, e.target.value)}
      />
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => checkBoxChange(todo.id)} // Assuming you have a function to handle checkbox change
      />
      <button onClick={() => handleDelete(todo)}>delete</button>
    </div>
  ));
  return (
    <div className="todo-list-container">
      <h1>Explore our van options</h1>
      <div>
        <label>
          Sort by:
          <select value={sortCriteria} onChange={handleSortChange}>
            <option value="sequential">Sequential</option>
            <option value="performance">Performance</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="random">Random</option>
          </select>
        </label>
        <label>
          Search:
          <input type="text" value={searchCriteria} onChange={handleSearchChange} />
        </label>
      </div>
      <div className="todo-list">{todosElements}</div>
      <button onClick={() => handleAddTodo()}>add todo</button>
    </div>
  );
}

export default Todos;
