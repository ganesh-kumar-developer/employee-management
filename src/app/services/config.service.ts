import { Injectable } from "@angular/core";

@Injectable()
export class ConfigService {

    apiURL = 'https://07902dfb-c261-4ed7-bf46-c18679987bf9.mock.pstmn.io';

    getApiURL(): String{
        return this.apiURL;
    }
}