import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TemplateService } from 'src/app/services/template/template.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
})
export class TemplateFormComponent implements OnInit {
  @Input() workoutData;
  @Input() modalController;
  
  private loading;

  private templateForm = new FormGroup({
    title: new FormControl(''),
  }); 
  
  constructor(
    private templateService: TemplateService,
    private toast: ToastService,  
  ) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  handleSubmit() {
    this.loading = true;
    this.templateService.save(this.templateForm.value.title, this.workoutData).subscribe({
      next: (res) => {
        this.toast.render('Workout Template Saved', 'light');
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
      complete: () => {
        this.dismiss();
        this.loading = false;
      },
    });
  }
}
