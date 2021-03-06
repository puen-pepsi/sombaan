
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilities/utils';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { getPaginatedResult, getPaginationHeaders } from '../_services/paginationHelper';
import { TechnicianCreateDto, TechnicianDto, TechnicianParams, TechnicianPostGetDTO, TechnicianPutGetDTO } from './technician.model';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {
  private apiUrl = environment.apiURL + 'technicians';
  technician : TechnicianDto;
  technicians : TechnicianDto[]=[];
  technicianCache = new Map();
  user : User;
  technicianParams : TechnicianParams = new TechnicianParams;
  constructor(private http:HttpClient,
              private accountService:AccountService) { 
                this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
                    this.user =user;
                    this.technicianParams = new TechnicianParams(user??null);
                })
              }
  public getTechnicianParams(){
    this.technicianParams.pageNumber = 1;
    return this.technicianParams;
  }     
  public setTechnicianParams(params : TechnicianParams){
    this.technicianParams = params;
  }
  public resetTechnicianParams(){
    this.technicianParams = new TechnicianParams(this.user??null);
    return this.technicianParams;
  }
  getTechnicianPagination(technicianParams:TechnicianParams){
    // console.log(technicianParams)
    var response = this.technicianCache.get(Object.values(technicianParams).join('-'));
    if(response){
      return of(response);
    }
    let params = getPaginationHeaders(technicianParams.pageNumber,technicianParams.pageSize);
    if(technicianParams.types){
      technicianParams.types.forEach(id =>{
        params = params.append('types',id);
      })
    }
    if(technicianParams.areas)params = params.append('areas', technicianParams.areas);
    if(technicianParams.search)params = params.append('search',technicianParams.search);
        // console.log(params)
        
    return getPaginatedResult<TechnicianDto[]>(this.apiUrl,params,this.http)
        .pipe(map(response => {
          this.technicianCache.set(Object.values(technicianParams).join('-'),response);
          // console.log(this.technicianCache)
          return response;
        }))
  }
  getTechnician(id:number){
    const technician = [...this.technicianCache.values()]
                .reduce((arr,elem)=> arr.concat(elem.result),[])
                .find((technician:TechnicianDto)=>technician.id == id);
         if(technician){
             console.log(technician)
             return of(technician);
         }
    return this.http.get<TechnicianDto>(`${this.apiUrl}/${id}`);
  }
  public putget(id:number) :Observable<TechnicianPutGetDTO>{
    return this.http.get<TechnicianPutGetDTO>(`${this.apiUrl}/putget/${id}`);
  }
  public edit(id:number,technicianCreateDto:TechnicianCreateDto){
    const formData = this.BuildFormData(technicianCreateDto);
    console.log(formData)
    return this.http.put(`${this.apiUrl}/${id}`,formData);
  }
  public postget() : Observable<TechnicianPostGetDTO>{
    return this.http.get<TechnicianPostGetDTO>(`${this.apiUrl}/postget`);
  }
  public create(technicianCreateDto : TechnicianCreateDto) : Observable<number>{
    const formData = this.BuildFormData(technicianCreateDto);
    return this.http.post<number>(this.apiUrl, formData);
  }

  private BuildFormData(technicianCreateDto: TechnicianCreateDto): FormData {
    const formData = new FormData();
    formData.append('fullName', technicianCreateDto.fullName);
    formData.append('bio', technicianCreateDto.bio);
    if(technicianCreateDto.dateOfBirth)
        formData.append('dateOfBirth',formatDateFormData(technicianCreateDto.dateOfBirth));
    if (technicianCreateDto.pictureUrl)
       formData.append('pictureUrl',technicianCreateDto.pictureUrl);
    formData.append('phoneNumber', technicianCreateDto.phoneNumber);
    formData.append('lineId', technicianCreateDto.lineId);
    formData.append('typeIds', JSON.stringify(technicianCreateDto.typeIds));
    formData.append('areaIds', JSON.stringify(technicianCreateDto.areaIds));
    return formData;
  }
}
