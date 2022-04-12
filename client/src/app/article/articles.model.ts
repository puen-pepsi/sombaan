import { genreDTO } from "../admin/genre/genres.model";
import { tagDTO } from "../admin/tag/tags.model";
import { Profile } from "../profile/profile.model";
import { User } from "../_models/user";

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
    id:number;
    slug:string;
    title: string;
    description : string;
    body:string;
    createAt:Date;
    authorName:string;
    authorPhoto:string;
    authorFollowed:boolean;
    liked:boolean;
    likesCount:number;
    genres: genreDTO[];
    tags: tagDTO[];
    photos : photoDTO[];
}
export interface article{
    id:number;
    slug:string;
    title: string;
    description : string;
    body:string;
    createAt:Date;
    liked:boolean;
    likesCount:number;
    totalComments:number;
    genres: genreDTO[];
    tags: tagDTO[];
    photos : photoDTO[];
    author :Profile;
}
export interface commentAriticleCreate{
    content:string;
    parentId?:number;
}
export interface commentArticleDto {
    id: number;
    content: string;
    parentId:number;
    articleId:number;
    createdAt: string;
    userName:string;
    followed:boolean;
    image:string;
    liked:string[];
  }

export interface commentGetDto{
    slug:string;
    parentId?:number;
}
export interface photoDTO{
    id:number;
    url:string;
}

export class ArticleParams{
    genre :number;
    search:string;
    pageNumber = 1;
    pageSize = 3;
    constructor(user?:User){
        this.genre =0;
        this.search='';
    }
}