import { Component } from '@angular/core';
import { ContactUsComponent } from '../../shared/components/contact-us/contact-us.component';
import { RouterLink } from '@angular/router';
import { Service } from '../../shared/types/serviceType';
import { OURSERVICES } from '../../shared/dataArray/serviceArray';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-center',
  standalone: true,
  imports: [ContactUsComponent, RouterLink, CommonModule],
  templateUrl: './service-center.component.html',
  styleUrl: './service-center.component.css',
})
export class ServiceCenterComponent {
  services: Service[] = OURSERVICES;
}
