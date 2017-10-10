import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailSearchPipe } from './search/mail-search.pipe';
import { SearchPipe } from './search/search.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MailSearchPipe,
        SearchPipe
    ],
    exports: [
        MailSearchPipe,
        SearchPipe
    ]
})
export class PipesModule { }
