import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'side-background',
    templateUrl: './side-background.component.html',
    styleUrls: ['./side-background.component.scss'],
})
export class SideBackgroundComponent implements OnInit {
  @Input() heading!: string;
  @Input() desc!: string;

  constructor() {}

  ngOnInit(): void {}

}
