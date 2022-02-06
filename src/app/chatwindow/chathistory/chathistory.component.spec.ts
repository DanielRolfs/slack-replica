import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChathistoryComponent } from './chathistory.component';

describe('ChathistoryComponent', () => {
  let component: ChathistoryComponent;
  let fixture: ComponentFixture<ChathistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChathistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChathistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
