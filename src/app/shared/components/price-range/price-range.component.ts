import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-price-range',
  standalone: true,
  imports: [],
  templateUrl: './price-range.component.html',
  styleUrl: './price-range.component.css',
})
export class PriceRangeComponent implements AfterViewInit {
  private minPriceValue!: number;
  private maxPriceValue!: number;
  private priceGap = 1000;
  private timeout: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngAfterViewInit() {
    const rangeInputs = document.querySelectorAll(
      '.range-input input'
    ) as NodeListOf<HTMLInputElement>;
    const priceInputs = document.querySelectorAll(
      '.price-input input'
    ) as NodeListOf<HTMLInputElement>;
    const progress = document.querySelector('.slider .progress') as HTMLElement;

    const updateSlider = () => {
      let minVal = parseInt(rangeInputs[0].value);
      let maxVal = parseInt(rangeInputs[1].value);

      if (maxVal - minVal >= this.priceGap) {
        priceInputs[0].value = minVal.toString();
        priceInputs[1].value = maxVal.toString();
        progress.style.left =
          (minVal / parseInt(rangeInputs[0].max)) * 100 + '%';
        progress.style.right =
          100 - (maxVal / parseInt(rangeInputs[1].max)) * 100 + '%';
      }
    };

    // const updateQueryParams = () => {
    //   if (this.timeout) {
    //     clearTimeout(this.timeout);
    //   }
    //   this.timeout = setTimeout(() => {
    //     this.router.navigate([], {
    //       relativeTo: this.route,
    //       queryParams: {
    //         minPrice: this.minPriceValue,
    //         maxPrice: this.maxPriceValue,
    //       },
    //       queryParamsHandling: 'merge',
    //     });
    //   }, 500);
    // };

    rangeInputs.forEach((input) => {
      input.addEventListener('input', () => {
        let minVal = parseInt(rangeInputs[0].value);
        let maxVal = parseInt(rangeInputs[1].value);

        if (maxVal - minVal < this.priceGap) {
          if (input === rangeInputs[0]) {
            rangeInputs[0].value = (maxVal - this.priceGap).toString();
          } else {
            rangeInputs[1].value = (minVal + this.priceGap).toString();
          }
        }
        this.minPriceValue = parseInt(rangeInputs[0].value);
        this.maxPriceValue = parseInt(rangeInputs[1].value);
        // updateQueryParams();
        updateSlider();
      });
    });

    priceInputs.forEach((input) => {
      input.addEventListener('input', () => {
        let minVal = parseInt(priceInputs[0].value);
        let maxVal = parseInt(priceInputs[1].value);

        if (
          maxVal - minVal >= this.priceGap &&
          minVal >= 0 &&
          maxVal <= parseInt(rangeInputs[0].max)
        ) {
          rangeInputs[0].value = minVal.toString();
          rangeInputs[1].value = maxVal.toString();
          this.minPriceValue = minVal;
          this.maxPriceValue = maxVal;
          // updateQueryParams();
          updateSlider();
        }
      });
    });

    updateSlider();
  }
}
