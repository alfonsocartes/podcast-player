# Frontend Engineer Practical Test Case

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run the application in production mode, run the following commands:

```bash
npm run build
npm run start
# or
yarn build
yarn start
# or
pnpm build
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Frontend Engineer Practical Test Case Requirements

### Asset Optimization

For the following requirement: 
**"The application must have a development mode where the assets are served without minimizing (they can be concatenated if desired) and another production mode where the assets must be served concatenated and minimized."**

The application is configured to serve the assets concatenated and minimized in production mode and without minimizing in development mode.


### Caching

For the following requirement:

**"Once the list has been obtained from the external service for the first time, it should be stored in the client so that it is only requested again if more than one day has passed since the last time it was requested."**

I opted to use Next.js gerServerSideProps and a Cache-Control header to cache the data on the client so that it's only requested again if more than one day has passed since the last time it was requested.

For better optimization I could have used Next.js Incremental Static Regeneration to cache the data and pre-render the HTML on both the server and the client, and only update it when the data changes and a request is made to revalidate the data.

## Deployment on Vercel

The prokect is deployed on Vercel. You can access it [here]().