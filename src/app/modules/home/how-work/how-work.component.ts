import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-work',
  templateUrl: './how-work.component.html',
  styleUrls: ['./how-work.component.scss']
})
export class HowWorkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
