import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Router } from '@angular/router';

import { UserService } from '../user.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import {InboxService} from '../inbox.service';
import {Note} from '../note.model';


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  username = '';
  step = -1;
  notes: Note[];
  pinned: Note[];
  archive: Note[];
  trash: Note[];
  inboxForm: FormGroup;
  inboxForm1: FormGroup;

  turn = 0;

  constructor(private snackBar: MatSnackBar, private userservice: UserService, private inboxservice: InboxService, private router: Router) {
    this.setStep(-1);
    this.pinned = [];
    this.archive = [];
    this.trash = [];

    this.inboxForm = new FormGroup ({
      token : new FormControl('', []),
      title : new FormControl('', []),
      note : new FormControl('', [])
    });

    this.inboxForm1 = new FormGroup ({
      token : new FormControl('', []),
      title : new FormControl('', []),
      note : new FormControl('', [])
    });

    let x = localStorage.getItem('token');
    if( x != null) {
      x = x.slice(1, x.length-1);
    }
    this.inboxForm.get('token').setValue(x);
    this.inboxForm1.get('token').setValue(x);
    this.isloggedin();
  }

  ngOnInit() {

  }


  turner(id){
    this.turn=id;
    if(this.turn==0){
      this.fetchNotes();
      this.fetchPinned();
    }
    if(this.turn==1){
      this.fetchArchives();
    }
    if(this.turn==2){
      this.fetchTrash();
    }
  }

  setStep(index: number) {
    this.step = index;
  }







  add() {
    if(this.inboxForm.get('title').value!='' || this.inboxForm.get('note').value!=''){
      this.inboxservice.addNote(this.inboxForm.value)
      .subscribe(
        data => {
          if (data['code'] === 200) {
            // alert('Email not registered');
            this.snackBar.open('Added note', '', {
              duration: 5000
            });
            this.inboxForm.get('title').setValue('');
            this.inboxForm.get('note').setValue('');
            this.fetchPinned();
            this.fetchNotes();

          }
        },
        error => { }
      );
    }
    else {
      this.snackBar.open('Both fields are empty', '', {
        duration: 5000
      });
    }
  }



  fetchNotes() {

    this.inboxservice.getNotes(this.inboxForm.value)
      .subscribe((data: Note[]) => {
          if (data['code'] === 200) {
            this.notes = data['notes'];
        }
      });
  }

  fetchPinned() {
    this.inboxservice.getPinnedNotes(this.inboxForm.value)
      .subscribe((data: Note[]) => {
          if (data['code'] === 200) {
            this.pinned = data['notes'];
            console.log(this.pinned.length);
        }
      });
  }

  fetchArchives() {
    this.inboxservice.getArchivedNotes(this.inboxForm.value)
      .subscribe((data: Note[]) => {
          if (data['code'] === 200) {
            this.archive = data['notes'];
        }
      });
  }


  fetchTrash() {
    this.inboxservice.getTrashedNotes(this.inboxForm.value)
      .subscribe((data: Note[]) => {
          if (data['code'] === 200) {
            this.trash = data['notes'];
        }
      });
  }




  updateNote(sam) {
    sam.token = this.inboxForm.get('token').value;
    let t = this.inboxForm1.get('title').value;
    let n = this.inboxForm1.get('note').value;
    if(t.length !== 0) {
      sam.title = t;
    }
    if(n.length !== 0) {
      sam.note = n;
    }
    this.inboxservice.updateNote(sam)
    .subscribe((data: Note[]) => {
        if (data['code'] === 200) {
          this.fetchNotes();
          this.fetchPinned();
          this.fetchArchives();
          this.fetchTrash();
      }
    });
  }


  pinNote(sam) {
    sam.token = this.inboxForm.get('token').value;
    let t = this.inboxForm1.get('title').value;
    let n = this.inboxForm1.get('note').value;
    if(t.length !== 0) {
      sam.title = t;
    }
    if(n.length !== 0) {
      sam.note = n;
    }
    this.inboxservice.pinNote(sam)
    .subscribe((data: Note[]) => {
        if (data['code'] === 200) {
          this.fetchNotes();
          this.fetchPinned();
          this.fetchArchives();
          this.fetchTrash();
      }
    });
  }

  unpinNote(sam) {
    sam.token = this.inboxForm.get('token').value;
    let t = this.inboxForm1.get('title').value;
    let n = this.inboxForm1.get('note').value;
    if(t.length !== 0) {
      sam.title = t;
    }
    if(n.length !== 0) {
      sam.note = n;
    }
    this.inboxservice.unpinNote(sam)
    .subscribe((data: Note[]) => {
        if (data['code'] === 200) {
          this.fetchNotes();
          this.fetchPinned();
          this.fetchArchives();
          this.fetchTrash();
      }
    });
  }



  archiveNote(sam) {
    sam.token = this.inboxForm.get('token').value;
    let t = this.inboxForm1.get('title').value;
    let n = this.inboxForm1.get('note').value;
    if(t.length !== 0) {
      sam.title = t;
    }
    if(n.length !== 0) {
      sam.note = n;
    }
    this.inboxservice.archiveNote(sam)
    .subscribe((data: Note[]) => {
        if (data['code'] === 200) {
          this.fetchNotes();
          this.fetchPinned();
          this.fetchArchives();
          this.fetchTrash();
      }
    });
  }



  unarchiveNote(sam) {
    sam.token = this.inboxForm.get('token').value;
    let t = this.inboxForm1.get('title').value;
    let n = this.inboxForm1.get('note').value;
    if(t.length !== 0) {
      sam.title = t;
    }
    if(n.length !== 0) {
      sam.note = n;
    }
    this.inboxservice.unarchiveNote(sam)
    .subscribe((data: Note[]) => {
        if (data['code'] === 200) {
          this.fetchNotes();
          this.fetchPinned();
          this.fetchArchives();
          this.fetchTrash();
      }
    });
  }




  trashNote(sam) {
    sam.token = this.inboxForm.get('token').value;
    let t = this.inboxForm1.get('title').value;
    let n = this.inboxForm1.get('note').value;
    if(t.length !== 0) {
      sam.title = t;
    }
    if(n.length !== 0) {
      sam.note = n;
    }
    this.inboxservice.trashNote(sam)
    .subscribe((data: Note[]) => {
        if (data['code'] === 200) {
          this.fetchNotes();
          this.fetchPinned();
          this.fetchArchives();
          this.fetchTrash();
      }
    });

  }





  untrashNote(sam) {
    sam.token = this.inboxForm.get('token').value;
    let t = this.inboxForm1.get('title').value;
    let n = this.inboxForm1.get('note').value;
    if(t.length !== 0) {
      sam.title = t;
    }
    if(n.length !== 0) {
      sam.note = n;
    }
    this.inboxservice.restoreNote(sam)
    .subscribe((data: Note[]) => {
        if (data['code'] === 200) {
          this.fetchNotes();
          this.fetchPinned();
          this.fetchArchives();
          this.fetchTrash();
      }
    });

  }



  deleteNote(sam) {
    sam.token = this.inboxForm.get('token').value;
    let t = this.inboxForm1.get('title').value;
    let n = this.inboxForm1.get('note').value;
    if(t.length !== 0) {
      sam.title = t;
    }
    if(n.length !== 0) {
      sam.note = n;
    }
    this.inboxservice.deleteNote(sam)
    .subscribe((data: Note[]) => {
        if (data['code'] === 200) {
          this.fetchNotes();
          this.fetchPinned();
          this.fetchArchives();
          this.fetchTrash();
      }
    });
  }







  isloggedin() {
    this.userservice.getUsername()
    .subscribe(
      data => {
        if(data['code'] === 200) {
          this.username = data['name'];
          console.log(this.username);
          this.fetchNotes();
          this.fetchPinned();
        }
        else {
          this.router.navigateByUrl('/login');
        }
      },
      err => this.router.navigateByUrl('/login'),
    );
  }



  logout() {
    localStorage.setItem('token','');
    this.router.navigateByUrl('/login');
  }


}
