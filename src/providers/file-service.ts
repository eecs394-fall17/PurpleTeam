import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Camera, CameraOptions} from "@ionic-native/camera";


@Injectable()
export class FileService {
  constructor(public http: Http, public camera: Camera) {}

  getPicture() {
    let cameraOptions : CameraOptions = {
      sourceType         : this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType    : this.camera.DestinationType.DATA_URL,
      quality            : 100,
      targetWidth        : 320,
      targetHeight       : 240,
      encodingType       : this.camera.EncodingType.JPEG,
      correctOrientation : true
    };

    this.camera.getPicture(cameraOptions).then((imagePath) => {
      alert(imagePath);
    });
  }
}
