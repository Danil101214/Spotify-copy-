import mongoose, { ObjectId } from "mongoose"

export class RolesDto {
    readonly id_user: string
    readonly value: string
    readonly description: string
}