import { Component } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { LoadingService } from './loader.service';


@Component({
  selector: 'app-loader-component',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  isLoading: Subject<boolean> = this.loaderService.loadingSub;

  color = 'success';
  mode = 'indeterminate' as ProgressSpinnerMode;
  value = 50;
  constructor(private loaderService: LoadingService) { }
}
