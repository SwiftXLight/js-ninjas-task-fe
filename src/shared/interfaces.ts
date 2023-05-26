export interface IHeroResponse {
    id: number;
    nickname: string;
    images: string | null;
}

export interface Hero {
    id: number;
    nickname: string;
    realName: string;
    originDescription: string;
    superpowers: string;
    catchPhrase: string;
    images: string[] | null;
}
  