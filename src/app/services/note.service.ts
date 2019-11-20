import { Injectable, Inject } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { EventEmitter } from 'events';
import { DialogComponent } from '../components/dialog/dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CollaboratorComponent } from '../components/collaborator/collaborator.component';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  string: Array<string> = [];
  array: Array<string> = [];
  token: String = localStorage.getItem('token');

  search:any

  private searchDataSource = new BehaviorSubject(this.search);
  currentDataSearch = this.searchDataSource.asObservable();

  events = new EventEmitter();

  constructor(private http: HttpServiceService
   ) { }

  fetchAllNotes(): any {
    return this.http.get('notes/getNotesList', this.token);
  }
  fetchDeletedNotes() {
    console.log("from service");
    return this.http.get('notes/getTrashNotesList', this.token);
  }
  deleteForever(data) {
    //console.log("from note.service")
    let obs = this.http.postWithToken('notes/deleteForeverNotes', data, this.token);
    obs.subscribe((response) => {
      this.events.emit('deleted forever');
    }, error => {
    })

  }

  saveRetrivedNote(data) {
    let obs = this.http.postWithToken("notes/trashNotes", data, this.token);
    obs.subscribe(response => {
      // Note was saved successfully
      this.events.emit('note-saved-again');
    }, error => {
      // err
    })
  }


  fetchArchiveNotes() {
    console.log("from service");
    return this.http.get('notes/getArchiveNotesList', this.token);

  }
  unarchive(data) {
    let obs = this.http.postWithToken("notes/archiveNotes", data, this.token);
    obs.subscribe(response => {
      //Note Archived
      this.events.emit('note-unarchived');
    }, error => {
      //Some error in archiving note
    })

  }

  saveNote(data) {
    let obs = this.http.postWithToken("notes/addNotes", data, this.token);
    obs.subscribe(response => {
      // Note was saved successfully
      this.events.emit('note-saved-in-database');
    }, error => {
      // Some error came in saving notes
    })
  }

  updateNote(data) {
    let obs = this.http.postWithToken("notes/updateNotes", data, this.token);
    obs.subscribe(response => {
      // Note was saved successfully
      this.events.emit('note-updated-in-database');
    }, error => {
      // Some error came in saving notes
    })
  }


  deleteNote(data) {
    let obs = this.http.postWithToken("notes/trashNotes", data, this.token);
    obs.subscribe(response => {
      //Note Deleted Successfully
      this.events.emit('note-deleted-in-database');
    }, error => {
      //Some error in deleting Note
    })
  }

  deleteArchiveNote(data) {
    let obs = this.http.postWithToken("notes/trashNotes", data, this.token);
    obs.subscribe(response => {
      //Note Deleted Successfully
      this.events.emit('note-deleted-in-archive');
    }, error => {
      //Some error in deleting Note
    })
  }

  changeNoteColor(data) {
    let obs = this.http.postWithToken("notes/changesColorNotes", data, this.token);
    obs.subscribe(response => {
      //Color of note changed
      this.events.emit('note-color-changed-in-database');
    }, error => {
      //Some error in changing color of note
    })
  }

  archiveNote(data) {
    let obs = this.http.postWithToken("notes/archiveNotes", data, this.token);
    obs.subscribe(response => {
      //Note Archived
      this.events.emit('note-archived-in-database');
    }, error => {
      //Some error in archiving note
    })
  }

  pinNote(data) {
    let obs = this.http.postWithToken("notes/pinUnpinNotes", data, this.token);
    obs.subscribe(response => {
      this.events.emit('note-pined/unpined');

    })
  }

  getUser() {
    let obs = this.http.get("user", this.token);
    obs.subscribe((response: any) => {
      for (let i = 0; i < response.length; i++) {
        this.array.push(response[i].email);
      }
      //console.log(this.array)
      localStorage.setItem('string', JSON.stringify(this.array));
      // console.log(localStorage.getItem('string'));
      // for(let i=0;i<response.length;i++){
      //   console.log(response[i].email)
      // }

    })
  }
  searchData(search: String) {
    this.search = search
    this.searchDataSource.next(search);
  }
 //noteId:any=localStorage.getItem('noteId')
  searchUserList(user,noteId){
    
    let obs = this.http.postWithToken('user/searchUserList',user,this.token)
    obs.subscribe((response: any) => {
      //console.log(this.noteId)
      let obs1 = this.http.postWithToken('notes/'+noteId+'/AddcollaboratorsNotes',response.data.details[0],this.token)
      obs1.subscribe((response)=>{
        this.events.emit('user-search-processed');
      })
    
    
  })
}
}