import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {

    constructor(private http: Http) {}

    public getQuote(quoteId: string, accountId: string) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('quote_id', quoteId);
        params.set('account_id', accountId);
        return this.http.get(environment.apiUrl + 'quote', {search: params})
            .map((response: Response) => response.json());
    }

    public getNotes(quoteId: string, accountId: string) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('quote_id', quoteId);
        params.set('account_id', accountId);
        return this.http.get(environment.apiUrl + 'quote/notes', {search: params})
            .map((response: Response) => response.json());
    }

    public wonQuote(quoteId: string, accountId: string) {
        const body = { quote_id: quoteId, account_id: accountId };
        return this.http.put(environment.apiUrl + 'quote/won', body)
            .map((response: Response) => response.json());
    }

    public downloadPDF(quoteId: string, accountId: string, imageData: string) {
        const body = { quote_id: quoteId, account_id: accountId, image_data: imageData };
        return this.http.post(environment.apiUrl + 'quote/genpdf', body)
            .map((response: Response) => response);
    }
}
