import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import {Post} from "../app/Post";


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
}
