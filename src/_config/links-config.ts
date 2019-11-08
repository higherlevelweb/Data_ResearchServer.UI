import { environment } from '../environments/environment';

// -------- COMTRACKER API -----------------
export const API_VERSION = 'V1' // Update this to change version of API

export const BASE_API_LINK = environment.apiLocalEndPoint + 'api/' + API_VERSION + '/';
export const BASE_APISECURITY_LINK = environment.apiSecurityLocalEndPoint + 'api/' + API_VERSION + '/';

// new uswer admin
export const apiUrl = 'http://localhost:5001';

// -------------Source----------------
export const BASE_SOURCE = BASE_API_LINK + 'Source/'; // base source endpoint

// -------------Source----------------
export const BASE_SOURCE_DEMOGRAPHICDATA = BASE_API_LINK + 'DemographicSurvey/'; // base source endpoint


export const CONSTRUCT_UPDATE_BODY = function (id, details: any[]) {
    return {
        'Id': id,
        'Detail': details
    };

};

export const CONSTRUCT_UPDATE_OBJECT = function (name: string, value: any) {
    return {
        'Name': name,
        'Value': value
    };
};


export const CONSTRUCT_QUERY_OBJECT = function (name: string, values: any[]) {
    return {
        'Name': name,
        'Values': values
    };
};


export enum Endpoint { // Endpoints used for determining what type of document is to be used
    DataSource = 0,
    Analyze = 1,
    Source = 2,
    Multivariate = 3,
    Security = 4,
    Clothing = 5,
    ThreeDLibrary = 6
}