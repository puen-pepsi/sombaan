import { areaDto } from "../admin/area/areas.model";
import { techtypeDto } from "../admin/techniciantype/technician.model";

export interface TechnicianCreateDto {
    userId: number;
    id: number;
    fullName: string;
    bio: string;
    createAt: string;
    dateOfBirth: Date;
    pictureUrl: File;
    typeIds: number[];
    areaIds: number[];
}
export interface TechnicianPostGetDTO{
    types : techtypeDto[];
    areas : areaDto[];
}