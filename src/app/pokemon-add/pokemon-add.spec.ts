import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonAdd } from './pokemon-add';

describe('PokemonAdd', () => {
  let component: PokemonAdd;
  let fixture: ComponentFixture<PokemonAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
