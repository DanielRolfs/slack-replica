import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTreeTwoComponent } from './menu-tree-two.component';

describe('MenuTreeTwoComponent', () => {
  let component: MenuTreeTwoComponent;
  let fixture: ComponentFixture<MenuTreeTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuTreeTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTreeTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
