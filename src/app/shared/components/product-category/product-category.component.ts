import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeofCategory } from '../../types/categoryType';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css',
})
export class ProductCategoryComponent {
  @Input({ required: true }) productCategory!: TypeofCategory;
  @Output() checkId = new EventEmitter<string>();

  onCheck() {
    this.checkId.emit(this.productCategory.id);
  }
}
