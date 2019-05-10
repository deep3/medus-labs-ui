# Using the UI Locally

## Prerequisites 

* AWS Labs API running and configured with administrator permissions.
* [NPM](https://www.npmjs.com/)

# Install dependencies  

```bash
npm install
```

# Configure

The only configuration option for the UI is the URL for the API. This can be found in 
`/environments/environment.ts`

Modify the `apiUrl` accordingly.
``` 
    apiUrl: 'http://localhost:8080/api/',

```

# Using 

## Build 
```
ng build --prod
```

## Test

```bash
ng test --code-coverage
```

## Run

You can run the app locally by launching an built in webserver, this should launch the application on `http://localhost:4200`

```bash
ng serve 
```


## Docker

For deployment you can package the UI into a docker container complete with nginx as a web
server.g

```bash
ng build --prod
docker image build -t medus-labs-ui .
```

Once successfully built and compiled into a docker image you can create the container with the following

```bash
docker run -d -p 80:80 medus-labs-ui
```

The application should now be running on `http://localhost/`

