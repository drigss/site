import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCorretoraComponent } from './cadastro-corretora.component';

describe('CadastroCorretoraComponent', () => {
  let component: CadastroCorretoraComponent;
  let fixture: ComponentFixture<CadastroCorretoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroCorretoraComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCorretoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
