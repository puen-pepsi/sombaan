import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GroupDto, TypeDto } from '../multiple-selector-group/multiple-group.model';
export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: TypeDto[], value: string): TypeDto[] => {
  const filterValue = value;

  return opt.filter(item => item.name.includes(filterValue));
};

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.css']
})

export class SearchSelectComponent implements OnInit {
  stateForm: FormGroup = this.formBuilder.group({
    stateGroup: '',
  });
  @Input() 
  stateGroups: GroupDto[];
  stateGroupOptions: Observable<GroupDto[]>;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value)),
    );
  }

  private _filterGroup(value: string): GroupDto[] {
    if (value) {
      return this.stateGroups
        .map(group => ({name:group.name,types:_filter(group.types,value)}))
        .filter(group => group.types.length > 0);
    }

    return this.stateGroups;
  }

}
