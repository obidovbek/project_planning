// import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { faUser, faMoneyBill, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { NgxMasonryOptions, NgxMasonryComponent } from "ngx-masonry";
import { DataService } from 'src/app/shared/services/data.service';
import { HttpService } from 'src/app/shared/services/http.service';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	Inject,
	Injector,
	Input
  } from '@angular/core';
  import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
  import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
  import { DialogComponent } from 'src/app/shared/components/taiga-ui/dialog/tui-dialog.component';
  
  import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';
  import {TuiValidationError} from '@taiga-ui/cdk';
  import {TuiFileLike} from '@taiga-ui/kit';
  import { FormBuilder } from '@angular/forms';
  import {  Router } from "@angular/router";
@Component({
	selector: 'app-template',
	templateUrl: './template.component.html',
	styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
    
	@Input() onlyView: boolean = false;
	
	readonly firstCollImages = new FormControl([], [maxFilesLength(5)]);
	readonly middleCollImages = new FormControl([], [maxFilesLength(5)]);
	// arr: FormArray;

	rejectedFiles: readonly TuiFileLike[] = [];
	announcedNumber:number = 0;
	private readonly dialog = this.dialogService.open<boolean>(
		new PolymorpheusComponent(DialogComponent, this.injector),
		{ dismissible: true, label: 'Ma\'lumotni kirgizing?' }
	  );
	constructor(
		@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
		@Inject(Injector) private readonly injector: Injector,
		public dataService:DataService,
		public httpService:HttpService,
		private fb: FormBuilder,
		private router: Router,
	) {
	}	

    f_A = {faUser, faMoneyBill, faPeopleGroup}
	masonryImages:any[] = [];
	images:any = {
		firstCol: [],
		middleCol: [],
	}
    ngOnInit(): void {
		console.log('plan ', this.dataService.plan)
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

	postProject(content: PolymorpheusContent<TuiDialogContext>){
		var formData = new FormData();
		const firstCol:any = this.firstCollImages.value;
		const middCol:any = this.middleCollImages.value;
		this.dataService.plan.goal.map((item:any) => {
			formData.append('goal', item.toString());
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

		formData.append("title", this.dataService.plan.title);
		formData.append("owner", this.dataService.plan.owner);
		formData.append("cost", this.dataService.plan.cost);
		formData.append("workplace", this.dataService.plan.workplace);

		for (var i = 0; i < firstCol?.length; i++) { 
			formData.append("firstCollImages", firstCol[i]);
		}
		for (var i = 0; i < middCol?.length; i++) { 
			formData.append("middleCollImages", middCol[i]);
		}
		this.httpService.postProject(formData)
		.subscribe(async (res:any)=>{
			this.announcedNumber = res.announcedNumber;
			this.dataService.plan = this.dataService.planInitial;
			await this.dialogService.open(content).subscribe();
		})
	}
	showDialogMessage(content: PolymorpheusContent<TuiDialogContext>): void {
        this.dialogService.open(content).subscribe();
    }
	completeTemplete(observer:any){
		observer.complete()
		this.router.navigateByUrl('/welcome')
	}
	addItem(type:string, value:any){
		if(!value){return;}
		switch(type){
			case 'goal': this.dataService.plan.goal.push(value); break;
			case 'tasks': this.dataService.plan.tasks.push(value); break;
			case 'kafed': this.dataService.plan.kafed.push(value); break;
			case 'conDep': this.dataService.plan.conDep.push(value); break;
			case 'spinOf': this.dataService.plan.spinOf.push(value); break;
			case 'title': this.dataService.plan.title = value; break;
			case 'owner': this.dataService.plan.owner = value; break;
			case 'cost': this.dataService.plan.cost = value; break;
			case 'workplace': this.dataService.plan.workplace = value; break;
		}
	}

	removeItem(type:string, index:number){
		switch(type){
			case 'goal': this.dataService.plan.goal.splice(index, 1); break;
			case 'tasks': this.dataService.plan.tasks.splice(index, 1); break;
			case 'kafed': this.dataService.plan.kafed.splice(index, 1); break;
			case 'conDep': this.dataService.plan.conDep.splice(index, 1); break;
			case 'spinOf': this.dataService.plan.spinOf.splice(index, 1); break;
			case 'firstCol': this.images.firstCol.splice(index, 1);this.firstCollImages.value?.splice(index, 1); break;
			case 'middleCol': this.images.middleCol.splice(index, 1);this.middleCollImages.value?.splice(index, 1); break;
			
			
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