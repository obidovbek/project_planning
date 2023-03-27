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
  import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-template',de
})
export class TemplateComponent implements OnInit {
    
	readonly firstCollImages = new FormControl([], [maxFilesLength(5)]);
	readonly middleCollImages = new FormControl([], [maxFilesLength(5)]);
	// arr: FormArray;

	rejectedFiles: readonly TuiFileLike[] = [];

	private readonly dialog = this.dialogService.open<boolean>(
		new PolymorpheusComponent(DialogComponent, this.injector),
		{ dismissible: true, label: 'Ma\'lumotni kirgizing?' }
	  );
	constructor(
		@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
		@Inject(Injector) private readonly injector: Injector,
		public dataService:DataService,
		public httpService:HttpService,
		private fb: FormBuilder
	) {
		// this.formGroup = this.fb.group({
		// 	goal: [],
		// 	projPass: [],
		// 	tasks: [],
		// 	kafed: [],
		// 	conDep: [],
		// 	spinOf: [],
		// 	mainData: {},
		// 	firstCollImages:  new FormControl([], [maxFilesLength(5)]),
		// 	middleCollImages: new FormControl([], [maxFilesLength(5)]),
		// });
	}	

    f_A = {faUser, faMoneyBill, faPeopleGroup}
	masonryImages:any[] = [];
	images:any = {
		firstCol: [],
		middleCol: [],
	}
    ngOnInit(): void {
		this.firstCollImages.statusChanges.subscribe(response => { this.addImageFirstColl(); });
		this.middleCollImages.statusChanges.subscribe(response => { this.addImageMiddleColl(); });

    }

	public masonryOptionsImages: NgxMasonryOptions = {
		gutter: 10,
		resize: true,
		initLayout: true,
		fitWidth: true
	};

    addImageFirstColl(){
		this.firstCollImages.value?.map((file, index, a)=>{
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
		this.middleCollImages.value?.map((file, index, a)=>{
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
		var formData = new FormData();

		this.dataService.plan.goal.map((item:any) => {
			formData.append('goal', item.toString());
		})
		this.dataService.plan.projPass.map((item:any) => {
			formData.append('projPass', item.toString());
		})
		this.dataService.plan.tasks.map((item:any) => {
			formData.append('tasks', item.toString());
		})
		this.dataService.plan.kafed.map((item:any) => {
			formData.append('kafed', item.toString());
		})
		this.dataService.plan.conDep.map((item:any) => {
			formData.append('conDep', item.toString());
		})
		this.dataService.plan.spinOf.map((item:any) => {
			formData.append('spinOf', item.toString());
		})
		for (let key in this.dataService.plan.mainData) {
			formData.append(key, this.dataService.plan.mainData[key]);
		  }
		for (var i = 0; i < this.firstCollImages.value?.length; i++) { 
			formData.append("firstCollImages", this.images.firstCol[i]);
		}
		for (var i = 0; i < this.images.middleCol?.length; i++) { 
			formData.append("middleCollImages", this.images.middleCol[i]);
		}
		console.log('postProject', this.firstCollImages.value)
		// this.httpService.postProject(formData)
		// .subscribe(res=>{
		// 	console.log('postProject', res)
		// })
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
	// https://stackblitz.com/edit/angular-form-group-form-array-dynamic?file=src%2Fapp%2Fapp.component.ts
	// get f() {
	// 	return this.formGroup.controls;
	//   }
	
	//   createItem() {
	// 	return this.fb.group({
	// 	  name: ['', Validators.required]
	// 	});
	//   }
	
	//   addItem() {
	// 	this.arr = this.f['arr'] as FormArray;
	// 	this.arr.push(this.createItem());
	//   }
	
	//   removeItem(idx: number): void {
	// 	(this.f['arr'] as FormArray).removeAt(idx);
	//   }
	
	//   onSubmit() {
	// 	this.formGroup.markAllAsTouched();
	// 	console.log(this.formGroup.value);
	//   }
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