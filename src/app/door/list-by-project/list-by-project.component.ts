import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Door } from '../door.model';
import { DoorService } from '../door.service';

@Component({
  selector: 'app-list-by-project',
  templateUrl: './list-by-project.component.html',
  styleUrls: ['./list-by-project.component.scss'],
})
export class ListByProjectComponent implements OnInit {
  projId: string | null = '';
  doorsByProject: Door[] = [];
  deleteCriteria: boolean = false;

  constructor(
    public service: DoorService,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {
    this.projId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.loadProjectDoors();
  }

  loadProjectDoors() {
    this.service.getAllDoors().subscribe(
      (res) => {
        this.doorsByProject = res.filter(
          (door) => door.projectId === this.projId
        );
      },
      (err) => {
        console.error(err);
      }
    );
  }

  onDelete(doorId: string) {
    if (confirm('Are you sure you want to delete this Door')) {
      this.service.deleteDoor(doorId).subscribe(
        (res) => {
          this.loadProjectDoors();
          this.toaster.warning('', 'Door deleted');
        },
        (err) => {
          console.error(err);
          this.toaster.error('', 'Error deleting Door');
        }
      );
    }
  }

  trackByFn(index: number): number {
    return index;
  }
}
