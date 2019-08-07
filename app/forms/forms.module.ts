import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatSelectModule,
  MatInputModule,
  MatMenuModule,
  MatIconModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatTooltipModule,
  MatChipsModule,
  MatSlideToggleModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatStepperModule,
  MatSnackBarModule
} from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from '../core/core.module';
import { UsuarioLogado } from '../services/usuario.logado';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CadastroUsuarioComponent } from '../forms/cadastro-usuario/cadastro-usuario.component';
import { PerfilUsuarioComponent } from '../forms/perfil-usuario/perfil-usuario.component';
import { MaskDateDirective } from 'src/app/services/mask.directive';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { ErrorMsgComponent } from '../shared/error-msg/error-msg.component';
import { CadastroCorretoraComponent } from './cadastro-corretora/cadastro-corretora.component';
import { CadastroNotaComponent } from './cadastro-nota/cadastro-nota.component';
import { OperacoesNotaComponent } from './operacoes-nota/operacoes-nota.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTooltipModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatStepperModule,
    MatSnackBarModule,
    CoreModule,
    FlexLayoutModule,
    RoundProgressModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule
  ],
  declarations: [
    CadastroUsuarioComponent,
    PerfilUsuarioComponent,
    MaskDateDirective,
    ErrorMsgComponent,
    CadastroCorretoraComponent,
    CadastroNotaComponent,
    OperacoesNotaComponent
  ],
  exports: [ErrorMsgComponent],
  providers: [UsuarioLogado],
  entryComponents: [
    CadastroUsuarioComponent,
    PerfilUsuarioComponent,
    CadastroCorretoraComponent,
    CadastroNotaComponent,
    OperacoesNotaComponent
  ]
})
export class FormulariosModule {}
