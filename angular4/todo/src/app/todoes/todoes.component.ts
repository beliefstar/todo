import {Component, OnInit} from '@angular/core';
import { AppService } from '../app.service';

import { Todo } from '../todo';
import { Modal } from '../modal';
declare var $: any;
@Component({
  selector: 'app-todoes',
  templateUrl: './todoes.component.html',
  styleUrls: ['./todoes.component.css']
})
export class TodoesComponent implements OnInit {
  public todoes: Todo[] = [];
  flag = false;
  modal = false;
  itemID: number;
  modalState = new Modal();
  constructor(
    private http: AppService
  ) { }

  ngOnInit() {
    this.showData();
  }
  showData(): void {
    if (this.flag) {
      this.getfinish();
    }else {
      this.getall();
    }
  }
  getall(): void {
    this.http.query_all()
      .then(res => {
        if (res['state'] === 'ok') {
          this.todoeslistsort(res['list']);
        }
      });
  }
  getfinish(): void {
    this.todoes = this.todoes.filter(t => t['flag'] === '1');
  }
  delete(id: number): void {
    this.http.detele_todo(id)
      .then(res => {
        if (res['state'] !== 'ok') {
          this.modalState.openstate('操作失败！');
        }
        this.todoes = this.todoes.filter(t => t['id'] !== id);
      });
  }
  finish(id: number): void {
    this.http.finish(id)
      .then(res => {
        if (res['state'] !== 'ok') {
          this.modalState.openstate('操作失败！');
        }
        this.showData();
      });
  }
  switchBtn(): void {
    this.flag = !this.flag;
    this.showData();
  }
  operation(id: number): void {
    this.modal = true;
    this.itemID = id;
  }
  changetodoes(todo: Todo[]) {
    this.todoeslistsort(todo);
  }
  todoeslistsort(list: Todo[]): void {
    this.todoes = list;
    this.todoes.sort((a, b) => {
      return parseInt(b['ctime'], 10) - parseInt(a['ctime'], 10);
    });
  }
}
