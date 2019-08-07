import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioLogado } from '../services/usuario.logado';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginRoutes } from './login.routes';
import { LoginComponent } from './login.component';
import { CoreModule } from '../core/core.module';
import { AuthGuard } from '../auth/auth.guard';
import { EncrDecrService } from '../services/encr-decr.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FlexLayoutModule,
    MatCardModule
  ],
  declarations: [LoginComponent],
  providers: [AuthGuard, UsuarioLogado, EncrDecrService]
})
export class LoginModule {}
