import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { last, lastValueFrom, Observable } from 'rxjs';
import { User } from 'src/interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
 private arrUser: User[] = [];
  private baseUrl: string = 'https://peticiones.online/api/users';
  

  constructor( private httpClient:HttpClient ) { }

  getUsers(pPage:number=1): Observable<User[]> {
  return this.httpClient.get<any>(`${this.baseUrl}?page=${pPage}`);
  }
  getUserById(pId:number):Promise<any>{
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${pId}`));
  }
  addUser(pUser:User):Promise<User>{
    return lastValueFrom(this.httpClient.post<User>(this.baseUrl,pUser));
  }

  delete(pId:number):Promise<any>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${pId}`));
  }
  update(pUser:User):Promise<any>{
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}/${pUser.id}`,pUser));
  }

}
