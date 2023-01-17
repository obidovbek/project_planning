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
        `assets/images/slider/1.png`,
        `assets/images/slider/2.jpg`,
        `assets/images/slider/3.jpg`,
        `assets/images/slider/4.jpg`,
    ];
}


