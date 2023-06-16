import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaintenanceDetailComponent } from './edit-maintenance-detail.component';

describe('EditMaintenanceDetailComponent', () => {
  let component: EditMaintenanceDetailComponent;
  let fixture: ComponentFixture<EditMaintenanceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMaintenanceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMaintenanceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
