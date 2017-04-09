import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
/**
 * Created by He on 3/3/17.
 * 请求API
 */
@Injectable()
export class ApiService {

    options: any;

    constructor(private http: Http) {

    }

    createAuthorizationHeader() {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', `Basic ${localStorage.getItem('Authorization')}`);
        this.options = new RequestOptions({headers: headers});
    }

    delAuthorizationHeader() {
        this.options.headers.removeItem('Authorization');
    }

    /**
     * List of commits for a WakaTime project showing the time spent coding in each commit.
     * @param project
     * @returns {Observable<Response>}
     */
    getCommits(projectId: string) {
        return this.http.get(`/api/v1/users/current/projects/${projectId}/commits`).map(res => res.json());
    }

    /**
     * A user's logged time for the given day as an array of duration blocks.
     */
    getDurations() {

    }

    /**
     * A single user.
     */
    getUsers() {

    }

    /**
     * List of plugins which have sent data for this user.
     */
    getUserAgents() {

    }

    /**
     * A user's logged time for the given time range
     * @param range
     * @returns {Observable<R>}
     */
    getStats(range: string) {
        return this.http.get(`/api/v1/users/current/stats/${range}`, this.options).map(res => res.json());
    }


    /**
     *
     * @returns {Observable<R>}
     */
    getProjects() {
        return this.http.get(`/api/v1/users/current/projects`, this.options).map(res => res.json());
    }

    /**
     *  List of users ranked by logged time in descending order.
     */
    getLeaders() {
        return this.http.get(`/api/v1/leaders`, this.options).map(res => res.json());
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
