import { Component, OnInit, ChangeDetectionStrategy,	Inject, Injector } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { DialogComponent } from 'src/app/shared/components/taiga-ui/dialog/tui-dialog.component';

@Component({
  selector: 'app-main-slider-page',
  templateUrl: './main-slider-page.component.html',
  styleUrls: ['./main-slider-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSliderPageComponent implements OnInit {
    
    planForm = new FormGroup({
      announcedNumber: new FormControl(''),
    });

    open = false;
    private readonly dialog = this.dialogService.open<boolean>(
      new PolymorpheusComponent(DialogComponent, this.injector),
      { dismissible: true, label: 'Loyihangiz e\'lon qilingan raqamni kirgizing?' }
      );
    showDialog(): void {
      this.dialog.subscribe({
        next: data => {
          console.log('Dialog result', data);
        },
        complete: () => {
          console.log('Dialog closed');
        }
      });
    }
    constructor(
      @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
      @Inject(Injector) private readonly injector: Injector,
    ){}
    ngOnInit(): void {
    }

    index = 2;
 
    readonly items = [
        `assets/images/slider/1.png`,
        `assets/images/slider/2.jpg`,
        `assets/images/slider/3.jpg`,
        `assets/images/slider/4.jpg`,
    ];
}


