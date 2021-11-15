import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ProjectService } from '../project.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  isLoading: boolean = false;
  projId: string | null = '';
  
  constructor(
    public service: ProjectService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
  ) {
  
  }

  ngOnInit(): void {
    this.projId = this.route.snapshot.paramMap.get('id');
    this.isLoading = false;
    this.loadProject();
  }

  loadProject() {
    if (this.projId) {
      this.service.getProjectById(this.projId).subscribe(
        (res) => {
          this.service.formData = res;
        },
        () => {
          this.toaster.error('', 'Error loading Project details');
        }
      );
    }
  }

  onSubmit(form: NgForm) {
    if (this.projId) {
      this.onUpdateProject(form);
    } else {
      this.onInsertProject(form);
    }
  }

  onInsertProject(form: NgForm) {
    this.isLoading = true;
    this.service.postProject().subscribe(
      () => {
        this.resetForm(form);
        this.toaster.success('Submitted Successfully', 'New Project Added');
        this.isLoading = false;
      },
      () => {
        this.toaster.error('Submition Failed', 'Error adding new Project');
        this.isLoading = false;
      }
    );
  }

  onUpdateProject(form: NgForm) {
    this.isLoading = true;
    if (this.projId) {
      this.service.updateProject(this.projId).subscribe(
        () => {
          this.toaster.success('Submitted Successfully', 'Project Updated');
          this.isLoading = false;
        },
        () => {
          this.toaster.error('Submition Failed', 'Error updating Project');
          this.isLoading = false;
        }
      );
    }
  }

  resetForm(form: NgForm) {
    form.form.reset();
  }
}
