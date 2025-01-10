import { Categories, IToDo, toDoState } from "../atom";
import { useSetRecoilState } from "recoil";

import styled from "styled-components";

/* Styled component for the list item */
const ListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px 15px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

/* Styled component for the text span */
const ListText = styled.span`
    flex-grow: 1;
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    margin-right: 10px;
    word-wrap: break-word;
`;

/* Styled component for buttons */
const ListButton = styled.button`
    background-color: #6200ea;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-left: 5px;

    &:hover {
        background-color: #3700b3;
    }

    /* Special style for the delete button */
    &:last-child {
        background-color: #ff5252;

        &:hover {
            background-color: #d32f2f;
        }
    }
`;

function ToDo({ text, category, id }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newToDo = { text, id, category: name as any };
            return [
                ...oldToDos.slice(0, targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex + 1),
            ];
        });
    };

    const onClickDelete = () => {
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            return [
                ...oldToDos.slice(0, targetIndex),
                ...oldToDos.slice(targetIndex + 1),
            ];
        });
    };

    return (
        <ListItem>
            <ListText>{text}</ListText>
            {category !== Categories.DOING && (
                <ListButton name={Categories.DOING} onClick={onClick}>
                    Doing
                </ListButton>
            )}
            {category !== Categories.TO_DO && (
                <ListButton name={Categories.TO_DO} onClick={onClick}>
                    To Do
                </ListButton>
            )}
            {category !== Categories.DONE && (
                <ListButton name={Categories.DONE} onClick={onClick}>
                    Done
                </ListButton>
            )}
            <ListButton onClick={onClickDelete}>Delete</ListButton>
        </ListItem>
    );
}

export default ToDo;
