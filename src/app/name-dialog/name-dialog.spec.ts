import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameDialog } from './name-dialog';

describe('NameDialog', () => {
  let component: NameDialog;
  let fixture: ComponentFixture<NameDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
