import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { CreatedStudentModel } from '../data-models/created-student-model.model';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/from';
import { DeployingLab } from '../data-models/deploying-lab.model';

@Injectable()
export class DeploymentResponseDataService  {

    private createdStudents: CreatedStudentModel[];
    private deployedLab: any;
    private stackMaps = new Map<String, Map<String, DeployingLab>>();
    private observableStackMaps: Map<String, BehaviorSubject<Map<String, DeployingLab>>>;
    private createdStudentStackMaps = new Map<String, String>();
    private finaliseMessageStream =  new Subject<any>();

    constructor() {
        this.observableStackMaps = new Map<String, BehaviorSubject<Map<String, DeployingLab>>>();
    }

    /**
     * Handle incoming messages from the socket service
     * @param responseBody The JSON response body
     */
    receivedNewMessage(responseBody) {
        const resp = JSON.parse(responseBody);
        if (resp['type']) {
            switch (resp['type']) {
                case 'StackDeploymentMessage' : { this.parseStackDeploymentMessage(resp['body']); break; }
                case 'FailedStackDeploymentMessage' : { this.parseStackFailureMessage(resp['body']); break; }
                case 'CompletedStackDeploymentMessage': { this.parseStackSuccessMessage(resp['body']); break; }
                case 'FinaliseDeploymentMessage': { this.parseFinaliseDeployment(resp['body']); break; }
            }
        } else {
            console.log('type error in socket message');
        }
    }

    /**
     * Parses the deployment finalisation messages from the socket
     * @param message The Received Message
     */
    parseFinaliseDeployment(message) {
        this.finaliseMessageStream.next(message);
    }

    /**
     * Parses any stack deployment error messages from the socket
     * @param message The Received Message
     */
    parseStackFailureMessage(message) {
        let stackToUpdate = null;
        const labId = message.deployedLabId.toString();
        if (this.stackMaps.has(labId)) {
            if (this.stackMaps.get(labId).has(message.stackName)) {
            stackToUpdate = this.stackMaps.get(labId).get(message.stackName);
            } else {
                stackToUpdate = new DeployingLab();
                stackToUpdate.accountId = message.accountId;
                stackToUpdate.stackName = message.stackName;
                stackToUpdate.accountName = message.accountName;
                this.stackMaps.get(labId).set(message.stackName, stackToUpdate);
            }
            stackToUpdate.lastMessage = message.message + message.cloudFormationReason;
            stackToUpdate.status = 'FAILED';
            this.observableStackMaps.get(labId).next(this.stackMaps.get(labId));
        } else {
            console.log('Received message relating to a stack ID which is not registered, possibly old session. Disregarding ' + message);
        }

    }

    /**
     * Parses any stack success messages from the socket
     * @param message The Received Message
     */
    parseStackSuccessMessage(message) {
        let stackToUpdate = null;
        const labId = message.deployedLabId.toString();
        if (this.stackMaps.has(labId)) {
            if (this.stackMaps.get(labId).has(message.stackName)) {
                stackToUpdate = this.stackMaps.get(labId).get(message.stackName);
            } else {
                stackToUpdate = new DeployingLab();
                stackToUpdate.accountId = message.accountId;
                stackToUpdate.stackName = message.stackName;
                stackToUpdate.accountName = message.accountName;
                this.stackMaps.get(labId).set(message.stackName, stackToUpdate);
            }
            stackToUpdate.lastMessage = message.message;
            stackToUpdate.status = 'COMPLETED';
            this.observableStackMaps.get(labId).next(this.stackMaps.get(labId));
        } else {
            console.log('Received message relating to a stack ID which is not registered, possibly old session. Disregarding ' + message);
        }

    }

    /**
     * Parses any stack deployment messages from the socket
     * @param message The Received Message
     */
    parseStackDeploymentMessage(message) {
        let stackToUpdate = null;
        const labId = message.deployedLabId.toString();
        if (this.stackMaps.has(labId)) {
            if (this.stackMaps.get(labId).has(message.stackName)) {
                stackToUpdate = this.stackMaps.get(labId).get(message.stackName);
            } else {
                stackToUpdate = new DeployingLab();
                stackToUpdate.accountId = message.accountId;
                stackToUpdate.stackName = message.stackName;
                stackToUpdate.accountName = message.accountName;
                this.stackMaps.get(labId).set(message.stackName, stackToUpdate);
            }
            stackToUpdate.lastMessage = message.message;
            stackToUpdate.status = 'DEPLOYING';
            this.observableStackMaps.get(labId).next(this.stackMaps.get(labId));
        } else {
            console.log('Received message relating to a stack ID which is not registered, possibly old session. Disregarding ' + message);
        }
    }

    /**
     * Get the observable for receiving the finalisation message for a given lab id
     * @param id lab id
     */
    getStackFinaliseMessages(id: String) {
        return Observable.from(this.finaliseMessageStream).filter(x => x.deployedLabId.toString() === id.toString());
    }

    /**
     * Get the observable map containing the stacks for a given lab id
     * @param id lab id
     */
    getStackUpdatesObservableById(id: String) {
        if (this.observableStackMaps.has(id.toString())) {
            return this.observableStackMaps.get(id.toString()).asObservable();
        }
        return null;
    }

    /**
     * Registering the stack allows us to create placeholders
     * for the stack in the stackMap and its corresponding entry observableStackMap
     * @param id lab id
     */
    registerDeployingStack(id: String) {
        const labId = id.toString();
        this.observableStackMaps.set(labId, new BehaviorSubject(new Map<String, DeployingLab>()));
        this.stackMaps.set(labId, new Map<String, DeployingLab>());
    }

    /**
     * Adds a new member to the stack with lab id as the key and the created login data as the value.
     * @param data lab/student json data
     */
    createdUserEntryMethod(data) {
        this.createdStudentStackMaps.set(data.deployedLab.id.toString(), data.studentList);
    }

    /**
     * Sets the Deployed Lab for this service
     * @param deployedLab The Deployed Lab Object
     */
    deployedLabEntryMethod(deployedLab) {
        this.deployedLab = deployedLab;
    }

    /**
     * Gets the DeployedLab used by this service
     */
    getDeployedLab() {
        return this.deployedLab;
    }

    /**
     * Returns a boolean value based upon if the created student stack has a key value of the given parameter.
     * @param id lab id
     */
    isCredentialsAvailable(id: String) {
        return this.createdStudentStackMaps.has(id.toString());
    }

    /**
     * Returns the login username and password data for the corresponding deployed lab.
     * @param id lab id
     */
    getUserCredentialsBasedUponId(id: String) {

        let stackToReturn = null;

        if (this.createdStudentStackMaps.has(id.toString())) {
            stackToReturn = this.createdStudentStackMaps.get(id.toString());
            this.createdStudentStackMaps.delete(id.toString());
        }

        return stackToReturn;
    }
}
