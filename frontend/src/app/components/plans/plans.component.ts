import {tuiAvatarOptionsProvider} from '@taiga-ui/kit';
import {TuiDialogService, TuiSizeL, TuiSizeS} from '@taiga-ui/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpService } from 'src/app/shared/services/http.service';
import {ChangeDetectionStrategy, Component, OnInit, Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TuiComparator, tuiDefaultSort} from '@taiga-ui/addon-table';
import {
    TUI_DEFAULT_MATCHER,
    tuiControlValue,
    TuiDay,
    tuiIsPresent,
    tuiToInt,
} from '@taiga-ui/cdk';
import {TUI_ARROW} from '@taiga-ui/kit';
import {BehaviorSubject, combineLatest, Observable, timer} from 'rxjs';
import {debounceTime, filter, map, share, startWith, switchMap} from 'rxjs/operators';

interface User {
    readonly name: string;
    readonly dob: TuiDay;
}
 
const TODAY = TuiDay.currentLocal();
const FIRST = [
    'John',
    'Jane',
    'Jack',
    'Jill',
    'James',
    'Joan',
    'Jim',
    'Julia',
    'Joe',
    'Julia',
];
 
const LAST = [
    'Smith',
    'West',
    'Brown',
    'Jones',
    'Davis',
    'Miller',
    'Johnson',
    'Jackson',
    'Williams',
    'Wilson',
];
 
type Key = 'age' | 'dob' | 'name';
 
const DATA: readonly User[] = Array.from({length: 300}, () => ({
    name: `${LAST[Math.floor(Math.random() * 10)]}, ${
        FIRST[Math.floor(Math.random() * 10)]
    }`,
    dob: TODAY.append({day: -Math.floor(Math.random() * 4000) - 7500}),
}));
const KEYS: Record<string, Key> = {
    Name: 'name',
    Age: 'age',
    'Date of Birth': 'dob',
};

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

    constructor(
        public authService:AuthService,
        public httpService:HttpService,
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    ) {}
    ngOnInit(): void {
    }

    selectOption(item: string): void {
        this.dropdownOpen = false;
        this.dialogService.open(`You selected ${item}`).subscribe();
    }
    remove(item: User): void {
        // this.users = this.users.filter(user => user !== item);
    }
    logout(){
        this.authService.logout();
    }
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
 
    readonly total$ = this.request$.pipe(map((data:any) => data?.maxPosts));
 
    readonly data$: Observable<readonly any[]> = this.request$.pipe(
        filter(tuiIsPresent),
        map((data:any) => data.posts.filter(tuiIsPresent)),
        startWith([]),
    );
 
 
    onSize(size: number): void {
        this.size$.next(size);
    }
 
    onPage(page: number): void {
        this.page$.next(page);
    }
 
    private getData(
        page: number,
        size: number,
    ): Observable<any> {
        return this.httpService.getProjects((page + 1), size);
    }
}
 
