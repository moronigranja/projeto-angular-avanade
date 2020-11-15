import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisaoTempoComponent } from './previsao-tempo.component';

describe('PrevisaoTempoComponent', () => {
  let component: PrevisaoTempoComponent;
  let fixture: ComponentFixture<PrevisaoTempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevisaoTempoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevisaoTempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
