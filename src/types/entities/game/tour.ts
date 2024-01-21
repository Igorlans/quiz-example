import { IGreeting } from "@/pages/GreetingPage";
import { IRound } from "./rounds";
import { ParseDoc } from "..";


export interface IDatabaseTour {
    id: ID;
    tourModelID: ID;
    position: number;
    greeting?: IGreeting;
}

export type ITour =  ParseDoc<IDatabaseTour> & {
    rounds: IRound[];
}