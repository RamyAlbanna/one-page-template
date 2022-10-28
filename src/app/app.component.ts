import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  @ViewChildren('menuItems') menuItems: any;
  @ViewChild('skills') skillsSection: ElementRef<HTMLDivElement>;
  @ViewChild('walidBtn', { static: true }) walidBtn: ElementRef<HTMLDivElement>;
  @ViewChild('cardsContainer', { static: true }) cardsContainer: ElementRef<HTMLDivElement>;
  @ViewChild('cardsTitle', { static: true }) cardsTitle: ElementRef<HTMLDivElement>;
  @ViewChild('porfolioTitle', { static: true }) porfolioTitle: ElementRef<HTMLDivElement>;
  @ViewChild('porfolioCardsCards', { static: true }) porfolioCardsCards: ElementRef<HTMLDivElement>;
  @ViewChild('teamTitle', { static: true }) teamTitle: ElementRef<HTMLDivElement>;
  @ViewChild('teamTitleH2', { static: true }) teamTitleH2: ElementRef<HTMLDivElement>;



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
  teamsAnimationStarted: boolean = false;
  mobile: boolean = false;

  constructor(config: NgbCarouselConfig) {
    config.keyboard = false;
    config.interval = 5000;
    config.showNavigationArrows = false;
  }
  ngOnInit(): void {
    this.initLogoAnimation();
    this.initCardsContainerAnimation();
    this.initCardsTextAnimation();
    this.initPorofolioTitleAnimation();
    this.initPorfolioCardsAnimation();
    this.initTeamTitleAnimation();
    this.initTeamtitleH2Animation();
  }

  initLogoAnimation() {
    gsap.fromTo(this.walidBtn.nativeElement, {
      opacity: 0,
      scale: 0,
      rotate: 1440
    }, {
      duration: 3,
      opacity: 1,
      scale: 1.5,
      rotate: 0,
      scrollTrigger: {
        toggleActions: 'restart none restart none',
      }
    });
  }

  initCardsContainerAnimation() {
    gsap.from(this.cardsContainer.nativeElement, {
      opacity: 0,
      duration: 3,
      ease: 'expo',
      x: -500,
      scrollTrigger: {
        trigger: this.cardsContainer.nativeElement,
        toggleActions: 'restart restart none none'
      }
    });
  }

  initCardsTextAnimation() {
    gsap.from(this.cardsTitle.nativeElement, {
      opacity: 0,
      duration: 3,
      ease: 'bounce',
      x: 500,
      scrollTrigger: {
        trigger: this.cardsTitle.nativeElement,
        toggleActions: 'restart none none none'
      }
    });
  }


  initPorofolioTitleAnimation() {
    gsap.from(this.porfolioTitle.nativeElement, {
      opacity: 0,
      ease: 'power0',
      x: 500,
      scrollTrigger: {
        trigger: this.porfolioTitle.nativeElement,
        scrub: true,
      }
    });
  }


  initPorfolioCardsAnimation() {
    gsap.from(this.porfolioCardsCards.nativeElement, {
      opacity: 0,
      scale: 0.1,
      ease: 'power0',
      scrollTrigger: {
        end: 'top 70%',
        trigger: this.porfolioCardsCards.nativeElement,
        scrub: true,
      }
    });
  }

  initTeamTitleAnimation() {
    gsap.from(this.teamTitle.nativeElement, {
      opacity: 0,
      scale: 0,
      ease: 'power0',
      scrollTrigger: {
        trigger: this.teamTitle.nativeElement,
        toggleActions: 'restart restart none reverse'
      }
    });
  }

  initTeamtitleH2Animation() {
    gsap.from(this.teamTitleH2.nativeElement, {
      letterSpacing: 125,
      ease: 'bounce',
      duration: 3,
      scrollTrigger: {
        trigger: this.teamTitleH2.nativeElement,
        toggleActions: 'restart restart none reverse'
      }
    });
  }









  // events
  @HostListener('window:scroll', ['$event'])
  onScroll = () => {
    let scrollTop = document.documentElement.scrollTop;
    this.zeroScroll = scrollTop === 0;
    if (scrollTop > this.skillsSection.nativeElement.offsetTop - 300) this.started = true;
    this.teamsAnimationStarted = (scrollTop > 3080);
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
