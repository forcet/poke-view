import { Component, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Pokemon } from '../services/pokemon';
import { PokemonItem } from '../model/pokemon.model';
import { CommonModule } from '@angular/common';
import { Observable, shareReplay } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../delete-dialog/delete-dialog';

@Component({
  selector: 'app-pokemon-detail',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatGridListModule, MatIconModule, MatChipsModule, MatDividerModule],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
})
export class PokemonDetail implements OnInit, OnChanges {

  pokemon$!: Observable<PokemonItem>;
  private readonly router = inject(Router);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pokemonService: Pokemon,
    private readonly dialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      const id = this.route.snapshot.paramMap.get('id'); 
      this.pokemon$ = this.pokemonService.getPokemonById(id!);
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.pokemon$ = this.pokemonService.getPokemonById(id!).pipe(
      shareReplay(1)
    );
  }

  back(): void {
    this.router.navigate(['/']);
  }

  toggleImage(pokemon: PokemonItem): void {
    console.log(pokemon);
    [pokemon.image, pokemon.imageShiny] = [pokemon.imageShiny, pokemon.image];
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialog, { disableClose: true });


    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        const id = this.route.snapshot.paramMap.get('id');
        this.pokemonService.deletePokemon(id!).subscribe(() => {
          this.back();
        });
      }
    });
  }
}
