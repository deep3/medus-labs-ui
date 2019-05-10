import { Component, OnInit  } from '@angular/core';
import { OrganisationsApiService } from '../../api/organisations/organisations-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'accounts.component.html'
})
export class AccountComponent implements OnInit {

    validAccountsList: any[] = [];
    invalidAccountsList: any[] = [];
    private loading = true;
    constructor(private api: OrganisationsApiService) {}

    ngOnInit(): void {
        this.getAccountsData();
        this.getInvalidAccountsData();
    }

    /**
     * Get the Member Organsiation Accounts from the API
     */
    getAccountsData() {
        Promise.resolve(this.api.getMemberOrganisationAccounts('valid').then((result) => {
            const resultArr = Object.keys(result).map(function(resultIndex) {
                const resultObj = result[resultIndex];
                return resultObj;
            });

            for (const index of resultArr) {
                this.validAccountsList.push(index);
            }
            this.loading = false;
        }));
    }

    /**
     * Check for any invalid accounts (Determined by the name of the account not starting with "AWSLabs")
     */
    getInvalidAccountsData() {
        Promise.resolve(this.api.getMemberOrganisationAccounts('invalid').then((result) => {
            const resultArr = Object.keys(result).map(function(resultIndex) {
                const resultObj = result[resultIndex];
                return resultObj;
            });

            for (const index of resultArr) {
                this.invalidAccountsList.push(index);
            }
        }));
    }

    /**
     * Returns whether the data is still being fetched from the API
     */
    isLoading() {
        return this.loading;
    }
 }
