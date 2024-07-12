import { HttpParams } from '@angular/common/http';
import { TableLazyLoadEvent } from 'primeng/table';

export class CustomPageable {
  static instance(event: TableLazyLoadEvent | null, filter: string | null): HttpParams {
    let params = new HttpParams();

    if (event) {
      if (event.first) {
        params = params.append('page', event.first / event.rows!);
      }

      if (event.rows) {
        params = params.append('size', event.rows);
      }

      if (event.sortOrder && event.sortField) {
        params = params.append('sorting', event.sortOrder == 1 ? `${event.sortField}` : `-${event.sortField}`);
      }

      if (filter) {
        params = params.append('filter', filter == null ? '' : filter);
      }
    }

    if (filter) {
      params = params.append('filter', filter == null ? '' : filter);
    }

    return params;
  }
}
