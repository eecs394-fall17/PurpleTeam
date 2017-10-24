/**
 * Created by Eric on 9/24/17.
 */

export class Post {

  timestamp: string;
  authorKey: string;
  username: string;
  description: string;
  likes: number;
  contributors: string[];
  value: number;
  phone: string;

  constructor(public json: string) {

    if (json) {
      let p = JSON.parse(json);
      this.description = p.description;
      this.timestamp = p.timestamp;
      this.authorKey = p.authorKey;
      this.likes = p.likes;
      this.value = p.value;
    } else {
      this.description = "";
      this.timestamp = new Date().toString();
      this.likes = 0;
    }
  }

  toJSON() {
    console.log(JSON.stringify(this));
    return JSON.stringify(this);
  }

}
