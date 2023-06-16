import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { multipleSelectorModel } from '../multiple-selector/multiple-selector.model';

@Component({
  selector: 'app-single-selector',
  templateUrl: './single-selector.component.html',
  styleUrls: ['./single-selector.component.css']
})
export class SingleSelectorComponent implements OnInit,AfterViewInit,OnDestroy,OnChanges{
    @Output() onSelectChange = new EventEmitter<multipleSelectorModel>();
    @Input() placeHolder :string='Area';
    @Input() fcName:string='';
    /** list of lists */
    @Input() lists: multipleSelectorModel[];
    @Input() selected:multipleSelectorModel = {key:2,value:'ลาดพร้าว'};
    /** control for the selected multipleSelectorModel */
    public selectedCtrl: FormControl = new FormControl();
  
    /** control for the MatSelect filter keyword */
    public selectedFilterCtrl: FormControl = new FormControl();
  
    /** list of lists filtered by search keyword */
    public filteredSelector: ReplaySubject<multipleSelectorModel[]> = new ReplaySubject<multipleSelectorModel[]>(1);
  
    @ViewChild('singleSelect') singleSelect: MatSelect;
  
    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy = new Subject<void>();
  

    constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  
    ngOnInit() {
      if(this.lists){


        // set initial selection
          //this.selectedCtrl.setValue(this.lists[10]);
          // if(this.selected != undefined){
          //             console.log(this.selected)
          if(this.selected != undefined){
           const index = this.lists.findIndex(x => x.key === this.selected.key);
            this.selectedCtrl.setValue(this.lists[index]);
          }

          // }
        // load the initial multipleSelectorModel list
        this.filteredSelector.next(this.lists.slice()); 
      }
  
      // listen for search field value changes
      this.selectedFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterlists();
        });
    }
  
    ngAfterViewInit() {
      this.setInitialValue();
    }
  
    ngOnDestroy() {
      this._onDestroy.next();
      this._onDestroy.complete();
    }
    onChangeSelect(event : MatSelectChange){
      this.onSelectChange.emit(event.value);
    }
    deselectAll(){
      this.selectedCtrl.setValue([]);
      this.onSelectChange.emit();
    }
    /**
     * Sets the initial value after the filteredlists are loaded initially
     */
    protected setInitialValue() {
      this.filteredSelector
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          // setting the compareWith property to a comparison function
          // triggers initializing the selection according to the initial value of
          // the form control (i.e. _initializeSelection())
          // this needs to be done after the filteredlists are loaded initially
          // and after the mat-option elements are available
          this.singleSelect.compareWith = (a: multipleSelectorModel, b: multipleSelectorModel) => a && b && a.value === b.value;
        });
    }
  
    protected filterlists() {
      if (!this.lists) {
        return;
      }
      // get the search keyword
      let search = this.selectedFilterCtrl.value;
      if (!search) {
        this.filteredSelector.next(this.lists.slice());
        return;
      } else {
        search = search.toLowerCase();
      }
      // filter the lists
      this.filteredSelector.next(
        this.lists.filter(multipleSelectorModel => multipleSelectorModel.value.toLowerCase().indexOf(search) > -1)
      );
    }
    comparer(o1: any, o2: any): boolean {
      // if possible compare by object's name, and not by reference.
      return o1 && o2 ? o1.value === o2.value : o2 === o2;
    }
}
