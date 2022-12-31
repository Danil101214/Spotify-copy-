import { ObjectId } from "mongoose"

export class BanDto {
    id_user: string
    ban: boolean
    ban_description: string
}