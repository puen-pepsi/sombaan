export interface MaintenanceCreateDto {
    description:string;
    createAt: string;
    areaIds: number;
    typeIds: number[];
    pictureUrl: File[];
}
// export interface PictureWithDesDto{
//     pictureUrl : File;
//     description: string;
// }