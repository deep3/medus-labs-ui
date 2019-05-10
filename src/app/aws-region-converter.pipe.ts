import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
@Pipe({ name: 'region' })
export class AwsRegionConverter implements PipeTransform {

    private regions = new Map<string, string>([
        [ 'us-east-1', 'US East (N. Virginia)'],
        [ 'us-east-2', 'US East (Ohio)'],
        [ 'us-west-1', 'US West (N. California)'],
        [ 'us-west-2', 'US West (Oregon)'],
        [ 'ca-central-1', 'Canada (Central)'],
        [ 'eu-central-1', 'EU (Frankfurt)'],
        [ 'eu-west-1', 'EU (Ireland)'],
        [ 'eu-west-2', 'EU (London)'],
        [ 'eu-west-3', 'EU (Paris)'],
        [ 'ap-northeast-1', 'Asia Pacific (Tokyo)'],
        [ 'ap-northeast-2', 'Asia Pacific (Seoul)'],
        [ 'ap-northeast-3', 'Asia Pacific (Osaka-Local)'],
        [ 'ap-southeast-1', 'Asia Pacific (Singapore)'],
        [ 'ap-southeast-2', 'Asia Pacific (Sydney)'],
        [ 'ap-south-1', 'Asia Pacific (Mumbai)'],
        [ 'sa-east-1', 'South America (São Paulo)']
    ]);

    transform(region: string): string {
        let convertedRegion = region;
        this.regions.forEach((value, key) => {
            if (region === key) {
                convertedRegion = value;
            } else if (region === value) {
                convertedRegion = key;
            }
        });
        return convertedRegion;
    }
}
