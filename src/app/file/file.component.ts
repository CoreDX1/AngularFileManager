import { Component } from '@angular/core'
import { IFile, IMenu } from '../models/file/file'
import { DataService } from '../components/list/data.service'

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html'
})
export class FileComponent {
    public AllFiles: IFile = {
        isSuccess: false,
        directory: [],
        files: []
    }

    public menu: IMenu[] = [
        { name: 'Create' },
        { name: 'Delete' },
        { name: 'Rename' },
        { name: 'Home' }
    ]

    constructor(private DataSvc: DataService) {}

    ngOnInit() {
        this.DataSvc.getAllFiles().subscribe((data) => {
            this.AllFiles = data
        })
    }
}
