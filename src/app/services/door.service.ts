import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Door } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DoorService {
  formData: Door = new Door();
  readonly baseURL = `${environment.apiUrl}/door`;

  constructor(private http: HttpClient) {}

  /**
   * Get all Doors
   *
   * @return {*}  {Observable<Door[]>}
   * @memberof DoorService
   */
  getAllDoors(): Observable<Door[]> {
    return this.http.get<Door[]>(this.baseURL);
  }

  /**
   * Get a single Door by it's ID
   *
   * @param {string} id
   * @return {*}  {Observable<Door>}
   * @memberof DoorService
   */
  getDoorById(id: string): Observable<Door> {
    return this.http.get<Door>(`${this.baseURL}/${id}`);
  }

  /**
   * Add a new Door
   *
   * @param {string} projectId
   * @return {*}  {Observable<any>}
   * @memberof DoorService
   */
  postDoor(projectId: string): Observable<any> {
    this.formData.projectId = projectId;
    return this.http.post(this.baseURL, this.formData);
  }

  /**
   * Update a existing Door
   *
   * @param {string} id
   * @return {*}  {Observable<any>}
   * @memberof DoorService
   */
  updateDoor(id: string): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, this.formData);
  }

  /**
   * Delete a Door
   *
   * @param {string} id
   * @return {*}  {Observable<any>}
   * @memberof DoorService
   */
  deleteDoor(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
