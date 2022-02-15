import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
@NgModule({
    imports:[
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule
    ],
    exports:[
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule
    ]
})
export class MaterialModule{}