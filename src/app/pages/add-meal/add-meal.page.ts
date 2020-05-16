import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, DoCheck } from '@angular/core';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ActionSheetController, ToastController, LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.page.html',
  styleUrls: ['./add-meal.page.scss'],
})
export class AddMealPage implements OnInit, DoCheck {
  images: any[];
  correctPath = '';
  finalPath = '';
  imagePath = '';
  url = '';
  uploadButtonFlag = true;
  member: any;
  type: any;
  constructor(private camera: Camera,
              private actionSheetController: ActionSheetController,
              private plt: Platform,
              private filePath: FilePath,
              private file: File,
              public toastController: ToastController,
              private storage: Storage,
              public loadingController: LoadingController,
              private webview: WebView,
              private router: Router,
              private route: ActivatedRoute) {
                localStorage.setItem('url', '');
               }
  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      this.member = state.member ? JSON.parse(state.member) : '';
      this.type = state.type ? state.type : '';
      console.log(this.member);
    }
  }
  ngDoCheck() {
    this.url = localStorage.getItem('url');
  }
  async presentLoading(msg: string) {
    const loading = await this.loadingController.create({
      message: msg,
      duration: 500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [{
        text: 'Load from Library',
        handler: () => {
         this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
     },
     {
      text: 'Use Camera',
      handler: () => {
        this.takePicture(this.camera.PictureSourceType.CAMERA);
       }
     },
     {
      text: 'Search via Google',
      handler: () => {
        this.router.navigateByUrl('image-search');
       }
     },
     {
      text: 'Cancel',
      role: 'cancel'
     }]
   });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    this.uploadButtonFlag = false;
    const options: CameraOptions = {
      quality: 100,
      sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true,
    };
    this.camera.getPicture(options).then(imagePath => {
      this.presentLoading('Loading Image...');
      if (this.plt.is('android') && sourceType ===
      this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath).then(filePath => {
        this.correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
        const currentName = imagePath.substring(
          imagePath.lastIndexOf('/') + 1,
          imagePath.lastIndexOf('?'));
        this.copyFileToLocalDir(
          this.correctPath,
          currentName,
          this.createFileName()
        );
        setTimeout(() => {
          const filename = currentName;
          let path =  imagePath.substring(0, imagePath.lastIndexOf('/') + 1);
          this.url = (<any>window).Ionic.WebView.convertFileSrc(path + filename);
         }, 500);
      });
     } else {
      const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      this.correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(
        this.correctPath,
        currentName,
        this.createFileName()
      );
      setTimeout(() => {
        const filename = currentName;
        let path =  imagePath.substring(0, imagePath.lastIndexOf('/') + 1);
        // this.file.readAsDataURL(path, filename).then(res => this.url = res );
        // this.image = window.Ionic.WebView.convertFileSrc(imageData);
        this.url = (<any>window).Ionic.WebView.convertFileSrc(path + filename);
       }, 500);
     }

    });
  }

  createFileName() {
    const d = new Date(),
    n = d.getTime(),
    newFileName = n + '.jpg';
    return newFileName;
}
copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(
    success => {
      this.updateStoredImages(newFileName);
      this.presentToast('Success while storing file.');
    },
    error => {
      this.presentToast('Error while storing file.');
    });
}

updateStoredImages(name) {
  this.storage.get('STORAGE_KEY').then(images => {
    let arr = [];
    if (images && images !== '' && images.length > 0) {
      arr = JSON.parse(images);
    } else {
      arr = [];
    }
    if (!arr) {
      const newImages = [name];
      this.storage.set('my_images', JSON.stringify(newImages));
    } else {
      arr.push(name);
      this.storage.set('my_images', JSON.stringify(arr));
    }
    const filePath = this.file.dataDirectory + name;
    const resPath = this.pathForImage(filePath);
    const newEntry = {
      name,
      path: resPath,
      filePath
   };
    this.images = [newEntry, ...this.images];
 });
}
pathForImage(img: any) {
  if (img === null) {
    return '';
  } else {
    const converted = this.webview.convertFileSrc(img);
    return converted;
  }
}
startUpload(imgEntry, position) {
  this.file
  .resolveLocalFilesystemUrl(imgEntry.filePath)
  .then(entry => {
    ( entry as FileEntry).file(file => this.readFile(file, imgEntry, position));
})
  .catch(err => {
    this.presentToast('Error while reading file.');
  });
}

readFile(file: any, imgEntry, position) {
    const reader = new FileReader();
    reader.onload = () => {
    const formData = new FormData();
    const imgBlob = new Blob([reader.result], {
      type: file.type
    });
    formData.append('file', imgBlob, file.name);
    this.uploadImageData(formData, imgEntry, position);
  };
    reader.readAsArrayBuffer(file);
}
async uploadImageData(formData: FormData, imgEntry, position) {
  const loading = await this.loadingController.create({
    message: 'Uploading image...'
  });
  await loading.present();
//   this.http.post(`<<YOUR API>>`, formData).pipe(finalize(() => {
//     loading.dismiss();
//   })
// )
//   .subscribe(res => {
//     if (res.success) {
//       this.presentToast('File upload complete.');
//     } else {
//       this.presentToast('File upload failed.');
//     }
//   });
}


// deleteImage(imgEntry, position) {
//   this.images.splice(position, 1);
//   this.storage.get('my_images').then(images => {
//     const arr = JSON.parse(images);
//     const filtered = arr.filter(name => name !== imgEntry.name);
//     this.storage.set('my_images', JSON.stringify(filtered));
//     const correctPath = imgEntry.filePath.substr(0,
//       imgEntry.filePath.lastIndexOf('/') + 1);
//     this.file.removeFile(correctPath, imgEntry.name).then(res => {
//       this.presentToast('File removed.');
//     });
//   });
// }
async presentToast(str: string) {
  const toast = await this.toastController.create({
    message: str,
    duration: 2000
  });
  toast.present();
}

}
