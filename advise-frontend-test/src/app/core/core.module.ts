import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PokeListComponent } from './pages/list/poke-list.component';


@NgModule({
  declarations: [
    PokeListComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    AngularSvgIconModule.forRoot()
  ]
})
export class CoreModule { }
