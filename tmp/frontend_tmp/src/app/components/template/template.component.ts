import { Component, OnInit } from '@angular/core';
import { faUser, faMoneyBill, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { IMasonryGalleryImage } from 'ngx-masonry-gallery';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  constructor() { }
  f_A = {faUser, faMoneyBill, faPeopleGroup}
  ngOnInit(): void {
  }
  private urls: string[] = [
    'https://www.ogttx.org/wp-content/themes/ogt/media/_frontend/img/bkg.jpg',
    'http://www.magicalkenya.com/wp-content/uploads/2014/08/homebannerimg4.jpg',
    'https://media.gadventures.com/media-server/cache/12/59/12591a5497a563245d0255824103842e.jpg',
    'https://i.pinimg.com/originals/1c/aa/c5/1caac55143e3e11461c6ae5962403deb.jpg',
    'http://littleguyintheeye.com/wp-content/uploads/2014/08/nature-3.jpg',
];

public get images(): IMasonryGalleryImage[] {
    return this.urls.map(m => <IMasonryGalleryImage>{
        imageUrl: m
});
}
}
