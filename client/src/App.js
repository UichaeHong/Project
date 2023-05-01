import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import "./styles/App.scss";
import axios from "axios";
import { API_BASE_URL } from "./app-config";

// fontawesome
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckSquare, faSpinner } from "@fortawesome/free-solid-svg-icons";
// import { faSquare } from "@fortawesome/free-regular-svg-icons";
function App() {
  const api_url = API_BASE_URL;
  // console.log(api);
  // api();

  const [todoItems, setTodoItems] = useState([]);
  // const [clear, setClear] = useState("");

  useEffect(() => {
    // console.log("mount 완료");
    const getTodos = async () => {
      // const res = await axios.get("http://localhost:8000/api/todos");
      const res = await axios.get(`${api_url}/api/todos`);

      // console.log(res);
      setTodoItems(res.data.reverse());
    };

    getTodos();
  }, []);
  // Todo 추가하는 함수
  const addItem = async (newItem) => {
    newItem.id = todoItems.length + 1;
    newItem.done = false;
    // newItem => {title: 'xxx'}
    // newItem.id = todoItems.length + 1;
    // newItem.done = false;
    // // newItem => {title: 'xxx', id: n. done: false}
    // setTodoItems([...todoItems, newItem]);

    //  axios 요청 날리기 => 백엔드가 받음
    // const res = await axios.post("http://localhost:8000/api/todo", newItem);
    const res = await axios.post(`${api_url}/api/todo`, newItem);

    // console.log(res);
    setTodoItems([res.data, ...todoItems]);
  };

  // Todo 삭제하는 함수
  const deleteItem = async (targetItem) => {
    // targetItem을 매개변수로 받아오기
    // targetItem => {title: 'xxx', id: n. done: false}
    // 1. filter() :targetItem의 id와 todoItems state의 id가 같지 않은 애들을 새로운 배열로 반환
    // const newTodoItem = todoItems.filter();
    // const newTodoItem = todoItems.filter((item) => item.id !== targetItem.id);
    // // 2. state 변경
    // setTodoItems(newTodoItem);

    await axios.delete(`${api_url}/api/todo/${targetItem.id}`);
    const newTodoItem = todoItems.filter((item) => item.id !== targetItem.id);
    // 2. state 변경
    setTodoItems(newTodoItem);
    console.log(newTodoItem);
  };

  // Todo 수정하는 함수
  // (1) server.api를 이용해 DB 데이터 업데이트
  // (2) 변경된 내용을 화면에 다시 출력
  const updateItem = async (targetItem) => {
    // console.log(targetItem);
    await axios.patch(`${api_url}/api/todo/${targetItem.id}`, targetItem);
  };

  const Clear = async (targetItem) => {
    await axios.delete(`${api_url}/api/todo/${targetItem.id}`);
    const newTodoItem = todoItems.filter((item) => item.id !== targetItem.id);
    // 2. state 변경
    setTodoItems(todoItems);
    console.log(todoItems);
  };

  return (
    <div className="body">
      <div className="App">
        <h1>TodoList</h1>
        {/* todo 추가 input*/}
        <AddTodo addIItem={addItem} />
        {/* todo 목록 개수 보이기 */}
        <div className="left-todos">{todoItems.length} todos</div>
        {/* todo 전체 삭제 */}
        {/* onClick={Clear} */}

        {todoItems.length > 0 ? <div onClick={Clear}>reset</div> : ""}
        {/* <div onClick={Clear}>reset</div> */}

        {/* todo 보이는 목록 */}

        {todoItems.length > 0 ? (
          todoItems.map((item) => {
            return (
              <Todo
                key={item.id}
                iitem={item}
                deleteIItem={deleteItem}
                updateItem={updateItem}
              />
            );
          })
        ) : (
          <p className="empty-todos" style={{ backgroundColor: "aliceblue" }}>
            Todo를 추가해주세요 🐱‍🏍
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
