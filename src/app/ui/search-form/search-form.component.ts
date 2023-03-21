import { Component } from '@angular/core';
import { FhirResourceType } from '@red-probeaufgabe/types';

enum BothResources {
  Both = 'Both',
}
type ResourceFilterOption = FhirResourceType | BothResources;
const ResourceFilterOption = { ...FhirResourceType, ...BothResources };

@Component({
  selector: 'app-search',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  resourceFilterOptions: { label: ResourceFilterOption | string; value: ResourceFilterOption }[] = [
    { label: ResourceFilterOption.Patient, value: ResourceFilterOption.Patient },
    { label: ResourceFilterOption.Practitioner, value: ResourceFilterOption.Practitioner },
    { label: 'Patient + Practitioner', value: ResourceFilterOption.Both },
  ];
}
