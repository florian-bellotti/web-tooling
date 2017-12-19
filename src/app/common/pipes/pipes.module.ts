import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailSearchPipe } from './search/mail-search.pipe';
import { SearchPipe } from './search/search.pipe';
import {MapToIterable} from './mapToIterable.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MapToIterable,
        MailSearchPipe,
        SearchPipe
    ],
    exports: [
        MailSearchPipe,
        SearchPipe,
        MapToIterable
    ]
})
export class PipesModule { }
