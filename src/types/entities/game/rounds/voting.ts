import { Category } from "..";
import { ITimer } from "../../timer";

export interface IVoting {
    candidates: Category[]; // category ids
    votes: ICategoryVote[]
    timer: ITimer;
    finished: boolean;
}

export interface ICategoryVote {
    voter: ID; // player id
    preference: Category;
}