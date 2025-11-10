import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Pokemon } from '../services/pokemon';
import { PokemonItem } from '../model/pokemon.model';
import { filter, Observable } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-add',
  imports: [MatDividerModule, MatButtonModule, MatGridListModule, MatChipsModule, MatIconModule, MatCardModule, CommonModule],
  templateUrl: './pokemon-add.html',
  styleUrl: './pokemon-add.css',
})
export class PokemonAdd implements OnInit {

  private readonly router = inject(Router);
  pokemon$!: Observable<PokemonItem>;

  constructor(
      private readonly pokemonService: Pokemon
    ) {}

  ngOnInit(): void {
    this.savePokemon();
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        if (e.urlAfterRedirects === '/add') {
          this.savePokemon();
        }
      });
  }


  savePokemon(): void {
    this.pokemon$ = this.pokemonService.savePokemon();
  }

  toggleImage(pokemon: PokemonItem): void {
    [pokemon.image, pokemon.imageShiny] = [pokemon.imageShiny, pokemon.image];
  }

  back(): void {
    this.router.navigate(['/']);
  }

  targetTypes(name: string): string {
    const typesMap: Record<string, string> = {
      fuego: 'fire',
      agua: 'water',
      planta: 'grass',
      eléctrico: 'electric',
      hielo: 'ice',
      lucha: 'fighting',
      veneno: 'poison',
      tierra: 'ground',
      volador: 'flying',
      psíquico: 'psychic',
      bicho: 'bug',
      roca: 'rock',
      fantasma: 'ghost',
      dragón: 'dragon',
      siniestro: 'dark',
      acero: 'steel',
      hada: 'fairy',
      normal: 'normal',
    };
    return typesMap[name.toLowerCase()] ?? 'normal';
  }

}
