import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ResponseWrapper } from '../../../response-wrapper.model';
import { UserAccounts } from '../../data-models/user-accounts.model';
import { MasterApiService } from '../master-api.service';



@Injectable()
export class UsersApiService extends MasterApiService {

   private baseUrl = this.getUrl();
   private baseHttp = this.getHttp();

    /**
    * Get a list of User Accounts
    */
    public getAccountsList() {
        const promise = new Promise(resolve =>
            this.baseHttp.get<ResponseWrapper<UserAccounts>>(this.baseUrl + 'users/')
            .toPromise()
            .then((response => {
                if (response['httpStatus'] === 'OK') {
                   resolve(response['content']);
                }
             })
            )
        );
       return promise;
    }

    /**
     * Gets a specific user by username
     * @param username The Username to query by
     */
    public getUserExists(username) {
        return this.baseHttp.get(this.baseUrl + 'users?username=' + username.toString())
        .map(res => res)
        .toPromise();
    }

    /**
     * Creates a user using using the provided model containing the various parameters
     * @param userModifyModel A model containing any specified parameters
     */
    public createUser(userModifyModel) {
        return this.baseHttp.post<any>(this.baseUrl + 'users/', userModifyModel)
        .map(res => res)
        .toPromise();
    }

    /**
     * Modify a user using using the provided model containing the various parameters
     * @param userModifyModel A model containing any specified parameters
     */
    public modifyUser(userModifyModel) {
        return this.baseHttp.put<any>(this.baseUrl + 'users/', userModifyModel)
        .map(res => res)
        .toPromise();
    }

    /**
     * Delete a user using the passed username
     * @param username The username of the User to delete
     */
    public deleteUser(username) {
        return this.baseHttp.delete<any>(this.baseUrl + 'users/' + username)
        .map(res => res)
        .toPromise();
    }
}
