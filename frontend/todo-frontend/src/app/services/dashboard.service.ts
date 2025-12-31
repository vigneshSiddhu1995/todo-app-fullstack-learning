import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn:"root"
})
export class DashboardService {
    private dashboardUrl = "http://localhost:8080/api/dashboard/stats";

    constructor(private http: HttpClient) {}

    getDashboardStats():Observable<any> {
        return this.http.get(this.dashboardUrl);
    }

}