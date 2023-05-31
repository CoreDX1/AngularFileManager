import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/internal/Observable'
import { IFile } from 'src/app/models/file/file'
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private urlApi = 'http://localhost:5076/FileManager/View/File'
    constructor(private http: HttpClient) {}

    getAllFiles(): Observable<IFile> {
        return this.http.get<IFile>(this.urlApi)
    }
}
