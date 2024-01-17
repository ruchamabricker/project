const Todo = ({
  id,
  title,
  completed,
  textareaChange,
  checkBoxChange,
  handleDelete,
}) => {
  return (
    <div className="todo-item">
      <span>{id}</span>
      <textarea
        value={title}
        onChange={(e) => textareaChange({ id, title }, e.target.value)
        }
      />
      <input
        type="checkbox"
        checked={completed}
        onChange={() => checkBoxChange({ id, completed })}
      />
      <button onClick={() => handleDelete({ id })}>
        delete
      </button>
    </div>
  );
};

export default Todo;
