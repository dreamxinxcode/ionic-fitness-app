import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { VersionService } from 'src/app/services/version/version.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    public versionService: VersionService,
    public authService: AuthService,
  ) { }

  ngOnInit() {}
}
