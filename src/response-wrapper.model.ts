
import { UserAccounts } from './app/data-models/user-accounts.model';
import { DeployedLabActivity} from './app/data-models/active-lab-activity.model';
import { LabBuilderServices } from './app/data-models/lab-builder-services.model';
import { WebSocketModel } from './app/data-models/web-socket.model';

export class ResponseWrapper<T>  {
    data: T;
}
