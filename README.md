# Tenant Complaints Portal

This app is a mock tenant complaints portal created by [Living Rent](https://www.livingrent.org/) to highlight Edinburgh city council's inaction in enforcing standards in the private rental sector.

## Usage

This app uses [Node.js](https://nodejs.org) and [React](https://react.dev/). To use this app, you must be running an instance of the [TenantAct API](https://github.com/gordonmaloney/tenantactAPI).

After cloning this repository, copy the `.env.example` to `.env` and set the environment variables.

```
# Should match the URL where the
# TenantAct API is running
# See: https://github.com/gordonmaloney/tenantactAPI
REACT_APP_API_URL=http://localhost:3000
```

Install dependencies.

```
npm install
```

Launch the site for local development.

```
npm run start
```

The site will be running at `http://localhost:5173` or a similar URL.
