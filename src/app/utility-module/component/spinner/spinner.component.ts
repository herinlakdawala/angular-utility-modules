import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SpinnerService} from '../../service/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent implements OnInit, OnDestroy {
  @Input() overlay;
  @Input() name;
  display;
  subscription: Subscription;

  constructor(private readonly spinnerService: SpinnerService) { }

  ngOnInit() {
    this.display = this.spinnerService.spinnerStatus[this.name];
    this.subscription = this.spinnerService.spinnerEvent.subscribe((event) => {
      if (event.target === this.name) {
        this.display = event.display;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
