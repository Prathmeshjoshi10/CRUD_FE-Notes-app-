import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotesService } from 'src/app/services/notes.service';
import { isEmpty } from 'lodash';
@Component({
  selector: 'app-add-edit-note',
  templateUrl: './add-edit-note.component.html',
  styleUrls: ['./add-edit-note.component.css'],
})
export class AddEditNoteComponent implements OnInit {
  noteForm!: FormGroup;
  isEditable: boolean = false;
  isForView: boolean = false;
  // selectedNote: any;

  @Output() close = new EventEmitter();
  @Input()
  selectedNote: any;
  @Input()
  isAddeable: any;

  /* noteSelected.subscribe((note: any) => {
    this.selectedNote = note;
  }) */

  constructor(private fb: FormBuilder, private noteService: NotesService) {}

  ngOnInit(): void {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      note: ['', Validators.required],
    });

    /* if (this.selectedNote !== null) {
      debugger;
      this.isForView = true;
    } */

    if (isEmpty(this.selectedNote)) {
      this.isForView = false;
    } else {
      this.isForView = true;
    }

    /* if (this.isEditable) {
      if (this.selectedNote) {
        this.noteForm.patchValue(this.selectedNote);
      }
    } */
  }

  async onSubmit() {
    if (this.noteForm.valid) {
      let formData = this.noteForm.value;

      if (this.isEditable) {
        formData.id = this.selectedNote._id;
        console.log('formData --->', formData);

        (await this.noteService.editNote(formData)).subscribe(
          (response: any) => {
            this.close.emit();
            this.selectedNote = null;
            this.isForView = false;
            this.isEditable = false;
          },
          (error: any) => {
            console.log('Error:', error);
          }
        );
      } else {
        (await this.noteService.addNote(formData)).subscribe(
          (response: any) => {
            this.close.emit();
          },
          (error: any) => {
            console.log('Error:', error);
          }
        );
      }
    }
  }

  onEdit() {
    this.isForView = false;
    this.isAddeable = false;
    this.isEditable = true;
    this.noteForm.patchValue(this.selectedNote);
  }

  async onDelete(noteId: string) {
    await (
      await this.noteService.deleteNote(noteId)
    ).subscribe(
      (response) => {
        this.isEditable = false;
        this.isForView = false;
        this.onClose();
      },
      (error: any) => {
        console.log('Error:', error);
      }
    );
  }

  onClose() {
    debugger;
    this.isForView = false;
    this.isEditable = false;
    this.selectedNote = null;
    this.close.emit();
  }
}
