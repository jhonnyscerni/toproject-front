import { HttpClient, HttpParams } from '@angular/common/http';
import { delay, tap, take, catchError, map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

export class CrudService<T> extends BaseService {

    constructor(protected http: HttpClient, private API_URL) {
        super();
    }

    search(params): Observable<T[]> {
        return this.http.get<T[]>(this.API_URL, {params})
            .pipe(
                 tap(console.log),
                catchError(super.serviceError));
    }

    list(): Observable<T[]> {
        return this.http.get<T[]>(this.API_URL)
            .pipe(
                //delay(1000),
                // tap(console.log),
                catchError(super.serviceError));
    }

    loadByID(id): Observable<T> {
        return this.http.get<T>(`${this.API_URL}/${id}`)
            .pipe(
                catchError(super.serviceError));
    }

    private create(record: T): Observable<T> {
        return this.http
            .post(this.API_URL, record)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    private update(record: T): Observable<T> {
        return this.http
            .put(`${this.API_URL}/${record['id']}`, record)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));;
    }

    save(record: T) {
        console.log(record);
        if (record['id']) {
            console.log('update!')
            return this.update(record);
        }
        console.log('create!')
        return this.create(record);
    }

    remove(id): Observable<T> {
        return this.http.delete(`${this.API_URL}/${id}`)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));;
    }
}