import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FhirUtilService } from '@red-probeaufgabe/search';
import { FhirResourceType, IFhirPatient, IFhirPractitioner } from '@red-probeaufgabe/types';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.scss'],
})
export class DialogDetailComponent {
  @Input() label = '';
  presentedData: { label: string; value: string }[];

  constructor(
    private fhirUtilService: FhirUtilService,
    @Inject(MAT_DIALOG_DATA) data: IFhirPatient | IFhirPractitioner,
  ) {
    const preparedData = this.fhirUtilService.prepareData(data);
    const presentedData = [
      { label: 'Resource Type', value: preparedData.resourceType },
      { label: 'Name', value: preparedData.name?.join('<br>') },
      { label: 'ID', value: preparedData.id },
    ];

    if (data.resourceType === FhirResourceType.Patient) {
      presentedData.push(
        { label: 'Birth Date', value: preparedData.birthDate },
        { label: 'Gender', value: preparedData.gender },
        { label: 'Address', value: preparedData.address?.join('<br>') },
      );
    } else if (data.resourceType === FhirResourceType.Practitioner) {
      presentedData.push({
        label: 'Telecom',
        value: preparedData.telecom?.map(({ system, value }) => `${system}: ${value}`).join('<br>'),
      });
    }

    this.presentedData = presentedData.filter(({ value }) => value !== undefined);
  }
}
