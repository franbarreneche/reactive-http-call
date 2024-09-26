import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, throwError } from 'rxjs';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ExampleServiceService {
  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<Todo[]> {
    const endpoint = 'https://jsonplaceholder.typicode.com/todos';

    return this.http.get<Todo[]>(endpoint).pipe(
      delay(2000),
      map((todos) => {
        const e: any = new Error('Error de FRAN al buscar datos');
        e.errors = ['Error de FRAN 1', 'Error de FRAN 2', 'Error de FRAN 3'];
        throw e;
      })
    );
  }
}
