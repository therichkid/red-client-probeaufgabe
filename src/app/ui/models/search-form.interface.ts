import { FhirSearchFn } from '@red-probeaufgabe/types';

export interface SearchFormChange {
  query: string;
  resource: FhirSearchFn;
}
