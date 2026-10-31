import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuteurForm } from './auteur-form';

describe('AuteurForm', () => {
  let component: AuteurForm;
  let fixture: ComponentFixture<AuteurForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuteurForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AuteurForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
