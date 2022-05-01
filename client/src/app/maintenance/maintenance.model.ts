import { areaDto } from "../admin/area/areas.model";
import { GroupDto, TypeDto } from "../utilities/multiple-selector-group/multiple-group.model";
import { multipleSelectorModel } from "../utilities/multiple-selector/multiple-selector.model";

export interface MaintenanceCreateDto {
    description:string;
    createAt: string;
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
export interface PictureWithDesDto{
    id:number;
    pictureUrl : string;
    description: string;
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