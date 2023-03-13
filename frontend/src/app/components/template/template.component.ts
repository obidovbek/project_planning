// import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { faUser, faMoneyBill, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { NgxMasonryOptions, NgxMasonryComponent } from "ngx-masonry";
import { DataService } from 'src/app/shared/services/data.service';
import { HttpService } from 'src/app/shared/services/http.service';

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
})
export class TemplateComponent implements OnInit {
    
	readonly controlFirstCollImages = new FormControl([], [maxFilesLength(5)]);
	readonly controlMiddleCollImages = new FormControl([], [maxFilesLength(5)]);
    
	rejectedFiles: readonly TuiFileLike[] = [];

	private readonly dialog = this.dialogService.open<boolean>(
		new PolymorpheusComponent(DialogComponent, this.injector),
		{ dismissible: true, label: 'Ma\'lumotni kirgizing?' }
	  );
	constructor(
		@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
		@Inject(Injector) private readonly injector: Injector,
		public dataService:DataService,
		public httpService:HttpService
	) {}	

    f_A = {faUser, faMoneyBill, faPeopleGroup}
	masonryImages:any[] = [];
	images:any = {
		firstCol: [],
		middleCol: [],
	}
    ngOnInit(): void {
		this.controlFirstCollImages.statusChanges.subscribe(response => { this.addImageFirstColl(); });
		this.controlMiddleCollImages.statusChanges.subscribe(response => { this.addImageMiddleColl(); });
    }

	public masonryOptionsImages: NgxMasonryOptions = {
		gutter: 10,
		resize: true,
		initLayout: true,
		fitWidth: true
	};

    addImageFirstColl(){
		this.controlFirstCollImages.value?.map((file, index, a)=>{
			console.log('addImageFirstColl')
			if(index + 1 === a.length){
				const reader = new FileReader();
				reader.readAsDataURL(file); 
				reader.onload = e => this.images.firstCol.push(reader.result);
			}
		})
	}

    addImageMiddleColl(){
			console.log('addImageMiddleColl')
		this.controlMiddleCollImages.value?.map((file, index, a)=>{
			if(index + 1 === a.length){
				const reader = new FileReader();
				reader.readAsDataURL(file); 
				reader.onload = e => this.images.middleCol.push(reader.result);
			}
		})
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
	postProject(){
		this.httpService.postProject()
		.subscribe(res=>{
			console.log('postProject', res)
		})
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