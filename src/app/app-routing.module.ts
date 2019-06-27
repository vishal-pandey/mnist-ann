import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SlateComponent } from './components/slate/slate.component';
import { DtcComponent } from './components/dtc/dtc.component';

const routes: Routes = [
	{
		path: "",
		component: SlateComponent
	},
	{
		path: "dtc",
		component: DtcComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
