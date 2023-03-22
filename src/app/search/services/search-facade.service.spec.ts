import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { IFhirPatient, IFhirPractitioner, IFhirSearchResponse } from '@red-probeaufgabe/types';
import { forkJoin, of } from 'rxjs';
import { PatientSearchService } from './patient-search.service';
import { PractitionerSearchService } from './practitioner-search.service';
import { SearchFacadeService } from './search-facade.service';

/**
 * Optionale Zusatzaufgabe
 */
const meta = { versionId: '', lastUpdated: '', security: [] };
const text = { text: '', div: '' };

const patients: IFhirSearchResponse<IFhirPatient> = {
  entry: [
    { resourceType: 'Patient', id: '1', meta, text, extension: [] },
    { resourceType: 'Patient', id: '2', meta, text, extension: [] },
    { resourceType: 'Patient', id: '3', meta, text, extension: [] },
  ],
  total: 3,
};
const practitioners: IFhirSearchResponse<IFhirPractitioner> = {
  entry: [
    { resourceType: 'Practitioner', id: '4', meta, text, extension: [] },
    { resourceType: 'Practitioner', id: '5', meta, text, extension: [] },
  ],
  total: 2,
};

let searchFacadeService: SearchFacadeService;
const mockPatientSearchService: Partial<PatientSearchService> = {
  search: jest.fn(() => of(patients)),
};
const mockPractitionerSearchService: Partial<PractitionerSearchService> = {
  search: jest.fn(() => of(practitioners)),
};

describe('SearchFacadeService', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        SearchFacadeService,
        { provide: PatientSearchService, useValue: mockPatientSearchService },
        { provide: PractitionerSearchService, useValue: mockPractitionerSearchService },
      ],
    });

    searchFacadeService = TestBed.inject(SearchFacadeService);
  });
  test('should init', () => {
    expect(searchFacadeService).toBeDefined();
  });

  test('should find patients', (done) => {
    searchFacadeService.searchPatients('').subscribe((patients) => {
      expect(patients.entry.length).toBeGreaterThan(0);
      done();
    });
  });

  test('should find practitioners', (done) => {
    searchFacadeService.searchPractitioners('').subscribe((practitioners) => {
      expect(practitioners.entry.length).toBeGreaterThan(0);
      done();
    });
  });

  test('should find both', (done) => {
    searchFacadeService.searchAll('').subscribe((both) => {
      expect(both.entry.length).toBeGreaterThan(0);
      done();
    });
  });

  test('merge arrays', (done) => {
    forkJoin([
      searchFacadeService.searchPatients(''),
      searchFacadeService.searchPractitioners(''),
      searchFacadeService.searchAll(''),
    ]).subscribe(([patients, practitioners, both]) => {
      expect(both.entry.every((resource) => [...patients.entry, ...practitioners.entry].includes(resource))).toBe(true);
      done();
    });
  });
});
