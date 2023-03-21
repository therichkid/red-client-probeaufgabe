import { FhirResourceType } from '@red-probeaufgabe/types';

enum AllResources {
  All = 'All',
}
export type SearchFormResource = FhirResourceType | AllResources;
export const SearchFormResource = { ...FhirResourceType, ...AllResources };

export interface SearchFormChange {
  query: string;
  resource: SearchFormResource;
}
