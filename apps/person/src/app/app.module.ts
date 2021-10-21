import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes,RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './component/main/main.component';
import {CardModule} from 'primeng/card';
import {MessageService} from 'primeng/api';
import {TableModule} from 'primeng/table';
import { ListComponent } from './component/list/list.component';
import { FormComponent } from './component/form/form.component';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {InputTextModule} from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const routes : Routes = [
  {
    path : '',
    component: ListComponent,
  },
  {
    path: 'addUser',
    component: FormComponent,
  },
  {
    path : 'update/:id',
    component: FormComponent,
  },
]

@NgModule({
  declarations: [AppComponent, MainComponent, ListComponent, FormComponent],
  imports: [BrowserModule,RouterModule.forRoot(routes),CardModule,TableModule,ButtonModule,ToolbarModule,ToastModule,DropdownModule,ReactiveFormsModule,FormsModule,HttpClientModule,InputTextModule,BrowserAnimationsModule],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
