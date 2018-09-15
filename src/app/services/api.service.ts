import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

/**
 * Created by He on 3/3/17.
 * 请求API
 */
export const WAKATIME_API_URL = 'https://wakatime.com/api/v1';
export const CLIENT_ID = 'YAfge95KBCv2GSiXY0F5oiPK';
export const REDIRECT_URI = 'http://localhost';

@Injectable(
    {providedIn: 'root'}
)
export class ApiService {

    options: any;

    constructor(private http: HttpClient) {

    }

    getCommits(projectId: string, page: number) {
        return this.http.get(`${WAKATIME_API_URL}/users/current/projects/${projectId}/commits?page=${page}`, this.options)
    }

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

    getHeartbeats(date: string) {
        let url = `${WAKATIME_API_URL}/users/current/heartbeats?date=${date}`;
        return this.http.get(url, this.options);
    }

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

    getProjects() {
        return this.http.get(`${WAKATIME_API_URL}/users/current/projects`, this.options);
    }


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


    getUsers() {
        return this.http.get(`${WAKATIME_API_URL}/users/current`, this.options);
    }

    getUserAgents() {
        return this.http.get(`${WAKATIME_API_URL}/users/current/user_agents`, this.options);
    }

}
