import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import {FileService} from "./file-service";


@Injectable()
export class FirebaseService {
  constructor(public afdb: AngularFireDatabase) {}

  getPosts() {
    return this.afdb.list("/posts/");
  }

  addPost(post) {
    this.afdb.list("/posts/").push(post);
  }

  removePost(id) {
    this.afdb.list("/posts/").remove(id);
  }

  uploadImage(image, fileName) {
    return new Promise((resolve, reject) => {
      let fileRef = firebase.storage().ref("/images/" + fileName);
      let uploadTask = fileRef.putString(image, "data_url");
      uploadTask.on('state_changed', (snapshot) => {
        console.log('snapshot progress ' + snapshot);
      }, (error) => {
        reject(error);
      }, () => {
        resolve(uploadTask.snapshot);
      })
    });
  }

}
