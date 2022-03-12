export interface articleCreationDTO{ 
    title: string;
    description : string;
    body:string;
    genresIds: number[];
    tagsIds: string[];
    picture : File;
}