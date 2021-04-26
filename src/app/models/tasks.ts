import { Date } from "mongoose";

export interface Task {
    name: string,
    description: string,
    date: Date,
    comment: string
}