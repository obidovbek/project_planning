import {Component, OnInit} from '@angular/core';
 
interface User {
    readonly name: string;
    readonly email: string;
    readonly status: 'alive' | 'deceased';
    readonly tags: readonly string[];
}

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
    

    ngOnInit(): void {
    }
    readonly columns = [`name`, `email`, `status`, `tags`, `actions`];
 
    users: readonly User[] = [
        {
            name: `Michael Palin`,
            email: `m.palin@montypython.com`,
            status: `alive`,
            tags: [`Funny`],
        },
        {
            name: `Eric Idle`,
            email: `e.idle@montypython.com`,
            status: `alive`,
            tags: [`Funny`, `Music`],
        },
        {
            name: `John Cleese`,
            email: `j.cleese@montypython.com`,
            status: `alive`,
            tags: [`Funny`, `Tall`, `Actor`],
        },
        {
            name: `Terry Jones`,
            email: ``,
            status: `deceased`,
            tags: [`Funny`, `Director`],
        },
        {
            name: `Terry Gilliam`,
            email: `t.gilliam@montypython.com`,
            status: `alive`,
            tags: [`Funny`, `Director`],
        },
        {
            name: `Graham Chapman`,
            email: ``,
            status: `deceased`,
            tags: [`Funny`, `King Arthur`],
        },
    ];
 
    remove(item: User): void {
        this.users = this.users.filter(user => user !== item);
    }

}


