export interface AddressCreateDto {
    addressAt: string;
    subdistrict: string;
    district: string;
    province: string;
    postcode: string;
    userAddressId: number;
}
export interface SelectorDto{
    id:number;
    name:string;
}
export interface SelectorDistrictDto{
    id:number;
    name:string;
    zipCode:string;
}
export interface DistrictDto{
    key:number;
    value:string;
    zipCode:string;
}
