import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalService, ModalDirective} from 'ngx-bootstrap';
import {ErrorHandlerService} from '../../service/error-handler.service';

@Component({
  selector: 'app-message-popup',
  templateUrl: './message-popup.component.html',
  styleUrls: ['./message-popup.component.css']
})
export class MessagePopupComponent implements OnInit {
  modalTitle: string;
  modalDescription: string;
  modalActions: any;

  constructor (private readonly errorHandler: ErrorHandlerService, private readonly modalService: BsModalService) { }

  @ViewChild ('messageModal') public messageModal: ModalDirective;

  ngOnInit () {
    this.modalService.config.backdrop = 'static';
    this.errorHandler.setMessage.subscribe (
      (message) => {
        this.modalTitle = message.title;
        this.modalDescription = message.description;
        this.modalActions = message.actions;
      });

    this.errorHandler.showMessage.subscribe ( () => {
      this.showModal ();
    });
  }

  performAction (callback): void {
    try {
      callback ();
    } finally {
      this.hideModal ();
    }
  }

  showModal (): void {
    this.messageModal.show ();
  }

  hideModal (): void {
    this.messageModal.hide ();
  }
}
