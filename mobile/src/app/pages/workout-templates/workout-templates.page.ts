import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { TemplateService } from 'src/app/services/template/template.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-workout-templates',
  templateUrl: './workout-templates.page.html',
  styleUrls: ['./workout-templates.page.scss'],
})
export class WorkoutTemplatesPage implements OnInit {
  
  userTemplates;
  publicTemplates;
  loading: boolean = true;

  constructor(
    private api: ApiService,
    private toast: ToastService,
  ) { }

  ngOnInit() {
    this.api.get('/templates/').subscribe({
      next: (res) => {
        this.publicTemplates = res;
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

}
