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
- Firebase Firestore

<b>Devops</b>
 - Github Actions
 - Google Cloud Run
 - Docker


## Development server

### Pre-requisites

- Install and run Docker.
- Clone this repository `git clone git@github.com:KwamsC/kwamsc-website.git`.
- Log into firebase console.
- Copy `.env.example` to `.env` and update the environment variables with your firebase keys.

Before running the application type the below comands to install the dependencies in your terminal.

```sh
npm install
```

### Firestore Emulator

These steps assume that you have a properly configured Firebase project with running emulators. 

If you are using the hosting emulator, you will need to run firebase login.
Follow the instructions on CLI prompt to login. It will involve navigating to a website, authenticating to Google, and then redirecting to the firebase emulators. Your login token is stored in the .config directory, so you won't have to repeat this step every time you start the container.
It is recommended that you add .config to your .gitignore file if you haven't already.

The output of your folder (`server/seed`) should look simular to below:

```bash
├── firebase-export-metadata.json
└── firestore_export
    ├── all_namespaces
    │   └── all_kinds
    │       ├── all_namespaces_all_kinds.export_metadata
    │       ├── output-0
    │       └── ...
    └── firestore_export.overall_export_metadata
```

### Start the application

To start the application, execute the command below.

```ssh
$ yarn docker:serve
```

Once the development server is started you should be able to reach the application by visiting [http://localhost:8080](http://localhost:8080).