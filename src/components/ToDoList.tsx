import { useRecoilValue } from "recoil";
import { toDoState } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
    const todos = useRecoilValue(toDoState);

    return (
        <div>
            <h1>To Do List</h1>
            <hr></hr>
            <CreateToDo />
            <ul>
                {todos.map((todo) => (
                    <ToDo key={todo.id} {...todo} />
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;
