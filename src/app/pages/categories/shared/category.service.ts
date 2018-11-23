import { Injectable } from '@angular/core';
import { Category } from './category.model';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import {map, catchError, flatMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private appiPath: string = "api/categories"

  constructor(private http: HttpClient) { }

  getAll():Observable<Category[]>{
    return this.http.get(this.appiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
      )
  }

  getById(id:number):Observable<Category>{
    const url=`${this.appiPath}/${id}`
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategy)
      )
  }

  create(category : Category):Observable<Category>{
    return this.http.post(this.appiPath, category).pipe(
    catchError(this.handleError),
    map(this.jsonDataToCategy)
    )
  }

  update(category: Category):Observable<Category>{
    const url=`${this.appiPath}/${category.id}`;
    return this.http.put(url, category).pipe(
      catchError(this.handleError),
      map(() => category)
    )
  }

  delete(id:number):Observable<any>{
    const url=`${this.appiPath}/${id}`
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }


  //METODOS PRIVADOS
  private jsonDataToCategories(jsonData : [any]):Category[]{
    const categories: Category[] = [];
    jsonData.forEach(element => categories.push(element as Category))
    return categories;
  }

  private jsonDataToCategy(jsonData: any):Category{
     return jsonData as Category;
  }

  private handleError(error:any):Observable<any>{
    console.log("Error na requisição =>", error)
    return throwError(error)
  }



}
