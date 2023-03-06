import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async render(message: string, color?: string, icon?: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      icon: icon,
    });
    toast.present();
  }
}
