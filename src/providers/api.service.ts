import {Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ErrorService} from "./error.service";
import {HttpClient} from "@angular/common/http";

/**
 * Created by He on 3/3/17.
 * 请求API
 */
// oauth
export const WAKATIME_API_URL = 'https://wakatime.com/api/v1';
export const CLIENT_ID = 'YAfge95KBCv2GSiXY0F5oiPK';
export const REDIRECT_URI = 'http://localhost';

@Injectable()
export class ApiService {

    options: any;

    constructor(private http: HttpClient, private errorService: ErrorService) {

    }

    /**
     * List of commits for a WakaTime project showing the time spent coding in each commit.
     * @param project
     * @returns {Observable<Response>}
     */
    getCommits(projectId: string, page: number) {
        return this.http.get(`${WAKATIME_API_URL}/users/current/projects/${projectId}/commits?page=${page}`, this.options)

    }

    /**
     * A user's logged time for the given day as an array of duration blocks.
     */
    getDurations(date: string, project?: string, branches?: string) {
        let url = `${WAKATIME_API_URL}/users/current/durations?date=${date}`;
        if (project) {
            url += `&project=${project}`;
        }
        if (branches) {
            url += `&branches=${branches}`;
        }
        return this.http.get(url, this.options);

    }

    /**
     * A user's heartbeats sent from plugins for the given day as an array.
     * @returns {Observable<R>}
     */
    getHeartbeats(date: string) {
        let url = `${WAKATIME_API_URL}/users/current/heartbeats?date=${date}`;
        return this.http.get(url, this.options);
    }

    /**
     *  List of users ranked by logged time in descending order.
     */
    getLeaders(language?: string, page?: number) {
        let url = `${WAKATIME_API_URL}/leaders?`;
        if (language) {
            url += `language=${language}&`
        }
        if (page) {
            url += `page=${page}&`
        }
        return this.http.get(url, this.options);
    }

    /**
     *
     * @returns {Observable<R>}
     */
    getProjects() {
        return this.http.get(`${WAKATIME_API_URL}/users/current/projects`, this.options);
    }


    /**
     * A user's logged time for the given time range
     * @param range
     * @returns {Observable<R>}
     */
    getStats(range: string, timeout?: number, writes_only?: boolean, project?: string) {
        let url = `${WAKATIME_API_URL}/users/current/stats/${range}`;
        if (timeout) {
            url += `timeout=${timeout}&`
        }
        if (writes_only) {
            url += `writes_only=${writes_only}&`
        }
        if (project) {
            url += `project=${project}&`
        }
        return this.http.get(url, this.options);
    }

    /**
     * A user's logged time for the given time range as an array of summaries segmented by day.
     */
    getSummaries(start: string, end: string, project?: string, branches?: string) {
        let url = `${WAKATIME_API_URL}/users/current/summaries?start=${start}&end=${end}`;
        if (project) {
            url += `project=${project}&`
        }
        if (branches) {
            url += `branches=${branches}&`
        }
        return this.http.get(url, this.options);
    }


    /**
     * A single user.
     */
    getUsers() {
        return this.http.get(`${WAKATIME_API_URL}/users/current`, this.options);
    }

    /**
     * List of plugins which have sent data for this user.
     */
    getUserAgents() {
        return this.http.get(`${WAKATIME_API_URL}/users/current/user_agents`, this.options);
    }

}
