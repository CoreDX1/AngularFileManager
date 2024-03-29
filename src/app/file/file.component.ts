import { Component, OnInit } from "@angular/core";
import { IFile, IMenu } from "../models/file/file";
import { DataService } from "../components/list/data.service";

@Component({
    selector: "app-file",
    templateUrl: "./file.component.html"
})
export class FileComponent implements OnInit {
    private url = "";
    public snip = false;

    public AllFiles: IFile = {
        isSuccess: false,
        directory: [],
        files: []
    };

    public formatedFile: { [key: string]: string } = {
        pdf: "../../assets/Imagen/pdf.svg",
        doc: "../../assets/Imagen/doc.svg",
        exe: "../../assets/Imagen/exe.svg",
        js: "../../assets/Imagen/js.svg"
    };

    public menu: IMenu[] = [
        { name: "Create" },
        { name: "Delete" },
        { name: "Rename" },
        { name: "Home" }
    ];

    constructor(private DataSvc: DataService) {}

    ngOnInit(): void {
        this.getNameFile();
    }

    private getNameFile(): void {
        this.DataSvc.getAllFiles(this.url).subscribe((data) => {
            this.AllFiles = data;
        });
    }

    public getIconPath(file: string): string {
        const fileExtension = file.substring(file.lastIndexOf(".") + 1);
        return this.formatedFile[fileExtension];
    }

    public handleClickRefresh(): void {
        this.snip = true;
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    public reduceTextSize(text: string): string {
        if (text.length > 15) {
            return text.substring(0, 15) + "...";
        }
        return text;
    }

    public handleClickFileNext(name: string): void {
        this.url += name + "/";
        this.getNameFile();
    }

    public handleClickFilePrev(): void {
        const index = this.url.lastIndexOf("/");
        const prev = this.url.substring(0, index);
        this.url = prev.substring(0, prev.lastIndexOf("/") + 1);
        this.getNameFile();
    }
}
