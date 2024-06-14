import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  @Input({ required: true }) pageSize!: number;
  @Input({ required: true }) pageIndex!: number;
  @Input({ required: true }) total!: number;
}
