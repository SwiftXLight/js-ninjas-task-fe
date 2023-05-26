export interface IHeroResponse {
    id: number;
    nickname: string;
    images: string | null;
}

export interface IHero {
    id: number;
    nickname: string;
    realName: string;
    originDescription: string;
    superpowers: string;
    catchPhrase: string;
    images: string[] | null;
}
  
export interface ICreateHero {
    nickname: string;
    realName: string;
    originDescription: string;
    superpowers: string;
    catchPhrase: string;
}
