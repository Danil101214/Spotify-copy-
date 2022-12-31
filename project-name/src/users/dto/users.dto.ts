import mongoose, { ObjectId } from "mongoose";

export class CreateUsers {
    readonly _id: string
    readonly email: string;
    readonly password: string;
    readonly name: string;
    readonly ban: boolean;
    readonly ban_description: string;
    readonly roles: string
}