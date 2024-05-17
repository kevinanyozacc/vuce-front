import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-loading',
  standalone: true,
  templateUrl: './button-loading.component.html',
})
export class ButtonLoadingComponent implements OnInit {
  ngOnInit(): void {
    const customer = this.className;
    this.className = `disabled:bg-primary/40 inline-flex cursor-not-allowed items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold leading-6 text-primary-foreground shadow transition duration-150 ease-in-out`;
    if (customer) this.className += ` ${customer}`;
  }

  @Input()
  public title!: string;

  @Input()
  public className!: string;
}
