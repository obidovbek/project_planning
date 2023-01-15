// import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { faUser, faMoneyBill, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { NgxMasonryOptions, NgxMasonryComponent } from "ngx-masonry";
import { DataService } from 'src/app/shared/services/data.service';

import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	Inject,
	Injector
  } from '@angular/core';
  import { TuiDialogService } from '@taiga-ui/core';
  import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
  import { DialogComponent } from 'src/app/shared/components/taiga-ui/dialog/tui-dialog.component';
  
  import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';
  import {TuiValidationError} from '@taiga-ui/cdk';
  import {TuiFileLike} from '@taiga-ui/kit';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateComponent implements OnInit {
    
	readonly control = new FormControl([], [maxFilesLength(5)]);
    rejectedFiles: readonly TuiFileLike[] = [];

	private readonly dialog = this.dialogService.open<boolean>(
		new PolymorpheusComponent(DialogComponent, this.injector),
		{ dismissible: true, label: 'Ma\'lumotni kirgizing?' }
	  );
	constructor(
		@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
		@Inject(Injector) private readonly injector: Injector,
		public dataService:DataService
	) {}	

    f_A = {faUser, faMoneyBill, faPeopleGroup}
    ngOnInit(): void {
		this.masonryImages = this.dummyPictures.slice(0, this.limit);
		this.control.statusChanges.subscribe(response => {
            // console.info(`STATUS`, response);
            // console.info(`ERRORS`, this.control.errors, `\n`);
			this.showMoreImages().then(res=>{
				// this.masonryImages = res;
				console.log(res)
				// this.showDialog('')
			})
        });
    }

	public masonryOptionsImages: NgxMasonryOptions = {
		gutter: 10,
		resize: true,
		initLayout: true,
		fitWidth: true
	};

	masonryImages:any;
	limit = 2;
	dummyPictures = [];

    showMoreImages = () => {
		return new Promise((resolve) => {
			let array:any[] = [];
			this.control.value?.map((file, index, a)=>{
				const reader = new FileReader();
				reader.readAsDataURL(file); 
				reader.onload = e => array.push(reader.result);
				if(index + 1 === a.length){
					setTimeout(() => {
						resolve(array);
					}, 100);
				}
			})
		}) 
	}

	onReject(files: TuiFileLike | readonly TuiFileLike[]): void {
		console.log('onReject')
        this.rejectedFiles = [...this.rejectedFiles, ...(files as TuiFileLike[])];
    }
 
    removeFile({name}: File): void {
		console.log('removeFile')
        this.control.setValue(
            this.control.value?.filter((current: File) => current.name !== name) ?? [],
        );
    }

    clearRejected({name}: TuiFileLike): void {
		console.log('clearRejected')
        this.rejectedFiles = this.rejectedFiles.filter(
            rejected => rejected.name !== name,
        );
    }
 
	showDialog(type:string){
		this.dialog.subscribe({
			next: data => {
			  this.addItem(type, data)
			},
			complete: () => {
			  console.log('Dialog closed');
			}
		});
	}
	addItem(type:string, value:any){
		if(!value){return;}
		switch(type){
			case 'goal': this.dataService.plan.goal.push(value); break;
			case 'tasks': this.dataService.plan.tasks.push(value); break;
			case 'kafed': this.dataService.plan.kafed.push(value); break;
			case 'conDep': this.dataService.plan.conDep.push(value); break;
			case 'spinOf': this.dataService.plan.spinOf.push(value); break;
			case 'title': this.dataService.plan.mainData.title = value; break;
			case 'owner': this.dataService.plan.mainData.owner = value; break;
			case 'cost': this.dataService.plan.mainData.cost = value; break;
			case 'workplace': this.dataService.plan.mainData.workplace = value; break;
		}
	}
	// closeDialogEvent(event:any){
	// 	if(!event.value){return;}
	// 	switch(event.type){
	// 		case 'goal': this.dataService.plan.goal.push(event.value); break;
	// 	}
	// }
	removeItem(type:string, index:number){
		switch(type){
			case 'goal': this.dataService.plan.goal.splice(index, 1); break;
			case 'tasks': this.dataService.plan.tasks.splice(index, 1); break;
			case 'kafed': this.dataService.plan.kafed.splice(index, 1); break;
			case 'conDep': this.dataService.plan.conDep.splice(index, 1); break;
			case 'spinOf': this.dataService.plan.spinOf.splice(index, 1); break;
		}
	}
}


export function maxFilesLength(maxLength: number): ValidatorFn {
    return ({value}: AbstractControl) => {
        return value.length > maxLength
            ? {
                  maxLength: new TuiValidationError(
                      `Error: maximum limit - 5 files for upload`,
                  ),
              }
            : null;
    };
}