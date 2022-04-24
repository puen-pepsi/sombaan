import { ActivatedRouteSnapshot, Resolve} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { article } from "../article/articles.model";
import { TechnicianService } from "../technician/technician.service";
import { TechnicianDto } from "../technician/technician.model";

@Injectable({
    providedIn:'root'
})

export class TechnicianDetailedResolver implements Resolve<TechnicianDto> {
    
    constructor(private technicianService:TechnicianService){}
    resolve(route: ActivatedRouteSnapshot): Observable<TechnicianDto> {
        return this.technicianService.getTechnician(+route.paramMap.get('id'));
    }

}
