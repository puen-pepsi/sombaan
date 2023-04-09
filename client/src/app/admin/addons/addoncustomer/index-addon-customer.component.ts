import { Component, OnInit } from '@angular/core';
import { addonCustomerDto } from '../addons.model';
import { AddonCustomerService } from './addon-customer.service';

@Component({
  selector: 'app-index-addon-customer',
  templateUrl: './index-addon-customer.component.html',
  styleUrls: ['./index-addon-customer.component.css']
})
export class IndexAddonCustomerComponent implements OnInit {
  addoncustomers: addonCustomerDto[];

  columnsToDisplay = ['name','descriptions','price', 'actions'];

  constructor(private addoncustomerService  : AddonCustomerService) { }

  ngOnInit(): void {
   this.losdAddonCustomer();
  }

  losdAddonCustomer(){
    this.addoncustomerService.getAll().subscribe(addoncustomer => {
      this.addoncustomers = addoncustomer;
    });
  }

  delete(id: number){
    this.addoncustomerService.delete(id)
    .subscribe(() => {
      this.losdAddonCustomer();
    });
  }

}
