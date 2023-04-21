import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOnlyofficeComponent } from './main-onlyoffice.component';

describe('MainOnlyofficeComponent', () => {
  let component: MainOnlyofficeComponent;
  let fixture: ComponentFixture<MainOnlyofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainOnlyofficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainOnlyofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
