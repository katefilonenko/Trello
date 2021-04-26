import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService} from './services/in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material/material.module';
import { MainComponent } from './main/main.component';
import { BoardslistComponent } from './boardslist/boardslist.component';
import { BoardCreateComponent } from './board-create/board-create.component';
import { ColumnAddComponent } from './column-add/column-add.component';
import { ColumnEditComponent } from './column-edit/column-edit.component';
import { CardCreateComponent } from './card-create/card-create.component';
import { CardEditComponent } from './card-edit/card-edit.component';
import { BoardEditComponent } from './board-edit/board-edit.component';
import { InterceptorService } from './laoder/interceptor.service';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { EditInfoComponent } from './edit-info/edit-info.component';
import { ChartModule } from 'angular-highcharts'


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    MainComponent,
    BoardslistComponent,
    BoardCreateComponent,
    ColumnAddComponent,
    ColumnEditComponent,
    CardCreateComponent,
    CardEditComponent,
    BoardEditComponent,
    MatConfirmDialogComponent,
    LoginComponent,
    SearchComponent,
    RegisterComponent,
    AccountComponent,
    EditInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
    ToastrModule.forRoot(),
    ChartModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
