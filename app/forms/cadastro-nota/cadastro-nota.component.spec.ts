import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroNotaComponent } from './cadastro-nota.component';

describe('CadastroNotaComponent', () => {
  let component: CadastroNotaComponent;
  let fixture: ComponentFixture<CadastroNotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroNotaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
