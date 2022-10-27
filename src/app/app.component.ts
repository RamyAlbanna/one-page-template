import { AfterViewInit, Component, ElementRef, HostListener, ViewChild, ViewChildren } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChildren('menuItems') menuItems: any;
  @ViewChild('skills') skillsSection: any;
  images = [
    './../assets/images/01.jpg',
    './../assets/images/slider1.jpeg',
    './../assets/images/slider2.jpeg',
  ];
  list = [
    'HOME', 'ABOUT', 'SERVICES', 'SKILLS', 'PORTFOLIO', 'TEAM', 'CONTACT'
  ];
  zeroScroll: boolean = true;
  started: boolean = false;
  mobile: boolean = false;

  constructor(config: NgbCarouselConfig) {
    config.keyboard = false;
    config.interval = 5000;
    config.showNavigationArrows = false;
  }





  // events
  @HostListener('window:scroll', ['$event'])
  onScroll = () => {
    this.zeroScroll = document.documentElement.scrollTop === 0;
    if (document.documentElement.scrollTop > this.skillsSection.nativeElement.offsetTop - 300) this.started = true;
  }

  showMenu = () => {
    this.mobile = true;
  }

  removeShow = () => {
    this.mobile = false;
  }

  setActive = (item: string) => {
    document.getElementById(item.toLocaleLowerCase())?.scrollIntoView();
    for (let i = 0; i < this.menuItems._results.length; i++) {
      if (this.menuItems._results[i].nativeElement.innerText === item) {
        this.menuItems._results[i].nativeElement.classList.add('active');
      } else {
        this.menuItems._results[i].nativeElement.classList.remove('active');
      }
    }
  }

  removeClassActive = () => {
    for (let i = 0; i < this.menuItems._results.length; i++) {
      this.menuItems._results[i].nativeElement.classList.remove('active');
    }
  }
}
