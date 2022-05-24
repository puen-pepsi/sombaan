import { areaDto } from "../admin/area/areas.model";
import { GroupDto, TypeDto } from "../utilities/multiple-selector-group/multiple-group.model";
import { User } from "../_models/user";
export interface TechnicianDto{
    id: number;
    fullName: string;
    bio: string;
    phoneNumber:string;
    lineId:string;
    dateOfBirth: Date;
    createAt: string;
    pictureUrl: string;
    types: TypeDto[];
    areas: areaDto[];
    averageVote: number;
    userVote: number;
}
export interface TechnicianCreateDto {
    userId: number;
    fullName: string;
    bio: string;
    phoneNumber:string;
    lineId:string;
    createAt: string;
    dateOfBirth: Date;
    pictureUrl: File;
    typeIds: number[];
    areaIds: number[];
}
export interface TechnicianPostGetDTO{
    groupTypes : GroupDto[];
    areas : areaDto[];
}
export interface TechnicianPutGetDTO{
    technician: TechnicianDto;
    selectedTypes: TypeDto[];
    selectedAreas: areaDto[];
    groupTypes: GroupDto[];
    areas: areaDto[];
}
export class TechnicianParams{
    types :number[];
    areas :number;
    search:string;
    pageNumber = 1;
    pageSize = 3;
    constructor(user?:User){
        this.types =[];
        this.areas =0;
        this.search='';
    }

}