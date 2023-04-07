import {tuiAvatarOptionsProvider} from '@taiga-ui/kit';
import {TuiDialogService, TuiSizeL, TuiSizeS} from '@taiga-ui/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpService } from 'src/app/shared/services/http.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Component, OnInit, Inject} from '@angular/core';
import {
    TuiDay,
    tuiIsPresent,
} from '@taiga-ui/cdk';
import {TUI_ARROW} from '@taiga-ui/kit';
import {BehaviorSubject, combineLatest, Observable, timer} from 'rxjs';
import {filter, map, startWith, switchMap} from 'rxjs/operators';
import {tuiClamp,TuiDropdownPortalService} from '@taiga-ui/cdk';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import { DataService } from 'src/app/shared/services/data.service';

interface User {
    readonly name: string;
    readonly dob: TuiDay;
}
 



@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
  providers: [
    tuiAvatarOptionsProvider({
        size: 's',
        autoColor: true,
        rounded: true,
    }),
],
})
export class PlansComponent implements OnInit {
    
    dropdownOpen = false;
    size: TuiSizeL | TuiSizeS = 's';
    projects: any;
    scale = 1;
    filters = false;

    constructor(
        public authService:AuthService,
        public httpService:HttpService,
        public dataService:DataService,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(TuiDropdownPortalService)
        private readonly portalService: TuiDropdownPortalService,
    ) {}
    ngOnInit(): void {
    }
    readonly form = new FormGroup({ balance: new FormControl(0) });
 
    get width(): string { return `calc((100% + 4rem) * ${1 / this.scale})`;}
 
    onElastic(value: number): void {  this.scale = tuiClamp(value, 0.5, 1);}
    
    get transform(): string { return `scale(${this.scale})`; }

    showFullPlan(
        item: any,
        content: PolymorpheusContent,
    ): void {
        this.dataService.plan = item;
        this.dialogService.open(content, {size: 'auto'}).subscribe({
            complete: () => {
            },
        });
    }



    readonly filter = (item: number, value: number): boolean => item >= value;
 
    onToggle(enabled: boolean): void {
        if (enabled) {
            this.form.enable();
        } else {
            this.form.disable();
        }
    }
    selectOption(item: string): void {
        this.dropdownOpen = false;
        this.dialogService.open(`You selected ${item}`).subscribe();
    }
    remove(item: User): void {
        // this.users = this.users.filter(user => user !== item);
    }
    logout(){ this.authService.logout(); }

    private readonly size$ = new BehaviorSubject(10);
    private readonly page$ = new BehaviorSubject(0);
 
    // readonly request$:any = this.httpService.getProjects(1, 5);
    request$:any = combineLatest([
        this.page$,
        this.size$
    ]).pipe(
        // zero time debounce for a case when both key and direction change
        switchMap(query => this.getData(...query).pipe(startWith(null))),
    );

    initial: readonly string[] = ['title', 'owner', 'actions'];
 
    enabled = this.initial;
 
    columns = ['title', 'owner', 'actions'];
 
    readonly arrow = TUI_ARROW;
 
    readonly loading$ = this.request$.pipe(map(value => !value));
 
    readonly total$ = this.request$.pipe(map((data:any) => data?.totalPosts));
 
    readonly data$: Observable<readonly any[]> = this.request$.pipe(
        filter(tuiIsPresent),
        map((data:any) => data.posts.filter(tuiIsPresent)),
        startWith([]),
    );
 
 
    onSize(size: number): void { this.size$.next(size);}
 
    onPage(page: number): void { this.page$.next(page);}
 
    private getData(
        page: number,
        size: number,
    ): Observable<any> {
        return this.httpService.getProjects((page + 1), size);
    }
}
 
