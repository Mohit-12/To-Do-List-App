import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';

import { Note } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class NoteService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    

    register(note: Note) {
        return this.http.post(`${environment.apiUrl}/notes/create`, note);
    }

    getAll() {
        return this.http.get<Note[]>(`${environment.apiUrl}/notes`);
    }

    getByUser(userId: string) {
        return this.http.get<Note[]>(`${environment.apiUrl}/user/${userId}`);
    }

    getById(id: string) {
        return this.http.get<Note>(`${environment.apiUrl}/notes/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/notes/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/notes/${id}`);
    }
}