import { NgModule, LOCALE_ID, enableProdMode } from '@angular/core';
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
  MatPaginatorIntl,
  MatTabsModule,
  MatTooltipModule,
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatChipsModule,
  MatSlideToggleModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatStepperModule,
  MatSnackBarModule
} from '@angular/material';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MomentDateAdapter, MOMENT_DATE_FORMATS } from 'src/app/services/moment-date-adapter';
import { registerLocaleData, HashLocationStrategy, LocationStrategy, DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PaginasRouterModule } from './paginas.routes';
import { FormulariosModule } from '../forms/forms.module';
import { CoreModule } from '../core/core.module';
import { UsuarioLogado } from '../services/usuario.logado';
import { getDutchPaginatorIntl } from '../services/traducao';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import localept from '@angular/common/locales/pt';
import { LineGraphComponent } from '../core/dashboard-widget/line-graph/line-graph.component';
import { RoundProgressbarComponent } from '../core/dashboard-widget/round-progressbar/round-progressbar.component';
import { NgxMaskModule } from 'ngx-mask';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableExporterModule } from 'mat-table-exporter';
import { InicialComponent } from '../paginas/inicial/inicial.component';
import { PrincipalComponent } from './principal/principal.component';
import { UsuariosComponent } from '../paginas/usuarios/usuarios.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { CorretorasComponent } from './corretoras/corretoras.component';
import { NotasComponent } from './notas/notas.component';
import { PgTesteComponent } from './pg-teste/pg-teste.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

registerLocaleData(localept, 'pt');

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD'
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

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
    PaginasRouterModule,
    FormulariosModule,
    FlexLayoutModule,
    RoundProgressModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableExporterModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    LineGraphComponent,
    RoundProgressbarComponent,
    InicialComponent,
    PrincipalComponent,
    UsuariosComponent,
    PaginaNaoEncontradaComponent,
    CorretorasComponent,
    NotasComponent,
    PgTesteComponent
  ],
  exports: [LineGraphComponent, RoundProgressbarComponent],
  providers: [
    UsuarioLogado,
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  entryComponents: []
})
export class PaginasModule {}
