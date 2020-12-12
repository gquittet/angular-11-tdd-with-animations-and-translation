# MyApp (Angular 11 update)

## Goal

The goal of this project is to update my Angular knowledge.

So, I used translations, validation, TDD, Server Side Rendering, Services and Shared Modules to build a numeric field.

## How I've made this project

1. Install the Angular CLI

- Open your terminal and type

  ```shell
  npm install -g @angular/cli
  ```

- Generate the application

  ```shell
  ng new my-app
  ```

2. If you use `NVM`

- Create a `.nvmrc` file at the root of the project

  ```shell
  node --version > .nvmrc
  ```

3. Switch the project to ESLint

- Install the eslint schematics

  ```shell
  ng add @angular-eslint/schematics
  ```

- Convert the tslint configuration to an eslint compliant

  ```shell
  ng generate @angular-eslint/schematics:convert-tslint-to-eslint my-app
  ```

- Remove the tslint.json configuration

  ```shell
  rm tslint.json
  ```

4. Install Prettier

- Install the required dependencies

  ```shell
  npm install -D prettier eslint-config-prettier
  ```

- Create prettier configuration file

  ```shell
  echo {} > .prettierrc.json
  ```

- Create prettier ignore file

  ```shell
  touch .prettierignore
  ```

  Its content looks like your `.gitignore`. For me, it's:

  ```
  dist
  node_modules
  ```

- Extends `.eslintrc.json` configuration

  ```json5
  {
    // ...
    extends: [
      "plugin:@angular-eslint/ng-cli-compat",
      "plugin:@angular-eslint/ng-cli-compat--formatting-add-on",
      "plugin:@angular-eslint/template/process-inline-templates",
    ],
    // ...
  }
  ```

  will become

  ```json5
  {
    // ...
    extends: [
      "plugin:@angular-eslint/ng-cli-compat",
      "plugin:@angular-eslint/ng-cli-compat--formatting-add-on",
      "plugin:@angular-eslint/template/process-inline-templates",
      "prettier",
      "prettier/@typescript-eslint",
    ],
    // ...
  }
  ```

- Use `husky` and `pretty-quick` to format on VSC stage.

  ```shell
  npm install --save-dev pretty-quick husky
  ```

- Add the husky configuration inside the `package.json`

  ```json5
  {
    // ...
    husky: {
      hooks: {
        "pre-commit": "pretty-quick --staged",
      },
    },
  }
  ```

- Add prettier for linting and to format your files in `package.json`

  ```json5
  {
    // ...
    scripts: {
      // ...
      lint: "ng lint && prettier --check .",
      // ...
      format: "prettier --write .",
    },
    // ...
  }
  ```

5. Setup `i18n`

Here I'm using [ngx-translate](https://github.com/ngx-translate/core) instead of the
official [`i18n`](https://angular.io/guide/i18n) because this library can change the language of the application on the
fly and use the JSON format. Plus, Ionic and other big frameworks use this library to translate Angular web apps. So it
worth it to learn it instead of the official one.

If you need to learn more about the differences between these two ones, check out:
[https://github.com/ngx-translate/core/issues/495](https://github.com/ngx-translate/core/issues/495)

- Install ngx-translate

  ```shell
  npm install @ngx-translate/core --save
  ```

- Install the loader to load translations

  ```shell
  npm install @ngx-translate/http-loader --save
  ```

- Set up a shared module to load translations and to use the `translate` pipe in each component:

  ```shell
  mkdir -p src/app/shared
  touch shared.module.ts
  ```

- Put the following content in it:

  ```typescript
  import { NgModule } from "@angular/core";

  import { HttpClient } from "@angular/common/http";
  import { CommonModule } from "@angular/common";
  import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
  import { TranslateHttpLoader } from "@ngx-translate/http-loader";

  export const createTranslateLoader = (http: HttpClient) =>
    new TranslateHttpLoader(http, "./assets/i18n/", ".json");

  @NgModule({
    imports: [
      CommonModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      }),
    ],
    exports: [CommonModule, TranslateModule],
  })
  export class SharedModule {}
  ```

- Create your `JSON` translation files in `src/assets/i18n`

  Example: you can create a `fr.json` or `en.json`

- Now you can import your SharedModule in each module of your application.

6. TDD

- Introduction

  To make TDD, we'll use Karma with Jasmine that are built-in with Angular. We have to add another library to test our
  translations in our components unit tests.

- Installation

  ```
  npm install -D ngx-translate-testing
  ```

- Setup configuration file of our unit test aka `tsconfig.spec.json`

  Add the type node the `types` section to use node function like `require`

  ```json5
  {
    // ...
    compilerOptions: {
      outDir: "./out-tsc/spec",
      types: ["jasmine"],
    },
    // ...
  }
  ```

  will become

  ```json5
  {
    // ...
    compilerOptions: {
      outDir: "./out-tsc/spec",
      types: ["jasmine", "node"],
    },
    // ...
  }
  ```

- Now to use it in a test file aka `*.spec.ts`, you can check
  out: `src/app/components/numeric-field/numeric-field.component.spec.ts` with the `TestBed.configureTestingModule`

7. Server Side Rendering

- Install the required dependencies

  ```shell
  ng add @nguniversal/express-engine
  ```

- Now you can launch your Angular app with:

  ```shell
  npm run dev:ssr
  ```

- Check out: [https://angular.io/guide/universal](https://angular.io/guide/universal) for more information.

## Angular Information's

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.3.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag
for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
