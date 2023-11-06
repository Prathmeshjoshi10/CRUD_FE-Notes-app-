import { Component, EventEmitter, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NotesService } from 'src/app/services/notes.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
})
export class NotesListComponent implements OnInit {
  allNotes: any[] = [];
  notes: any[] = [];
  search: string = '';
  addNoteEnabled = false;
  noteClick = false;
  selectedNote: any;
  user: any;

  searchForm!: FormGroup;

  constructor(
    private notesService: NotesService,
    private userService: UsersService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadNotes();

    this.notesService.addNote$.subscribe(() => {
      this.loadNotes();
    });

    this.user = this.userService.getUserDetails();

    this.searchForm = this.fb.group({
      search: [''],
    });

    this.searchForm
      .get('search')
      ?.valueChanges.pipe(debounceTime(400))
      .subscribe((term) => {
        this.search = term;
        this.filterNotes();
      });
  }

  loadNotes() {
    this.notesService.getNotes().subscribe((notes) => {
      this.allNotes = notes.notes;
      this.filterNotes();
    });
  }

  noteSelected(note: any) {
    this.noteClick = true;
    this.selectedNote = note;
    this.addNoteEnabled = true;
  }

  childClosed() {
    this.selectedNote = null;
    this.addNoteEnabled = false;
  }

  filterNotes() {
    if (this.search) {
      this.notes = this.allNotes.filter((note) =>
        note.title.toLowerCase().includes(this.search.toLowerCase())
      );
    } else {
      this.notes = [...this.allNotes];
    }
  }
}
