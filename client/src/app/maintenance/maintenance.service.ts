import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilities/utils';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { getPaginatedResult, getPaginationHeaders } from '../_services/paginationHelper';
import { MaintenanceCreateDto, MaintenanceDetailsDto, MaintenanceDto, MaintenanceParams, MaintenancePostGetDTO, MaintenancePutGetDTO } from './maintenance.model';
@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = environment.apiURL + 'maintenances';
  maintenances : MaintenanceDetailsDto[]=[];
  maintenanceCache = new Map();
  user : User;
  maintenanceParams:MaintenanceParams = new MaintenanceParams;
  constructor(private http : HttpClient,
              private accountService:AccountService) {
        this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
          this.user =user;
          this.maintenanceParams = new MaintenanceParams(user??null);
        })
   }
  public getMaintenanceParams(){
    this.maintenanceParams.pageNumber = 1;
    return this.maintenanceParams;
  }     
  public setMaintenanceParams(params : MaintenanceParams){
    this.maintenanceParams = params;
  }
  public resetMaintenanceParams(){
    this.maintenanceParams = new MaintenanceParams(this.user??null);
    return this.maintenanceParams;
  }
  public getById(id:number):Observable<MaintenanceDetailsDto>{
    return this.http.get<MaintenanceDetailsDto>(`${this.apiUrl}/${id}`);
  }
  getMaintenancePagination(maintenanceParams:MaintenanceParams){
    // console.log(maintenanceParams)
    var response = this.maintenanceCache.get(Object.values(maintenanceParams).join('-'));
    if(response){
      return of(response);
    }
    let params = getPaginationHeaders(maintenanceParams.pageNumber,maintenanceParams.pageSize);
    if(maintenanceParams.types){
      maintenanceParams.types.forEach(id =>{
        params = params.append('types',id);
      })
    }
    if(maintenanceParams.areas)params = params.append('areas', maintenanceParams.areas);
    if(maintenanceParams.search)params = params.append('search',maintenanceParams.search);
        // console.log(params)
        
    return getPaginatedResult<MaintenanceDetailsDto[]>(this.apiUrl,params,this.http)
        .pipe(map(response => {
          this.maintenanceCache.set(Object.values(maintenanceParams).join('-'),response);
          // console.log(this.maintenanceCache)
          return response;
        }))
  }
  public postget() : Observable<MaintenancePostGetDTO>{
    return this.http.get<MaintenancePostGetDTO>(`${this.apiUrl}/postget`);
  }
  public create(maintenanceCreateDto:MaintenanceCreateDto) : Observable<number>{
    const formData = this.BuildFormData(maintenanceCreateDto);
    return this.http.post<number>(this.apiUrl,formData);
  }
  public putget(id:number) :Observable<MaintenancePutGetDTO>{
    return this.http.get<MaintenancePutGetDTO>(`${this.apiUrl}/putget/${id}`);
  }
  public edit(id:number,maintenanceCreateDto:MaintenanceCreateDto){
    const formData = this.BuildFormData(maintenanceCreateDto);
    return this.http.put(`${this.apiUrl}/${id}`,formData);
  }
  public delete(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  private BuildFormData(maintenanceCreateDto: MaintenanceCreateDto): FormData {
    const formData = new FormData();
    formData.append('description', maintenanceCreateDto.description);
    for (const file of maintenanceCreateDto.pictureUrl) {
      formData.append('pictures', file, file.name);
    } 
    if(maintenanceCreateDto.dueDate)
    formData.append('dueDate',formatDateFormData(maintenanceCreateDto.dueDate));
    formData.append('typeIds', JSON.stringify(maintenanceCreateDto.typeIds));
    formData.append('areaIds', maintenanceCreateDto.areaIds.toString());
    return formData;
  }
}
