import { Module } from "@nestjs/common";
import { FileService } from "./File.Service";

@Module({
    providers: [FileService],
    exports: [FileModule]
})

export class FileModule {}