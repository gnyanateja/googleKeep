import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const url = ' https://googlekeep-backend.herokuapp.com';
// const url = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})
export class InboxService {

  constructor(private http: HttpClient) { }


  addNote(body: any) {
    return this.http.post(url + '/addNote', body, {
      observe: 'body'
    });
  }

  getNotes(body: any) {
    return this.http.post(url + '/getNotes', body, {
      observe: 'body'
    });
  }

  updateNote(body: any) {
    return this.http.post(url + '/updateNote', body, {
      observe: 'body'
    });
  }


  deleteNote(body: any) {
    return this.http.post(url + '/deleteNote', body, {
      observe: 'body'
    });
  }


  getPinnedNotes(body: any) {
    return this.http.post(url + '/getPinnedNotes', body, {
      observe: 'body'
    });
  }


  pinNote(body: any) {
    return this.http.post(url + '/pinNote', body, {
      observe: 'body'
    });
  }

  unpinNote(body: any) {
    return this.http.post(url + '/unpinNote', body, {
      observe: 'body'
    });
  }


  getArchivedNotes(body: any) {
    return this.http.post(url + '/getArchivedNotes', body, {
      observe: 'body'
    });
  }


  archiveNote(body: any) {
    return this.http.post(url + '/archiveNote', body, {
      observe: 'body'
    });
  }

  unarchiveNote(body: any) {
    return this.http.post(url + '/unarchiveNote', body, {
      observe: 'body'
    });
  }


  getTrashedNotes(body: any) {
    return this.http.post(url + '/getTrashedNotes', body, {
      observe: 'body'
    });
  }


  trashNote(body: any) {
    return this.http.post(url + '/trashNote', body, {
      observe: 'body'
    });
  }

  restoreNote(body: any) {
    return this.http.post(url + '/restoreNote', body, {
      observe: 'body'
    });
  }



  addLabel(body: any) {
    return this.http.post(url + '/addLabel', body, {
      observe: 'body'
    });
  }

  getLabels(body: any) {
    return this.http.post(url + '/getLabels', body, {
      observe: 'body'
    });
  }


  getLabelNotes(body: any) {
    return this.http.post(url + '/getLabelNotes', body, {
      observe: 'body'
    });
  }

  updateLabel(body: any) {
    return this.http.post(url + '/updateLabel', body, {
      observe: 'body'
    });
  }


  deleteLabel(body: any) {
    return this.http.post(url + '/deleteLabel', body, {
      observe: 'body'
    });
  }



}
