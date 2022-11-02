import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
  @ViewChildren('menuItems') menuItems: any;
  @ViewChild('skills') skillsSection: ElementRef<HTMLDivElement>;
  @ViewChild('walidBtn', { static: true }) walidBtn: ElementRef<HTMLDivElement>;
  @ViewChildren('leftCard') leftCard: QueryList<ElementRef>;
  @ViewChildren('centerCard') centerCard: QueryList<ElementRef>;
  @ViewChildren('rightCard') rightCard: QueryList<ElementRef>;
  @ViewChildren('cardsTitle') cardsTitle: QueryList<ElementRef>;
  @ViewChild('porfolioTitle', { static: true }) porfolioTitle: ElementRef<HTMLDivElement>;
  @ViewChild('teamTitle', { static: true }) teamTitle: ElementRef<HTMLDivElement>;
  @ViewChild('teamTitleH2', { static: true }) teamTitleH2: ElementRef<HTMLDivElement>;
  @ViewChild('team', { static: true }) team: ElementRef<HTMLDivElement>;



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
    config.interval = 100000;
    config.showNavigationArrows = false;
  }
  ngAfterViewInit(): void {
    this.initCardsTextAnimation();
    this.playLeftCardAnimation();
    this.playCenterCardAnimation();
    this.playRightCardAnimation();
  }
  ngOnInit(): void {
    this.initLogoAnimation();
    this.initTeamtitleH2Animation();
    this.startTeamDarkModeAnimation();
  }

  initLogoAnimation() {
    gsap.fromTo(this.walidBtn.nativeElement, {
      opacity: 0,
      scale: 0
    }, {
      duration: 7,
      scale: 1,
      opacity: 1
    });
  }

  playLeftCardAnimation() {
    this.leftCard.forEach((element) => {
      gsap.from(element.nativeElement, {
        ease: 'expo',
        overflow: 'hidden',
        x: -500,
        scrollTrigger: {
          trigger: element.nativeElement,
          scrub: true,
        }
      });
    });
  }

  playCenterCardAnimation() {
    this.centerCard.forEach((element) => {
      gsap.from(element.nativeElement, {
        ease: 'expo',
        y: 100,
        scrollTrigger: {
          trigger: element.nativeElement,
          scrub: true,
        }
      });
    });
  }

  playRightCardAnimation() {
    this.rightCard.forEach((element) => {
      gsap.from(element.nativeElement, {
        ease: 'expo',
        overflow: 'hidden',
        x: 500,
        scrollTrigger: {
          trigger: element.nativeElement,
          scrub: true,
        }
      });
    });
  }

  initCardsTextAnimation() {
    this.cardsTitle.forEach((element) => {
      gsap.fromTo(element.nativeElement, {
        opacity: 0,
        ease: 'expo',
        y: 100,
        duration: 0.5
      },
        {
          opacity: 1,
          ease: 'expo',
          y: 0,
          scrollTrigger: {
            trigger: element.nativeElement,
            toggleActions: 'play none none none',
            scrub: true
          }
        }
      );
    })
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

  startTeamDarkModeAnimation() {
    gsap.to(this.team.nativeElement, {
      backgroundColor: 'black',
      duration: 2,
      scrollTrigger: {
        trigger: this.team.nativeElement,
        toggleActions: 'restart none none none',
      }
    });

    gsap.to(this.teamTitle.nativeElement, {
      color: 'white',
      duration: 3,
      scrollTrigger: {
        trigger: this.teamTitle.nativeElement,
        toggleActions: 'restart none none none',
        scrub: true
      }
    });
  }









  // events
  @HostListener('window:scroll', ['$event'])
  onScroll = () => {
    let scrollTop = document.documentElement.scrollTop;
    this.zeroScroll = scrollTop === 0;
    if (scrollTop > this.skillsSection.nativeElement.offsetTop - 300) this.started = true;
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
