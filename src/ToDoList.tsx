import React from "react";

function ToDoList() {
    const [toDo, setToDo] = React.useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget : { value },
        } = event;
        setToDo(value)
    };

    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={toDo} placeholder="Write a todo" />
                <button>Add</button>
            </form>
            
        </div>
    );

}

export default ToDoList;