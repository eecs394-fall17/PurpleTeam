/**
 * Created by Eric on 9/24/17.
 */

export class Post {

  timestamp: string;
  authorId: string; // TODO users
  description: string;
  // TODO images
  likes: number;
  contributors: string[]; // contributor Ids
  value: number;

  constructor(public json: string) {

    if (json) {
      let parsed = JSON.parse(json);
      this.description = parsed.description;
      this.timestamp = parsed.timestamp;
      this.likes = parsed.likes;
      this.value = parsed.value;
    } else {
      this.description = "";
      this.timestamp = new Date().toString();
      this.likes = 0;
      this.value = 0;
    }
  }

  toJSON() {
    console.log(JSON.stringify(this));
    return JSON.stringify(this);
  }

}
