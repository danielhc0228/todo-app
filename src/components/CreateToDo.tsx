import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atom";

const Input = styled.input`
    width: 100%;
    max-width: 220px;
    height: 45px;
    padding: 12px;
    border-radius: 12px;
    border: 1.5px solid lightgrey;
    outline: none;
    transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    box-shadow: 0px 0px 20px -18px;

    &:hover {
        border: 2px solid lightgrey;
        box-shadow: 0px 0px 20px -17px;
    }

    &:active {
        transform: scale(0.95);
    }

    &:focus {
        border: 2px solid grey;
    }
`;

const Button = styled.button`
    display: inline-block;
    transition: all 0.2s ease-in;
    position: relative;
    overflow: hidden;
    z-index: 1;
    color: #090909;
    padding: 0.7em 1.7em;
    cursor: pointer;
    font-size: 18px;
    border-radius: 0.5em;
    background: #e8e8e8;
    border: 1px solid #e8e8e8;

    &:active {
        color: #666;
        box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
    }

    &:before {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%) scaleY(1) scaleX(1.25);
        top: 100%;
        width: 140%;
        height: 180%;
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 50%;
        display: block;
        transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
        z-index: -1;
    }

    &:after {
        content: "";
        position: absolute;
        left: 55%;
        transform: translateX(-50%) scaleY(1) scaleX(1.45);
        top: 180%;
        width: 160%;
        height: 190%;
        background-color: #009087;
        border-radius: 50%;
        display: block;
        transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
        z-index: -1;
    }

    &:hover {
        color: #ffffff;
        border: 1px solid #009087;
    }

    &:hover:before {
        top: -35%;
        background-color: #009087;
        transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
    }
`;

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);

    const { register, handleSubmit, setValue } = useForm<IForm>();

    const handleValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => [
            { text: toDo, id: Date.now(), category },
            ...oldToDos,
        ]);
        setValue("toDo", "");
    };
    return (
        <form
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            onSubmit={handleSubmit(handleValid)}
        >
            <Input
                {...register("toDo", { required: "Please write a to do" })}
                placeholder='Write a to do'
            ></Input>
            <Button>Add</Button>
        </form>
    );
}

export default CreateToDo;
