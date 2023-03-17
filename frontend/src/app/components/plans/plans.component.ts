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
    private readonly page$ = new BehaviorSubject(1);
 
    readonly direction$ = new BehaviorSubject<-1 | 1>(-1);
    readonly sorter$ = new BehaviorSubject<Key>('name');
 
    readonly minAge = new FormControl(21);
 
    // readonly request$:any = this.httpService.getProjects(1, 5);
    request$:any = this.httpService.getProjects(1, 10);

    initial: readonly string[] = ['title', 'owner', 'actions'];
 
    enabled = this.initial;
 
    columns = ['title', 'owner', 'actions'];
 
    search = '';
 
    readonly arrow = TUI_ARROW;
 
    readonly loading$ = this.request$.pipe(map(value => !value));
 
    readonly total$ = this.request$.pipe(map(({maxPosts}) => maxPosts));
 
    readonly data$: Observable<readonly any[]> = this.request$.pipe(
        filter(tuiIsPresent),
        map((data:any) => data.posts.filter(tuiIsPresent)),
        startWith([]),
    );
 
    onEnabled(enabled: readonly string[]): void {
        this.enabled = enabled;
        this.columns = this.initial
            .filter(column => enabled.includes(column))
            .map(column => KEYS[column]);
    }
 
    onDirection(direction: -1 | 1): void {
        this.direction$.next(direction);
    }
 
    onSize(size: number): void {
        this.size$.next(size);
    }
 
    onPage(page: number): void {
        console.log('onPage', page)
        this.request$ = this.httpService.getProjects((page + 1), 10).subscribe();
        // this.page$.next(page);
    }
 
    isMatch(value: unknown): boolean {
        return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
    }
 
    // getAge(user: User): number {
    //     return getAge(user);
    // }
 
    private getData(
        key: 'age' | 'dob' | 'name',
        direction: -1 | 1,
        page: number,
        size: number,
        minAge: number,
    ): Observable<any> {
        console.info('Making a request');
 
        const start = page * size;
        const end = start + size;
 
        // Imitating server response
        return this.httpService.getProjects(1, 10);
    }
}
 
// function sortBy(key: 'age' | 'dob' | 'name', direction: -1 | 1): TuiComparator<User> {
//     return (a, b) =>
//         key === 'age'
//             ? direction * tuiDefaultSort(getAge(a), getAge(b))
//             : direction * tuiDefaultSort(a[key], b[key]);
// }
 
// function getAge({dob}: User): number {
//     const years = TODAY.year - dob.year;
//     const months = TODAY.month - dob.month;
//     const days = TODAY.day - dob.day;
//     const offset = tuiToInt(months > 0 || (!months && days > 9));
 
//     return years + offset;
// }
