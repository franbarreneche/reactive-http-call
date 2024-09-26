import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExampleServiceService, Todo } from './example-service.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { catchError, delay, map, Observable, of, startWith, tap } from 'rxjs';

interface State {
  isLoading: boolean;
  errors: string[];
  data: Todo[];
}

const initialState: State = {
  isLoading: true,
  errors: [],
  data: [],
};
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe],
  template: `
    <h1>Welcome</h1>

    @if (vm$ | async; as vm) {
      @if (vm.isLoading) {
        <h4>Loading...</h4>
      }
      @else if(vm.data.length > 0) {
      <table>
      <thead>
        <th style="border: 1px solid #ddd;">ID Usuario</th>
        <th style="border: 1px solid #ddd;">ID</th>
        <th style="border: 1px solid #ddd;">Titulo</th>
        <th style="border: 1px solid #ddd;">Completado</th>
      </thead>
      <tbody>
        @for (item of vm.data; track item.id) {
          <tr>
            <td style="border: 1px solid #ddd;">{{item.userId}}</td>
            <td style="border: 1px solid #ddd;">{{item.id}}</td>
            <td style="border: 1px solid #ddd;">{{item.title}}</td>
            <td style="border: 1px solid #ddd;">{{item.completed}}</td>
          </tr>
        }
      </tbody>
    </table>
    }
    @else {
      <p>No data available</p>
    }
    @if(vm.errors.length > 0) {
      <ul style="color: #D8000C; background-color: #FFBABA;">
        @for (error of vm.errors; track error) {
          <li>{{error}}</li>
        }
      </ul>
    }
    <pre>Debug: {{vm | json}}</pre>
  }
  `,
})
export class AppComponent {
  protected service = inject(ExampleServiceService);
  protected vm$: Observable<State> = this.service.getAll().pipe(
    map((data) => ({ isLoading: false, errors: [], data }) ),
    startWith({ isLoading: true, errors: [], data: [] }),
    catchError((err) => of({ isLoading: false, errors: err.errors, data: [] }))
  );

}


