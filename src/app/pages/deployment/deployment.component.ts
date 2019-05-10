import { Component, OnInit} from '@angular/core';
import { DeploymentResponseDataService } from '../../data-service/deployment-response-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeployingLab } from '../../data-models/deploying-lab.model';
import { ModalCreatedUserComponent } from '../modal/modal-createdstudent';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'deployment.component.html'
})

export class DeploymentComponent implements OnInit {

    finished = false;
    isDeploymentDefunct = false;
    private id;
    private deployingStack: Array<DeployingLab>;


    constructor(private dataService: DeploymentResponseDataService,
                private createdUserModel: ModalCreatedUserComponent,
                private route: ActivatedRoute,
                private router: Router) {}

    ngOnInit(): void {
        // get specific lab id from URL
        this.id = this.route.snapshot.paramMap.get('id');
        this.subscribeToStackUpdates();
        this.deployingStack = new Array<DeployingLab>();
    }

    /**
     * Returns a boolean indicating whether there are any deployed Labs in the linked AWS Environment
     */
    isDeployedZero() {
        return this.deployingStack == null || this.deployingStack.length === 0;
    }

    /**
     * Method to initialise a subscription to the Stack Update socket
     */
    subscribeToStackUpdates() {
        const updateObservable = this.dataService.getStackUpdatesObservableById(this.id);
        if (updateObservable) {
            updateObservable.subscribe((stackMap: Map<String, DeployingLab>) => {
                this.deployingStack = Array.from(stackMap.values());
            });
        } else {
            this.isDeploymentDefunct = true;
        }

        // Subscribe to the finalise stack message
        this.dataService.getStackFinaliseMessages(this.id).subscribe((finaliseMessage) => {
            this.finished = true;
            let stackFailures = false;
            // Only display the created students dialog if the deployment succeeded
            for (const stack of this.deployingStack) {
                if (stack.status === 'FAILED') {
                    stackFailures = true;
                }
            }
            // Only display the created students dialog if the current url is active
            if (this.router.url.includes('/deployment') && stackFailures === false) {
                this.createdUserModel.open('Created Students', this.id);
            }
        });
    }
}
