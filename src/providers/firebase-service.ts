import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import {Post} from "../app/Post";
import * as firebase from 'firebase';
import {FileService} from "./file-service";


@Injectable()
export class FirebaseService {
  posts: string;
  images: string;
  videos: string;

  constructor(public afdb: AngularFireDatabase) {
    this.posts = "/posts/";
    this.images = "/images/";
    this.videos = "/videos/";
  }

  getPosts() {
    return this.afdb.list(this.posts);
  }

  addPost(post) {
    this.afdb.list(this.posts).push(post);
  }

  removePost(id) {
    this.afdb.list(this.posts).remove(id);
  }

  uploadImage(image, fileName) {
    return new Promise((resolve, reject) => {
      let fileRef = firebase.storage().ref(this.images + fileName);
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

  uploadVideo(video, fileName) {
    return new Promise((resolve, reject) => {
      let fileRef = firebase.storage().ref(this.videos + fileName);
      let uploadTask = fileRef.putString(video, "data_url");
      uploadTask.on('state_changed', (snapshot) => {
        console.log('snapshot progress ' + snapshot);
      }, (error) => {
        reject(error);
      }, () => {
        resolve(uploadTask.snapshot);
      })
    })
  }

}
