import { useState, useEffect } from "react";
import { useServer } from "../components/Server";

import Todo from "../components/Todo";

const Todos = () => {
  const { currentUser, updateDataOnServer, fetchData } = useServer();

  const [todos, setTodos] = useState([]);
  const [filteredAndSortedTodos, setFilteredAndSortedTodos] = useState([]);

  const [sortCriteria, setSortCriteria] = useState("sequential");
  const [idSearchCriteria, setIdSearchCriteria] = useState("");
  const [titleSearchCriteria, setTitleSearchCriteria] = useState("");
  const [completedSearchCriteria, setCompletedSearchCriteria] = useState("all");

  useEffect(() => {
    fetchData("todos", "userId", currentUser.id, setTodos);
  }, []);

  useEffect(() => {
    const filterAndSortTodos = () => {
      let filteredTodos = todos.filter((todo) => {
        const isIdMatch = todo.id.toString().includes(idSearchCriteria);
        const isTitleMatch = todo.title
          .toLowerCase()
          .includes(titleSearchCriteria.toLowerCase());
        const isCompletedMatch =
          completedSearchCriteria === "all" ||
          (completedSearchCriteria === "true" && todo.completed) ||
          (completedSearchCriteria === "false" && !todo.completed);

        return isIdMatch && isTitleMatch && isCompletedMatch;
      });

      switch (sortCriteria) {
        case "sequential":
          filteredTodos.sort((a, b) => a.id - b.id);
          break;
        case "performance":
          filteredTodos.sort((a, b) => {
            if (a.completed === b.completed) {
              return a.id - b.id;
            } else if (a.completed) {
              return -1;
            } else {
              return 1;
            }
          });
          break;
        case "alphabetical":
          filteredTodos.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "random":
          filteredTodos.sort(() => Math.random() - 0.5);
          break;
        default:
          filteredTodos.sort((a, b) => a.id - b.id);
          break;
      }

      setFilteredAndSortedTodos(filteredTodos);
    };

    filterAndSortTodos();
  }, [
    todos,
    sortCriteria,
    idSearchCriteria,
    titleSearchCriteria,
    completedSearchCriteria,
  ]);

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleIdSearchChange = (event) => {
    setIdSearchCriteria(event.target.value);
  };

  const handleTitleSearchChange = (event) => {
    setTitleSearchCriteria(event.target.value);
  };

  const handleCompletedSearchChange = (event) => {
    setCompletedSearchCriteria(event.target.value);
  };

  const textareaChange = (todo, newText) => {
    updateDataOnServer(
      "todos",
      { id: todo.id, title: newText },
      "PATCH",
      setTodos
    );
  };

  function checkBoxChange(todo) {
    updateDataOnServer(
      "todos",
      { id: todo.id, completed: !todo.completed },
      "PATCH",
      setTodos
    );
  }

  function handleDelete(todo) {
    updateDataOnServer("todos", todo, "DELETE", setTodos);
  }

  function handleAddTodo() {
    const newTodo = { userId: currentUser.id, title: "", completed: false };
    updateDataOnServer("todos", newTodo, "POST", setTodos);
  }

  return (
    <div className="todos-container">
      <h1>Todos</h1>
      <div className="sort-container">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortCriteria} onChange={handleSortChange}>
          <option value="sequential">Sequential</option>
          <option value="performance">Performance</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">random</option>
        </select>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by ID"
          value={idSearchCriteria}
          onChange={handleIdSearchChange}
        />
        <input
          type="text"
          placeholder="Search by Title"
          value={titleSearchCriteria}
          onChange={handleTitleSearchChange}
        />
        <select
          value={completedSearchCriteria}
          onChange={handleCompletedSearchChange}
        >
          <option value="all">All</option>
          <option value="true">Done</option>
          <option value="false">Not Done</option>
        </select>
      </div>
      <button onClick={() => handleAddTodo()}>add todo</button>
      <br></br>
      <br></br>
      <div className="todos-list">
        {filteredAndSortedTodos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              {...todo}
              textareaChange={textareaChange}
              checkBoxChange={checkBoxChange}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todos;
