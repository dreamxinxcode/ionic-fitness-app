import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users = <any>[];

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private toast: ToastService,
  ) { }

  ngOnInit() {
    this.http.get(`${this.config.BASE_URL}/users/`).subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      }
    });
  }
}
