/**
 * Created by Eric on 9/24/17.
 */

// TODO not sure if we'll need this

export class RequestItem {

  postTime : Date;
  cashPool : number;
  title : string;
  body : string;

  constructor(public json: string) {

    if (json) {
      let parsed = JSON.parse(json);
      this.title = parsed.title;
      this.body = parsed.body;
      this.postTime = parsed.postTime;
      this.cashPool = parsed.cashPool;
      // TODO keep track of who posted
    } else {
      this.postTime = new Date();
      this.cashPool = 0;
      this.title = "";
      this.body = "";
    }
  }

}
