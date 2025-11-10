export interface PokemonListResponse {
    results: PokemonItem[];
}

export interface PokemonInfo {
    code: number;
    name: string;
    image: string

}

export interface PokemonItem {
    code: number;
    name: string;
    height: number;   
    weight: number;
    abilities: Ability[];
    category: string;
    description: string;
    image: string;
    imageShiny: string;
    types: Types[];
    weakness: Weakness[]
}

export interface Ability {
    name: string;
    description: string;
    isHidden: boolean;
    slot: number;
}

export interface Types {
    name: string;
    slot: number;
}

export interface Weakness {
    name: string;
}