# KwamsC App

This personal portfolio full stack application is made to enhance my developers skills. Frameworks, libraries and tooling are chosen due to their popularity, price and the features that are used in the industry.

<b>Frontend</b>
- VueJs
- Pinia State Management
- Vue Router
- Typescript
- TailwindCSS

<b>Backend</b>
- NodeJs
- Express
- Typescript
- Jest Unit Testing
- Docker
- Firebase


## Development server

Before running the application type the below comands to install the dependencies in your terminal.

```sh
npm install
```
Make sure that docker is installed

These steps assume that you have a properly configured Firebase project with running emulators. 
Fill the environment variables with your firebase API keys.
Add the firebase service account.

If you are using the hosting emulator, you will need to run firebase login.
Follow the instructions on CLI prompt to login. It will involve navigating to a website, authenticating to Google, and then redirecting to the firebase emulators. Your login token is stored in the .config directory, so you won't have to repeat this step every time you start the container.
It is recommended that you add .config to your .gitignore file if you haven't already.




### Firestore Emulator
