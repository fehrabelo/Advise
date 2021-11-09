import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PokeListComponent } from './pages/list/poke-list.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    PokeListComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot()
  ]
})
export class CoreModule { }
