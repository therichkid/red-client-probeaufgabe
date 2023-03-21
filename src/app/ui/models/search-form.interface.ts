import { FhirSearchFn } from '@red-probeaufgabe/types';

export interface ISearchFormChange {
  query: string;
  resource: FhirSearchFn;
}
