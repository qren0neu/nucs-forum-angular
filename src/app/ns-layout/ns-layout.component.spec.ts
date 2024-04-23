import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsLayoutComponent } from './ns-layout.component';

describe('NsLayoutComponent', () => {
  let component: NsLayoutComponent;
  let fixture: ComponentFixture<NsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
