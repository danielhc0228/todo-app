import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atom";
import styled from "styled-components";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { isDarkAtom } from "../atom";

const HR = styled.hr`
    height: 12px;
    border: 0;
    box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
`;

const TitleContainer = styled.div`
    text-align: center;
    margin-top: 20px; /* Adds space from the top */
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px; /* Space below the title */
    color: ${(props) => props.theme.accentColor};
`;

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
`;

const Tab = styled.button<{ isActive: boolean }>`
    cursor: pointer;
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    height: 40px;
    width: 70px;
    margin: 5px;
    border: none;
    background-color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.cardBgColor};
    border-radius: 10px;
    color: ${(props) =>
        props.isActive ? props.theme.textColor : props.theme.accentColor};

    transition: background-color 0.3s ease, color 0.3s ease;
    &:hover {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
        background-color: ${(props) =>
            props.isActive ? props.theme.tabColor : props.theme.accentColor};
        color: ${(props) =>
            props.isActive ? props.theme.accentColor : props.theme.textColor};
    }
`;

/* Styled container for the to-do list */
const TodoContainer = styled.div`
    width: 100%;
    max-width: 500px; /* Limit the container's width */
    margin: 20px auto; /* Center the container horizontally and add spacing at the top */
    background-color: #fff; /* White background for contrast */
    border: 1px solid #ddd; /* Subtle border for definition */
    border-radius: 10px; /* Rounded corners for a modern look */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
    padding: 20px; /* Inner padding for spacing */
    overflow-y: auto; /* Enable scrolling if content exceeds the height */
    max-height: 400px; /* Set a maximum height to limit overflow */
`;

/* Optional: Styled heading for the container */
const TodoHeading = styled.h2`
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 15px;
    color: #333; /* Darker text for better readability */
`;

const Toggle = styled.button`
    position: fixed; /* Changed from absolute to fixed for consistent placement */
    bottom: 20px; /* Distance from the bottom of the viewport */
    left: 20px; /* Distance from the left of the viewport */
    color: ${(props) => props.theme.accentColor};
    background: #5e5df0;
    border-radius: 999px;
    box-shadow: #5e5df0 0 10px 20px -10px;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    font-size: 25px;
    font-weight: 500;
    opacity: 1;
    outline: 0 solid transparent;
    padding: 2px 20px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: fit-content;
    word-break: break-word;
    border: 0;
`;

function ToDoList() {
    const isDark = useRecoilValue(isDarkAtom);
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event: React.MouseEvent<HTMLButtonElement>) => {
        const category = event.currentTarget.dataset.value; // Access the data-value attribute
        if (category) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setCategory(category as any);
        }
    };
    return (
        <div>
            <TitleContainer>
                <Title>To Do List</Title>
                <HR></HR>
            </TitleContainer>
            <Toggle onClick={toggleDarkAtom}>{isDark ? "☾" : "☀︎"}</Toggle>
            <Tabs>
                <Tab
                    isActive={category === Categories.TO_DO}
                    data-value={Categories.TO_DO}
                    onClick={onInput}
                >
                    To Do
                </Tab>
                <Tab
                    isActive={category === Categories.DOING}
                    data-value={Categories.DOING}
                    onClick={onInput}
                >
                    DOING
                </Tab>
                <Tab
                    isActive={category === Categories.DONE}
                    data-value={Categories.DONE}
                    onClick={onInput}
                >
                    DONE
                </Tab>
            </Tabs>
            <CreateToDo />
            <TodoContainer>
                <TodoHeading>Your Tasks</TodoHeading>
                {toDos?.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo} />
                ))}
            </TodoContainer>
        </div>
    );
}

export default ToDoList;
