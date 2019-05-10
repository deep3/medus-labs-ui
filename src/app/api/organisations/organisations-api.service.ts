import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ResponseWrapper } from '../../../response-wrapper.model';
import { MasterApiService } from '../master-api.service';


@Injectable()
export class OrganisationsApiService extends MasterApiService {

    private baseUrl = this.getUrl();
    private baseHttp = this.getHttp();

    /**
    * Create accounts in the lnked AWS Environment
    * @param createAccountsModel An object containing the parameters expected by the API
    */
    public createNewAccounts(createAccountsModel): Promise<any> {
        return this.baseHttp.post<any>(this.baseUrl + 'organisations/create', createAccountsModel).map(res => res)
        .toPromise();
    }

    /**
    * Wipes All Accounts
    */
    public wipeAll(): Promise<any> {
        return this.baseHttp.delete(this.baseUrl + 'organisations/nuke').map(res => res)
        .toPromise();
    }

    /**
     * Get a list of MemberOrganisation Accounts in the linked AWS Environment
     * @param accountState (optional) Specific AccountState Only
     */
    public getMemberOrganisationAccounts(accountState = null): Promise<any> {
        let params = {};

        if (accountState) {
            params = {type : accountState};
        }

        const promise = new Promise(resolve =>
        this.baseHttp.get<any>(this.baseUrl + 'organisations/', {
             params: params
        })
        .toPromise()
        .then((response => {
            if (response['httpStatus'] === 'OK') {
                 resolve(response['content']);
            }
        })));

        return promise;
    }

    /**
    * Gets the Root Account ID for the Linked AWS Environment
    */
    public getRootAccountId(): Promise<any> {
        return this.baseHttp.get<ResponseWrapper<String>>(this.baseUrl + 'organisations/rootaccountid')
        .map(res => res)
        .toPromise();
    }

}
