import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacoesNotaComponent } from './operacoes-nota.component';

describe('OperacoesNotaComponent', () => {
  let component: OperacoesNotaComponent;
  let fixture: ComponentFixture<OperacoesNotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacoesNotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacoesNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
