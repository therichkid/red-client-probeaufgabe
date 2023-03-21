import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SearchFormChange, SearchFormResource } from '../models/search-form.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  queryControl = new FormControl<string>('', Validators.pattern('[a-zA-Z0-9]*'));

  resourceControl = new FormControl<SearchFormResource>(SearchFormResource.All);
  resourceOptions: { label: string; value: SearchFormResource }[] = [
    { label: 'Patients', value: SearchFormResource.Patient },
    { label: 'Practitioners', value: SearchFormResource.Practitioner },
    { label: 'Patients + Practitioners', value: SearchFormResource.All },
  ];

  @Output() searchChanged: EventEmitter<SearchFormChange> = new EventEmitter();

  ngOnInit(): void {
    this.queryControl.valueChanges.subscribe(this.emitSearchFormChange);
    this.resourceControl.valueChanges.subscribe(this.emitSearchFormChange);
  }

  private emitSearchFormChange() {
    if (this.queryControl.invalid || this.resourceControl.invalid) {
      return;
    }

    this.searchChanged.emit({
      query: this.queryControl.value,
      resource: this.resourceControl.value,
    });
  }
}
