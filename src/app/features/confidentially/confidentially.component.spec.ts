import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfidentiallyComponent } from './confidentially.component';

describe('ConfidentiallyComponent', () => {
  let component: ConfidentiallyComponent;
  let fixture: ComponentFixture<ConfidentiallyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfidentiallyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfidentiallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
