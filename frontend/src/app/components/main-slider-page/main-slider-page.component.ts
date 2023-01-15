import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-main-slider-page',
  templateUrl: './main-slider-page.component.html',
  styleUrls: ['./main-slider-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSliderPageComponent implements OnInit {
    

    ngOnInit(): void {
    }

    index = 2;
 
    readonly items = [
        `John Cleese`,
        `Eric Idle`,
        `Michael Palin`,
    ];
}


