import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config/config.service';
import { LocationService } from 'src/app/services/location/location.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.page.html',
  styleUrls: ['./account-settings.page.scss'],
})
export class AccountSettingsPage implements OnInit {

  private accountForm = new FormGroup({
    username: new FormControl(this.userService.user.username, [Validators.required]),
    bio: new FormControl(this.userService.user.profile.bio),
    email: new FormControl(this.userService.user.email, [Validators.required]),
    first_name: new FormControl(this.userService.user.profile.first_name),
    last_name: new FormControl(this.userService.user.profile.last_name),
    birthdate: new FormControl(this.userService.user.profile.birthdate),
    country: new FormControl(this.userService.user.profile.country),
    city: new FormControl(this.userService.user.profile.city),
  });

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private toast: ToastService,
    private userService: UserService,
    private locationService: LocationService,
    private router: Router,
    private platform: Platform,
  ) { }

  ngOnInit() { }

  save() {
    this.http.put(this.config.BASE_URL + '/users/save_profile/', this.accountForm.value).subscribe({
      next: (res) => {
        this.userService.user.profile = res;
        this.toast.render('Success', 'success', 'alert');
        this.router.navigate(['/tabs/settings']);
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
    });
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri, // Try base64?
      source: CameraSource.Photos,
    });

    console.log(image);

    if (image) {
      this.saveImage(image);
    }
  }

  IMAGE_DIR = 'stored-images';

  avatarImage: any;

  private async saveImage(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);
  
    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    console.log(savedFile); // Check the savedFile object in the console
  
    // Read the file content from the file system
    const fileContent = await Filesystem.readFile({
      path: savedFile.uri,
      directory: Directory.Data,
    });
  
    console.log(fileContent); // Check the fileContent object in the console
  
    // Create a Blob object from the file content
    const blob = new Blob([fileContent.data], { type: 'image/jpeg' });
  
    // Create form data and append the image file
    const formData = new FormData();
    formData.append('image', blob, fileName);
  
    this.http.post('http://localhost:8000/users/upload-avatar', formData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      }
    });
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;
  }
  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  clearAvatar() {
    this.avatarImage = null;
    this.http.delete('').subscribe({
      next: (res) => {

      },
      error: (err) => {

      }
    });
  }
}
