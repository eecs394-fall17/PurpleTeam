import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Camera, CameraOptions} from "@ionic-native/camera";


@Injectable()
export class FileService {

  constructor(public http: Http, public camera: Camera) {
  }

  selectImage(): Promise<String> {
    return new Promise(resolve => {
      let cameraOptions: CameraOptions = {
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true
      };
      this.camera.getPicture(cameraOptions).then((data) => {
        resolve("data:image/jpeg;base64," + data);
      }, (error) => {
        alert("selectImage error: " + error.message);
      });
    });
  }
}
