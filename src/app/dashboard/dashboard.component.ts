import { Component } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { SiteTitleService } from '@red-probeaufgabe/core';
import { FhirSearchFn, IFhirPatient, IFhirPractitioner, IFhirSearchResponse } from '@red-probeaufgabe/types';
import { ISearchFormChange, IUnicornTableColumn } from '@red-probeaufgabe/ui';
import { SearchFacadeService } from '@red-probeaufgabe/search';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // Init unicorn columns to display
  columns: Set<IUnicornTableColumn> = new Set<IUnicornTableColumn>([
    'number',
    'resourceType',
    'name',
    'gender',
    'birthDate',
  ]);
  isLoading = true;

  searchChanged$: Subject<ISearchFormChange> = new Subject();

  search$: Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>> = this.searchChanged$.pipe(
    startWith({ query: '', resource: FhirSearchFn.SearchAll }),
    switchMap(({ query, resource }) =>
      this.searchFacade.search(resource, query).pipe(
        catchError(this.handleError),
        tap(() => {
          this.isLoading = false;
        }),
        shareReplay(),
      ),
    ),
  );

  entries$: Observable<Array<IFhirPatient | IFhirPractitioner>> = this.search$.pipe(
    map((data) => !!data && data.entry),
    startWith([]),
  );

  totalLength$ = this.search$.pipe(
    map((data) => !!data && data.total),
    startWith(0),
  );

  /*
   * Task 1:
   * Instead of the abstract class AbstractSearchFacadeService, the class SearchFacadeService needs to be used here.
   * The abstract class is used as a blueprint and doesn't implement the logic which we need here.
   */
  constructor(private siteTitleService: SiteTitleService, private searchFacade: SearchFacadeService) {
    this.siteTitleService.setSiteTitle('Dashboard');
  }

  private handleError(): Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>> {
    return of({ entry: [], total: 0 });
  }
}
