import { Component, OnInit} from '@angular/core';
import { UserAccounts } from '../../data-models/user-accounts.model';
import { Router } from '@angular/router';
import { UserManagementDataService } from '../../data-service/user-management-data.service';
import { ModalOptionsComponent } from '../modal/modal-options';
import { UsersApiService } from '../../api/user/users-api.service';

@Component({
    templateUrl: 'list.component.html'
})

export class ListComponent implements OnInit {

    responseData: {};
    USER_DATA: UserAccounts[] = [];

    constructor(
        private router: Router,
        private data: UserManagementDataService,
        private api: UsersApiService,
        private modal: ModalOptionsComponent
       ) { }

    ngOnInit() {
        this.getListData();
    }

    /**
     * Gets a list of Users from the API
     */
    getListData() {
        Promise.resolve(this.api.getAccountsList().then((result) => {
            const resultArr = Object.keys(result).map(function(resultIndex) {
                const resultObj = result[resultIndex];
                return resultObj;
            });

            for (const index of resultArr) {
                this.USER_DATA.push(index);
            }
        }));
    }

    /**
     * Method executed to modify a user
     * @param userModel A user object with modified values
     */
    onModify(userModel) {
        if (userModel == null) {
            this.modal.open('Failure!', 'An unknown error has Occurred', 'Please try again!');
        } else {
            this.data.sendModel(userModel);
            this.router.navigateByUrl('/users/edit/' + userModel.id);
        }
    }

    /**
     * Method executed to delete a user by given ID
     * @param userId The ID of the user to delete
     */
    onDelete(userId) {
        if (confirm('Are you sure you wish to delete this user?')) {
        this.USER_DATA.forEach( (i, index) => {
            if (i.id === userId) { this.USER_DATA.splice(index, 1); }
        });
        this.api.deleteUser(userId);
        }
    }
}
