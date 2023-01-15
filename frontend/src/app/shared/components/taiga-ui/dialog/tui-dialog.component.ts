import { Component, Inject, TemplateRef } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'tui-dialog',
  templateUrl: './tui-dialog.component.html',
  styleUrls: ['./tui-dialog.component.less']
})
export class DialogComponent {
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any>
  ) {}
  open  = true;
  ok() {
    this.context.completeWith(this.exampleForm.value.exampleControl);
  }

  cancel() {
    this.context.completeWith('');
  }

  // showDialog(content: TemplateRef<TuiDialogContext<void>>) {
  //   this.dialogService.open(content, { dismissible: true }).subscribe();
  // }
  exampleForm = new FormGroup({
    exampleControl: new FormControl(``),
});
}
