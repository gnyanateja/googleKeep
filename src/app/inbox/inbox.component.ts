import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { UserService } from '../user.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import {InboxService} from '../inbox.service';
import {Note} from '../note.model';
import {Label} from '../label.model';


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
  labelNotes: Note[];
  labels: Label[];
  inboxForm: FormGroup;
  inboxForm1: FormGroup;
  labelForm: FormGroup;
  labelForm1: FormGroup;
  labelInboxForm: FormGroup;

  turn = 0;
  currentLabel="";
  constructor(private snackBar: MatSnackBar, private userservice: UserService,private inboxservice: InboxService, private router: Router) {
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

    this.labelForm = new FormGroup ({
      token : new FormControl('', []),
      label : new FormControl('', [Validators.required])
    });

    this.labelForm1 = new FormGroup ({
      token : new FormControl('', []),
      label : new FormControl('', [Validators.required])
    });

    this.labelInboxForm = new FormGroup ({
      token : new FormControl('', []),
      title : new FormControl('', []),
      note : new FormControl('', []),
      label : new FormControl('',[])
    });

    let x = localStorage.getItem('token');
    if( x != null) {
      x = x.slice(1, x.length-1);
    }
    this.inboxForm.get('token').setValue(x);
    this.inboxForm1.get('token').setValue(x);
    this.labelForm.get('token').setValue(x);
    this.labelForm1.get('token').setValue(x);
    this.labelInboxForm.get('token').setValue(x);
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


  labelSelect(sam) {
    this.currentLabel = sam.label;
    this.fetchLabelNotes(sam);
    this.turn=4;
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

  addwithLabel() {
    if(this.labelInboxForm.get('title').value!='' || this.labelInboxForm.get('note').value!=''){

      this.labelInboxForm.get('label').setValue(this.currentLabel);
      this.inboxservice.addNote(this.labelInboxForm.value)
      .subscribe(
        data => {
          if (data['code'] === 200) {
            // alert('Email not registered');
            this.snackBar.open('Added note', '', {
              duration: 5000
            });
            this.labelInboxForm.get('title').setValue('');
            this.labelInboxForm.get('note').setValue('');

            this.fetchLabelNotes(this.labelInboxForm.value);

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



  addLabel() {
    if(this.labelForm.get('label').value!=''){
      this.inboxservice.addLabel(this.labelForm.value)
      .subscribe(
        data => {
          if (data['code'] === 200) {
            // alert('Email not registered');
            this.snackBar.open('Added Label', '', {
              duration: 5000
            });
            this.labelForm.get('label').setValue('');
            this.fetchLabels();
          }
        },
        error => { }
      );
  }
  else{
    this.snackBar.open('Please enter the label name', '', {
      duration: 5000
    });
  }
}


  fetchLabels() {
    this.inboxservice.getLabels(this.labelForm.value)
    .subscribe((data: Label[]) => {
        if (data['code'] === 200) {
          this.labels = data['notes'];
      }
    });
  }

  fetchLabelNotes(sam) {
    sam.token=this.inboxForm.get('token').value;
    this.inboxservice.getLabelNotes(sam)
    .subscribe((data: Note[]) => {
        if (data['code'] === 200) {
          this.labelNotes = data['notes'];

      }
    });
  }

  updateLabel(sam) {
    sam.token = this.labelForm1.get('token').value;
    let l = this.labelForm1.get('label').value;
    if(l.length !== 0) {
      sam.label = l;
    }
    this.inboxservice.updateLabel(sam)
    .subscribe((data: Label[]) => {
        if (data['code'] === 200) {
          this.fetchLabels();
      }
    });
  }


  deleteLabel(sam) {
    sam.token = this.labelForm1.get('token').value;
    let l = this.labelForm1.get('label').value;
    if(l.length !== 0) {
      sam.label = l;
    }
    this.inboxservice.deleteLabel(sam)
    .subscribe((data: Label[]) => {
        if (data['code'] === 200) {
          this.fetchLabels();
      }
    });
  }

  isloggedin() {
    this.userservice.getUsername()
    .subscribe(
      data => {
        if(data['code'] === 200) {
          this.username = data['name'];

          this.fetchNotes();
          this.fetchPinned();
          this.fetchLabels();
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
