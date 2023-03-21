import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FhirSearchFn } from '@red-probeaufgabe/types';
import { ISearchFormChange } from '../models';

@Component({
  selector: 'app-search',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  queryControl = new FormControl<string>('', Validators.pattern('[a-zA-Z0-9]*'));

  resourceControl = new FormControl<FhirSearchFn>(FhirSearchFn.SearchAll);
  resourceOptions: { label: string; value: FhirSearchFn }[] = [
    { label: 'Patients', value: FhirSearchFn.SearchPatients },
    { label: 'Practitioners', value: FhirSearchFn.SearchPractitioners },
    { label: 'Patients + Practitioners', value: FhirSearchFn.SearchAll },
  ];

  @Output() searchChanged: EventEmitter<ISearchFormChange> = new EventEmitter();

  ngOnInit(): void {
    this.queryControl.valueChanges.subscribe(() => this.emitSearchFormChange());
    this.resourceControl.valueChanges.subscribe(() => this.emitSearchFormChange());
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
