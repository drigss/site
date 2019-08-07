import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgTesteComponent } from './pg-teste.component';

describe('PgTesteComponent', () => {
  let component: PgTesteComponent;
  let fixture: ComponentFixture<PgTesteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgTesteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgTesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
