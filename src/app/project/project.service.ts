import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import * as moment from 'moment';

import { Project } from './project.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  formData: Project = new Project();
  readonly baseURL = `${environment.apiUrl}/project`;

  /**
   * Get all Projects
   * 
   * @return {*}  {Observable<Project[]>}
   * @memberof ProjectService
   */
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseURL).pipe(
      catchError(err => {
        console.error( err.message);
        return throwError(err);
    }),
    );
  }

  /**
   * Get a single Project by it's Id
   *
   * @param {string} id
   * @return {*}  {Observable<Project>}
   * @memberof ProjectService
   */
  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseURL}/${id}`);
  }

  /**
   * Add a new Project
   *
   * @return {*}  {Observable<any>}
   * @memberof ProjectService
   */
  postProject(): Observable<any> {
    return this.http.post(this.baseURL, this.formData);
  }

  /**
   * Update a existing Project
   *
   * @param {string} id
   * @return {*}  {Observable<any>}
   * @memberof ProjectService
   */
  updateProject(id: string): Observable<any> {
    this.formData.modifiedDate = moment(new Date()).format('DD/MM/YYYY');
    return this.http.put(`${this.baseURL}/${id}`, this.formData);
  }

  /**
   * Delete a Project
   *
   * @param {string} id
   * @return {*}  {Observable<any>}
   * @memberof ProjectService
   */
  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
