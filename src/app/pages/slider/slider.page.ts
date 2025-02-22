import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { Router } from '@angular/router';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {
  @ViewChild('swiper', { static: false }) swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  constructor(private router: Router) { }
  ngAfterViewInit() {
    this.swiper = this.swiperRef?.nativeElement.swiper
  }
  ngOnInit() {
  }
  goToLogin() {
    this.router.navigate(['login']);
  }
}
