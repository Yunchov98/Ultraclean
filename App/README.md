# App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.1.

## This project is not 100% ready yet it is still a work in progress.

Admin view and user view will be made to change dynamically depending on whether admin profile is logged in or user. Also there are pages that currently do not have dynamic content loading, it will be developed soon. For the moment there is no login and registration funcionality. This is the next step after dynamic data loading along with authentication and authorization. You can create services and see them dynamically on the screen without being logged in, which will be fixed soon. You can also complete a job application survey via the user view and you can view job applications via the admin view.

## For Admin View

Go in core/header/header.component.html and write <app-admin-header />

## For User View

Go in core/header/header.component.html and write <app-user-header />

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
