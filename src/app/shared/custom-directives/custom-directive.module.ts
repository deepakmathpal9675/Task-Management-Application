import { NgModule } from '@angular/core';
import { BlockCopyDirective } from "./block-copy.directive";
import { BlockCutDirective } from "./block-cut.directive";
import { BlockPasteDirective } from "./block-paste.directive";

@NgModule({
    declarations: [
    BlockCopyDirective,
    BlockPasteDirective,
    BlockCutDirective
],
exports:[
    BlockCopyDirective,
    BlockPasteDirective,
    BlockCutDirective
]
})

export class CustomDirectivesModule {}
