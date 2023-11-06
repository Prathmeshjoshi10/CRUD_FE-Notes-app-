import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private apiUrl = 'http://localhost:3000/api/notes';

  private addNoteSubject = new BehaviorSubject<void>(undefined);
  addNote$ = this.addNoteSubject.asObservable();

  constructor(private http: HttpClient, private usersService: UsersService) {}

  user = this.usersService.getUserDetails();

  getNotes(): Observable<any> {
    const endPoint = `${this.apiUrl}/getAll/${this.user._id}`;
    return this.http.get(endPoint);
  }

  async addNote(noteData: any): Promise<Observable<any>> {
    const endPoint = `${this.apiUrl}/create`;
    noteData.userId = this.user._id;
    return this.http.post(endPoint, noteData).pipe(
      tap(() => {
        this.addNoteSubject.next();
      })
    );
  }

  async editNote(editNote: any): Promise<Observable<any>> {
    const endPoint = `${this.apiUrl}/edit/${editNote.id}`;
    return this.http.patch(endPoint, editNote).pipe(
      tap(() => {
        this.addNoteSubject.next();
      })
    );
  }

  async deleteNote(noteId: string) {
    const endPoint = `${this.apiUrl}/delete/${noteId}`;
    return this.http.delete(endPoint).pipe(
      tap(() => {
        this.addNoteSubject.next();
      })
    );
  }

  search(userId: string, term: string) {
    const endPoint = `${this.apiUrl}/search/${userId}/${term}`;
    return this.http.get(endPoint);
  }
}
