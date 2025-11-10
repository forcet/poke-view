import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { PokemonInfo} from '../model/pokemon.model';
import { Pokemon } from '../services/pokemon';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  imports: [AsyncPipe, MatGridListModule, MatDividerModule, MatListModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
})
export class PokemonList implements OnChanges, OnInit {

  @Input() refreshTrigger = 0;
  pokemons$!: Observable<PokemonInfo[]>;

  constructor(private readonly pokemonService: Pokemon) {}

  //pokemons: PokemonInfo[] = [];
  

  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.pokemons$ = this.pokemonService.getInfoPokemons();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshTrigger'] && !changes['refreshTrigger'].firstChange) {
      this.pokemons$ = this.pokemonService.getInfoPokemons();
    }
  }

  goToDetail(id: number): void {
    globalThis.location.href = `/pokemon/${id}`;
  }

}
