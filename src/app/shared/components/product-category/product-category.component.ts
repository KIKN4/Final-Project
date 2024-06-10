import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeofCategory } from '../../types/categoryType';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css',
})
export class ProductCategoryComponent {
  @Input({ required: true }) productCategory!: TypeofCategory;
  @Output() checkId = new EventEmitter<string>();

  onCheckId() {
    this.checkId.emit(this.productCategory.id);
  }
}
