import { useState } from "react";
import "../styles/Todo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ iitem, deleteIItem, updateItem }) => {
  console.log(iitem); // {done: false, id: 1, title: "저녁먹기"}
  const [todoItem, setTodoItem] = useState(iitem);
  const [readOnly, setReadOnly] = useState(true);

  // const [isCheckAll, setIsCheckAll] = useState(false);

  const onDeleteButtonClick = () => {
    deleteIItem(todoItem);
  };

  // title input 을 클릭; readOnly state를 false로 변경
  const offReadOnlyMode = () => {
    setReadOnly(false); // title input이 편집이 가능한 상태
  };

  // title input 에서 enter키; readOnly state를 true로 변경
  // input에서 enter 눌러도 ADD 되도록
  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      setReadOnly(true);
      updateItem(todoItem); // 수정 1 - text input에서 enter 누르면 수정 완료
    }
  };

  // 사용자가 키보드 입력할 때마다 item의 title을 입력한 값으로 변경
  const editEventHandler = (e) => {
    // rest: id, done 정보
    const { title, ...rest } = todoItem;

    setTodoItem({
      title: e.target.value,
      ...rest,
    });

    // if (checkboxEventHandler ===true) {
    //   setTodoItem = "lineThrough";
    // }
  };

  // checkbox의 체크 여부에 따라 todoItem state의 done 상태값을 변경
  const checkboxEventHandler = (e) => {
    // e.target.checked
    // todoItem.done = !todoItem.done;
    // setTodoItem(todoItem);

    const { done, ...rest } = todoItem;

    const updatedItem = {
      done: e.target.checked,
      ...rest,
    };
    setTodoItem(updatedItem);
    // console.log(setTodoItem);
    updateItem(updatedItem); // 수정 2 checkbox input에서 check 여부 확인

    // 취소선 만들기
    if (checkboxEventHandler.done === "true") {
      todoItem.title = "lineThrough";
    }
  };

  // check 취소선 만들기
  // itemCheck = (id) => {
  //   this.toDoList.forEach((toDo) => {
  //     if (toDo.id === id) {
  //       toDo.checked = !toDo.checked;
  //     }
  //   });
  //   this.saveToDos();
  // };

  return (
    <div className="Todo">
      <input
        type="checkbox"
        id={`todo${iitem.id}`}
        name={`todo${iitem.id}`}
        value={`todo${iitem.id}`}
        defaultChecked={iitem.done}
        onChange={checkboxEventHandler}
        // checked={isCheckAll}
        className="check"
        // className={`item-text ${checked ? "checked" : ""}`}

        // checkbox true 됐을 때 취소선 만들기
        // style={{ textDecorationLine: todoItem }}
      />
      <input
        className="text"
        // className="item-check"
        type="text"
        value={todoItem.title}
        onClick={offReadOnlyMode}
        onKeyDown={enterKeyEventHandler}
        onChange={editEventHandler}
        style={
          todoItem.done === true
            ? {
                textDecorationLine: "line-through",
                fontStyle: "italic",
                color: "#868e96",
              }
            : { textDecorationLine: "none" }
        }
      />
      <button onClick={onDeleteButtonClick} className="button2">
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
      {/* <button onClick={onDeleteButtonClick}><FontAwesomeIcon icon="fa-regular fa-trash-can" /></button> */}
    </div>
  );
};

export default Todo;

// font-style: italic;
//   text-decoration: line-through;
//   color: #868e96;
