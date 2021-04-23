import { environment } from "@environments/environment";
import { KeyValue } from "@angular/common";
import { HttpHeaders, HttpParams } from "@angular/common/http";

export abstract class HttpService {
  public apiUrl: string;
  public baseUrl: string;

  protected constructor() {
    this.apiUrl = environment.apiUrl;
    this.baseUrl = environment.apiUrl.split("/api")[0];
  }

  public prepareHeaders(items: KeyValue<string, string>[], headers: HttpHeaders = new HttpHeaders()): HttpHeaders {
    for (const item of items) {
      headers = headers.append(item.key, item.value);
    }

    return headers;
  }

  public prepareParams(items: KeyValue<string, string>[], params: HttpParams = new HttpParams()): HttpParams {
    for (const item of items) {
      if (item) {
        params = params.append(item.key, item.value);
      }
    }

    return params;
  }
}
