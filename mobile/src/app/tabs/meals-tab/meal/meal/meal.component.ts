import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {

  @Input() meal: any;

  constructor(
    private config: ConfigService
  ) { }

  ngOnInit() {}

}
