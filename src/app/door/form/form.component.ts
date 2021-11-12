import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

import { DoorService } from '../door.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  isLoading: boolean = false;
  projId: string | null = '';
  doorId: string | null = '';

  constructor(
    public service: DoorService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.queryParams.subscribe((params) => {
      this.projId = params['project'];
      this.doorId = params['door'];
    });
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.loadingDoorData();
  }

  loadingDoorData() {
    if (this.doorId) {
      this.service.getDoorById(this.doorId).subscribe(
        (res) => {
          this.service.formData = res;
        },
        (err) => {
          console.error(err);
          this.toaster.error('', 'Error loading Door data');
        }
      );
    }
  }

  onSubmit(form: NgForm) {
    if (this.doorId) {
      this.onUpdateDoor(form);
    } else {
      this.onInsertDoor(form);
    }
  }

  onInsertDoor(form: NgForm) {
    this.isLoading = true;
    if (this.projId) {
      this.service.postDoor(this.projId).subscribe(
        (res) => {
          this.resetForm(form);
          this.toaster.success('Submitted Successfully', 'New Door Added');
          this.isLoading = false;
          this.location.back();
        },
        (err) => {
          console.error(err);
          this.toaster.error('Submition Failed', 'Error adding new Door');
          this.isLoading = false;
        }
      );
    }
  }

  onUpdateDoor(form: NgForm) {
    this.isLoading = true;
    if (this.doorId) {
      this.service.updateDoor(this.doorId).subscribe(
        (res) => {
          this.toaster.success('Submitted Successfully', 'Door Updated');
          this.isLoading = false;
          this.location.back();
        },
        (err) => {
          console.error(err);
          this.toaster.error('Submition Failed', 'Error updating Door');
          this.isLoading = false;
        }
      );
    }
  }

  resetForm(form: NgForm) {
    form.form.reset();
  }
}
