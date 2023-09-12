import { NgModule } from '@angular/core'
import { PaginationComponent } from './pagination.component';
import { BrowserModule } from '@angular/platform-browser'

@NgModule({
    declarations: [
        PaginationComponent
    ],
    imports: [BrowserModule],
    exports: [PaginationComponent],
    bootstrap: [PaginationComponent]
})

export class PaginationModule {

}