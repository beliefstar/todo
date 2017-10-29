import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoesComponent } from './todoes.component';

describe('TodoesComponent', () => {
  let component: TodoesComponent;
  let fixture: ComponentFixture<TodoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
