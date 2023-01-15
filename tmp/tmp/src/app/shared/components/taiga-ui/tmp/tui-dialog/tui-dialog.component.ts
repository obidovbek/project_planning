import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
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

  constructor(){}
    open = true;
    ngOnInit(): void {
    }


    closeDialog(observer:any){
      // console.log(closeDialog)
      observer.complete()
      this.closeDialogEvent.emit({type: this.type, value: this.exampleForm.value.exampleControl})
    }
	  exampleForm = new FormGroup({
        exampleControl: new FormControl(``),
    });
    
}
