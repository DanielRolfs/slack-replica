import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeInstanceComponent } from './tree-instance.component';

describe('TreeInstanceComponent', () => {
  let component: TreeInstanceComponent;
  let fixture: ComponentFixture<TreeInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeInstanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
