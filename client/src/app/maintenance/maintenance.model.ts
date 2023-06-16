import { areaDto } from "../admin/area/areas.model";
import { GroupDto, TypeDto } from "../utilities/multiple-selector-group/multiple-group.model";
import { User } from "../_models/user";

export interface MaintenanceCreateDto {
    description:string;
    createAt: string;
    dueDate:Date;
    areaIds: number;
    typeIds: number[];
    pictureUrl: File[];
}
export interface MaintenanceDto {
    id :number;
    description:string;
    createAt: string;
    areaId: number;
    areaName:string;
    customerName:string;
    pictures: PictureWithDesDto[];
}
export interface MaintenanceDetailsDto {
    id :number;
    description:string;
    createAt: Date;
    dueDate:Date;
    areaId: number;
    areaName:string;
    customerName:string;
    types:TypeDto[];
    pictures: PictureWithDesDto[];
    matchTechnicians:MathTechnicianDto[];
}
export interface PictureWithDesDto{
    id:number;
    pictureUrl : string;
    description: string;
}
export interface MathTechnicianDto{
    technicianId :number;
}
export interface MaintenancePostGetDTO{
    groupTypes : GroupDto[];
    areas : areaDto[];
}
export interface MaintenancePutGetDTO{
    maintenance: MaintenanceDto;
    selectedTypes: TypeDto[];
    selectedAreas: areaDto;
    groupTypes: GroupDto[];
    areas: areaDto[];
}
export class MaintenanceParams{
    types :number[];
    areas :number;
    search:string;
    pageNumber = 1;
    pageSize = 5;
    constructor(user?:User){
        this.types =[];
        this.areas =0;
        this.search='';
    }

}

export interface multipleSelectorModelWithDetail{
    key: number;
    value: string;
    price:number;
}