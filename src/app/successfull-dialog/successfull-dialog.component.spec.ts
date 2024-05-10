import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullDialogComponent } from './successfull-dialog.component';

describe('SuccessfullDialogComponent', () => {
  let component: SuccessfullDialogComponent;
  let fixture: ComponentFixture<SuccessfullDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessfullDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessfullDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
