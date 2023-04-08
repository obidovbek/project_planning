import { Component, OnInit, ChangeDetectionStrategy,	Inject, Injector } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { DialogComponent } from 'src/app/shared/components/taiga-ui/dialog/tui-dialog.component';
import { HttpService } from 'src/app/shared/services/http.service';
import { DataService } from 'src/app/shared/services/data.service';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';

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
    onlyView = false;
    private readonly dialog = this.dialogService.open<boolean>(
      new PolymorpheusComponent(DialogComponent, this.injector),
      { dismissible: true, label: 'Loyihangiz e\'lon qilingan raqamni kirgizing?' }
      );
    showDialog(content: PolymorpheusContent) {
      this.dialog.subscribe({
        next: data => {
          this.get_project(data,content);
        },
        complete: () => {
          console.log('Dialog closed');
        }
      });
    }
    get_project(announcedNumber:any, content: PolymorpheusContent){
      this.httpService.getOneProject(announcedNumber).subscribe((res:any)=>{
        if(res){
          this.dataService.plan = res;
          this.onlyView = true;
          this.dialogService.open(content, {size: 'auto'}).subscribe({
            complete: () => {
              this.dataService.plan = this.dataService.planInitial
            },
          });
        }else{
          alert('Bunday raqamli loyihani topa olmadik');
        }
      });
    }
    constructor(
      @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
      @Inject(Injector) private readonly injector: Injector,
      private httpService:HttpService,
      private dataService:DataService,
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


