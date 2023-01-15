import {ChangeDetectionStrategy, Component, Inject, Input, Output, EventEmitter} from '@angular/core';
import {TuiAlertService, TuiNotification} from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {switchMap} from 'rxjs/operators';

import {PromptService} from '../prompt/prompt.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-tui-dialog',
  templateUrl: './tui-dialog.component.html',
  styleUrls: ['./tui-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TuiDialogComponent {

	@Input() type:string = '';
  @Output() closeDialogEvent = new EventEmitter<any>();
  open = true;
  constructor(
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    @Inject(PromptService) private readonly promptService: PromptService,
  ) {}
  closeDialog(observer:any){
    // console.log(closeDialog)
    observer.complete()
    this.closeDialogEvent.emit({type: this.type, value: this.exampleForm.value.exampleControl})
  }
  exampleForm = new FormGroup({
      exampleControl: new FormControl(``),
  });
  onClick(
      choose: PolymorpheusContent,
      poorly: PolymorpheusContent,
      wisely: PolymorpheusContent,
  ): void {
    console.log('prompt')
      this.promptService
          .open(choose, {
              heading: `Taiga UI is the best`,
              buttons: [`Absolutely!`, `No way!`],
          })
          .pipe(
              switchMap(response =>
                  response
                      ? this.alertService.open(wisely, {
                            status: TuiNotification.Success,
                        })
                      : this.alertService.open(poorly, {
                            status: TuiNotification.Error,
                        }),
              ),
          )
          .subscribe();
  }
    
}
