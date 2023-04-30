import { useState } from "react";
import "../styles/AddTodo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { faSquare } from "@fortawesome/free-regular-svg-icons";
// import { faPlus } from "@fortawesome/free-regular-svg-icons";
// import { faSolidFaPlus } from "@fortawesome/free-regular-svg-icons";
// App.js 37번 줄에 있는 addIItem
const AddTodo = ({ addIItem }) => {
  const [todoItem, setTodoItems] = useState({
    title: "",
  });

  const onButtonClick = () => {
    // 1. props addIItem 함수 실행
    addIItem(todoItem);
    // 2. input 초기화
    setTodoItems({ title: "" });
  };

  const onEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      onButtonClick();
    }
  };
  return (
    <div className="AddTodo">
      <input
        type="text"
        placeholder="Add your new Todo"
        value={todoItem.title}
        onChange={(e) => setTodoItems({ title: e.target.value })}
        onKeyDown={onEnterKeyDown}
        className="Input"
      />
      <button onClick={onButtonClick} className="button">
        {/* <FontAwesomeIcon icon="fa-solid fa-plus" /> */}
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default AddTodo;
