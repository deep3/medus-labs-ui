export interface DeployedLabActivity {
    id: number;
    labType: string;
    description: string;
    startDateTime: Date;
    deployedLabStatus: string;
    isGeneratedDetailsAvailable: boolean;
}
