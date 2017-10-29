import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { AppService } from '../app.service';

import { Modal } from '../modal';
import { Todo } from '../todo';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  content: string;
  modal = new Modal();
  @Output() slidelist: EventEmitter<object> = new EventEmitter();
  constructor(
    private appservice: AppService
  ) { }

  ngOnInit() {
  }

  submit(): void {
    if (this.content === '') {
      return;
    }
    this.appservice.add_todo(this.content)
      .then(res => {
        if (res['state'] === 'ok') {
          this.modal.openstate('添加成功');
          this.appservice.query_all()
            .then(data => {
              this.slidelist.emit(data['list']);
            });
        }
        this.content = '';
      });
  }
}
