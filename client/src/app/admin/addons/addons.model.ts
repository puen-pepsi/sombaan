export interface addonStateCreationDTO {
    name: string;
}
export interface addonstateDto{
    id:number;
    name:string;
}
export interface addonCutomerCreationDto{
    name: string;
    descriptions: string;
    price: number;
    addonStateId: number;
}
export interface addonCustomerDto{
    id: number;
    name: string;
    descriptions: string;
    price: number;
    addonStateId: number;
}
