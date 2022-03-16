import { genreDTO } from "../admin/genre/genres.model";
import { tagDTO } from "../admin/tag/tags.model";

export interface articleCreationDTO{ 
    title: string;
    description : string;
    body:string;
    genresIds: number[];
    tagsIds: string[];
    photoList : File[];
}
export interface articlePostGetDTO{
    genres : genreDTO[];
    tags : tagDTO[];
}
export interface articlePutGetDTO{
    article:articleDTO;
    selectedGenres:genreDTO[];
    nonSelectedGenres:genreDTO[];
    selectedTags:string[];
    nonSelectedTags:string[];
}
export interface articleDTO{
    title: string;
    description : string;
    body:string;
    create:Date;
    authorName:string;
    genres: genreDTO[];
    tags: tagDTO[];
    photos : photoDTO[];
}

export interface photoDTO{
    id:number;
    url:string;
}