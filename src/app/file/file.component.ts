import { Component, Host } from '@angular/core'
import { IFile, IMenu } from '../models/file/file'
import { DataService } from '../components/list/data.service'

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html'
})
export class FileComponent {
    public url: string
    public snip: boolean = false

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

    constructor(private DataSvc: DataService) {
        this.url = ''
    }

    ngOnInit(path: string): void {
        this.DataSvc.getAllFiles(path).subscribe((data) => {
            this.AllFiles = data
        })
    }

    public handleClickFileNext(event: MouseEvent, name: string): void {
        const input = event.target as HTMLInputElement
        this.url += input.innerText.trim() + '/'
        this.ngOnInit(this.url)
    }

    public handleClickFilePrev(event: MouseEvent): void {
        const index = this.url.lastIndexOf('/')
        const prev = this.url.substring(0, index)
        this.url = prev.substring(0, prev.lastIndexOf('/') + 1)
        this.ngOnInit(this.url)
    }
}
