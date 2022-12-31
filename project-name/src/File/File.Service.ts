import { Injectable } from "@nestjs/common";
import * as path from 'path'
import * as fileSystem from 'fs'
import * as uuid from 'uuid'
import multer, { Multer } from "multer";
export enum TypedFile {
    AUDIO = 'audio',
    PICTURE = 'image'
}

@Injectable()
export class FileService {
    createFile(type: TypedFile, file: Express.Multer.File): string {
        try {
            const fileExtenstion = file.originalname.split('.').pop()
            const fileName = uuid.v4() + '.' + fileExtenstion
            const filePath = path.resolve(__dirname, '..', 'static', type)
            if(!fileSystem.existsSync(filePath)) {
                fileSystem.mkdirSync(filePath, {recursive: true})
            }
            fileSystem.writeFileSync(path.resolve(filePath, fileName), file.buffer)
            return type + '/' + fileName
        } catch (error) {
            console.log(error)
        }
    }
    removeFile() {

    }    
}