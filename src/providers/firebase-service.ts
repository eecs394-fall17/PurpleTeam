import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import {Post} from "../app/Post";
import * as firebase from 'firebase';
import {FileService} from "./file-service";


@Injectable()
export class FirebaseService {
  root: string;

  constructor(public afdb: AngularFireDatabase) {
    this.root = "/posts/";
  }

  getPosts() {
    return this.afdb.list(this.root);
  }

  addPost(post) {
    this.afdb.list(this.root).push(post);
  }

  removePost(id) {
    this.afdb.list(this.root).remove(id);
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
