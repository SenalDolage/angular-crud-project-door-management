import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { startWith } from 'rxjs/operators';

import { Project } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  projects: Project[] = [];
  loading: boolean = true;

  constructor(public service: ProjectService, private toaster: ToastrService) {}

  ngOnInit(): void {
    this.refreshProjectList();
  }

  refreshProjectList() {
    this.loading = true;
    this.service.getAllProjects().subscribe(
      (res) => {
        localStorage['httpCache'] = JSON.stringify(res);

        this.projects = res.sort(function (a: Project, b: Project) {
          var dateA: any = new Date(a.modifiedDate);
          var dateB: any = new Date(b.modifiedDate);

          return dateA - dateB;
        });
      },
      () => {
        this.toaster.error('', 'Error retrieving Projects');
      }
    );

    this.service
      .getAllProjects()
      .pipe(startWith(JSON.parse(localStorage['httpCache'] || '[]')));
    this.loading = false;
  }

  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this Project')) {
      this.service.deleteProject(id).subscribe(
        () => {
          this.refreshProjectList();
          this.toaster.warning('', 'Project Deleted');
        },
        () => {
          this.toaster.error('', 'Error deleting Project');
        }
      );
    }
  }

  trackByFn(index: number): number {
    return index;
  }
}
