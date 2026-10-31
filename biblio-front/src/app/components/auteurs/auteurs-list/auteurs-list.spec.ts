import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LivresList } from './auteurs-list';

describe('LivresList', () => {
  let component: LivresList;
  let fixture: ComponentFixture<LivresList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivresList],
    }).compileComponents();

    fixture = TestBed.createComponent(LivresList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
