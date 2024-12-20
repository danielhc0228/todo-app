import { atom } from "recoil";

export interface IToDo {
    text: string;
    id: number;
    category: "DOING" | "TO_DO" | "DONE";
}

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});
