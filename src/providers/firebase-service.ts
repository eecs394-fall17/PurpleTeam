import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import {User} from "../models/user";


@Injectable()
export class FirebaseService {
  posts: string;
  images: string;
  videos: string;
  users: string;

  constructor(public afdb: AngularFireDatabase) {
    this.posts = "/posts/";
    this.users = "/users/";
    this.images = "/images/";
    this.videos = "/videos/";

  }

  // addUsername(username, id) {
  //   this.afdb.list(this.users + id + '/').push(username);
  // }

  addUser(user: User) {
    this.afdb.list(this.users).push(user);
  }

  getUsername(id) {
    firebase.database().ref(this.users).once("value").then(snapshot => {
      // console.log((<any>Object).values(snapshot.val()));
      (<any>Object).values(snapshot.val()).forEach(u => {
        // console.log(u);
        if (u.id == id) {
          return new Promise((resolve, reject) => {
            resolve(u.username);
          })
        }
      })
    })
  }

  getUserPhone(id) {
    firebase.database().ref(this.users).once("value").then(snapshot => {
      // console.log(snapshot.val());
      snapshot.forEach(u => {
        if (u.id == id) {
          return u.phone;
        }
      })
    })
  }

  getPosts() {
    return this.afdb.list(this.posts);
  }

  addPost(post) {
    this.afdb.list(this.posts).push(post);
  }

  updatePost(post) {
    this.afdb.object(this.posts + post.$key).update({ description: post.description, value: post.value});
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
