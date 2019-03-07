import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderService } from './shared/order.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { OrderItemsComponent } from './orders/order-items/order-items.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { HeaderComponent } from './header/header.component';
import { UserService } from './shared/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthIntercepter } from './auth/auth.interceptor';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { MatConfirmDialogComponent } from './shared/mat-confirm-dialog/mat-confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderComponent,
    OrderItemsComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ],
  entryComponents:[OrderItemsComponent, MatConfirmDialogComponent],
  providers: [OrderService, UserService, AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthIntercepter,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
