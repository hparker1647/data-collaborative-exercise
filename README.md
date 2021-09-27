# Near Earth Objects
This is an exercise undertaken by Holden Parker.
A simple application provides the user with the ability to query Near Earth Objects via Nasa's `neo/rest/v1/feed` API.

## Getting Started
This exercise was developed using NodeJS `v14.17.6`.

### Environment Variables
This project relies on two environment variables:
- `NASA_API_KEY`
- `PORT`

These environment variables can be set by providing a `.env` file in the root of the project directory.
For example:
```
NASA_API_KEY=yOuRkEyFrOmNaSa
PORT=1234
```

### Starting the Application
To install, build, and run this application, follow these commands:
- `npm ci`
- `npm run recycle`

You will know the service has started when you see the following message in the console:
```
Listening on port 1234
```

### Running the Application
Once the service has started, you can navigate to the application in a browser at: `http://<host>:<port>`.
Assuming this is running on your local machine and the `PORT` variable in the `.env` file is set to `1234`, the url will be `http://localhost:1234`.
