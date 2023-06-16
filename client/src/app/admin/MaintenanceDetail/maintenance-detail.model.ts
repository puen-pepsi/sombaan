export interface MaintenanceDetailsCreateDto{
    technicianTypeId:number,
    uuId:string,
    parentId:string,
    detail:string,
    subDetail:MaintenanceDetailsCreateDto[]
}
export interface MaintenanceDetailsCreatePriceDto{
    technicianTypeId:number,
    uuId:string,
    parentId:string,
    detail:string,
    price:number,
    desc:string,
    subDetail:MaintenanceDetailsCreatePriceDto[]
}
export interface MaintenanceDetailGroup{
    id:number,
    uuId:string,
    details:string,
    parentId:string,
    technicianTypeId:number,
    price:number,
    desc:string
}