import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";


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
}
