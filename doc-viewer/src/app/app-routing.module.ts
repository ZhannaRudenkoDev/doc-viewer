import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentListComponent } from "./documents/document-list/document-list.component";
import { DocumentViewComponent } from "./documents/document-view/document-view.component";


const routes: Routes = [
  { path: '', component: DocumentListComponent },
  { path: 'document-view/:id', component: DocumentViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
