# A Svelte Starter Boilerplate

Svelte boilerplate - inspired by [Hackathon Starter](https://hackathon-starter.walcony.com)

Koa API repo can be found here [koa-api](https://github.com/mylastore/koa-api)


## Included 

- Used [svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router) for handling routes 
- [Parcel](https://parceljs.org/) bundling done with the cero configuration 
- [Bulma CSS](https://bulma.io/)
- Testing with [Jest](https://jestjs.io/) (with Snapshot support) and  [Wallaby](https://wallabyjs.com/)
- Formatting with ESLint and Prettier
- Transpiling with Babel
- User authentication with JWT token
- User profile page with [gravatar](https://en.gravatar.com/) if availabe else adds a defautl image
- User forgot password
- User roles (customer, admin etc)
- Admin panel section
- Email notifications settings page
- Pagination inspired by [svelte-paginate](https://github.com/TahaSh/svelte-paginate#readme)
- Contact forms with [Nodemailer](https://nodemailer.com/about/) on the server side and [Sendgrid](https://sendgrid.com/)


## Getting started

    https://github.com/mylastore/svelte-boilerplate

    npm install && npm start

Now head over to your favourite browser and open up `localhost:1234` and you are ready to go

IMPORTANT! Start the API section and follow the instrcutions for that icluding on how to seed the sample data

Login as amind me@me.com and Password#1 to see the amid sample data

Login as customer me1@me.com Password#1


## Build

To build the project run the following:

    npm run build

Upload all the files inside the "dist" folder to your hosting provider ( May varry depending on your hosting )

## Tests

_NOTE: Current open issue in jest-transform-svelte when adding preprocessor tests get stuck in an infinite loop (works in Wallaby though), [Current issue](https://github.com/rspieker/jest-transform-svelte/issues/12_)

I prefer running my tests using Wallaby, but if you prefer plain old command line, just type the following to run your tests:

    npm t

## Linting

You may just check for linting or auto fix using these two options

    npm run lint
    npm run lint:fix

## Home Page
![](https://i.imgur.com/3wVdJZE.jpg)    

## Login
![](https://i.imgur.com/N4Jgn2N.jpg)

## Forgot Password
![](https://i.imgur.com/PbjA4Sr.jpg)

## User Profile
![](https://i.imgur.com/pTKFMWz.jpg)
![](https://i.imgur.com/dP7FMia.jpg)

## Admin Panel
![](https://i.imgur.com/tRW0JQ2.png)
