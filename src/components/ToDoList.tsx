import { useRecoilValue } from "recoil";
import { toDoSelector } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
    const [toDo, doing, done] = useRecoilValue(toDoSelector);

    return (
        <div>
            <h1>To Do List</h1>
            <hr></hr>
            <CreateToDo />
            <h2>To Dos</h2>
            <ul>
                {toDo.map((todo) => (
                    <ToDo key={todo.id} {...todo} />
                ))}
            </ul>
            <hr />
            <h2>Doings</h2>
            <ul>
                {doing.map((doing) => (
                    <ToDo key={doing.id} {...doing} />
                ))}
            </ul>
            <hr />
            <h2>Dones</h2>
            <ul>
                {done.map((done) => (
                    <ToDo key={done.id} {...done} />
                ))}
            </ul>
            <hr />
        </div>
    );
}

export default ToDoList;
