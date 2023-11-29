# NGRX
--------
* ###### A state management pattern and library for Angular.
    
## Installation
--------
```sh
npm i @ngxs/store
npm i @ngxs/devtools-plugin [To enable Redux devtool plugin]
npm i @ngxs/logger-plugin [Logger plugin for NGXS,Good for debugging]
```

#### Import NGXS Modules in AppModule
     
* Import installed NGXS modules

    > import { NgxsModule } from '@ngxs/store'<br />
    > import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';<br />
    > import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';<br />

- Import in NgModule's imports array

    >  imports: [<br />
    >    NgxsModule.forRoot([<State 1>,<State 2>,<State 3>,...,<State N>]),<br />
    >    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),<br />
    >    NgxsLoggerPluginModule.forRoot({ disabled: true }),<br />
    >  ],<br />

## Usage of NGXS
--------
##### Folder Structure and File Name Conventions:

* It is recommended to create a separate directory per module to store module-specific state management code / data (i.e directory name with ‘state’ at each module’s root)
    *  This will make code easy to understand and to find/navigate to the state management code of each module, it avoids conflicts with angular files
* Create an index.ts file within each 'state' directory where all state management related Actions, Models, and States are exported, this will avoid the tedious work of importing multiple files in the import section of the component
* Make sure that the state management file name should be based on its purpose(i.e file name with '<[Module].model.ts>' should have only models/interfaces), This will make it much easy to navigate and debug
* We need to create the below files for state management per module:
    > index.ts  <br />
    > [Module].model.ts<br />
    > [Module].action.ts<br />
    > [Module].state.ts<br />

##### Create an interface for the state
* Create a file with <[Module].model.ts>

    > export interface [Name] { //ProductDTO<br />
    > <Property 1\>: \<data-type\>, <br />
    > <Property 2\>: \<data-type\>,<br />
    >}<br />
 
##### Create a List of Actions
* Create a file with <[Module].action.ts>

    >  export class [[Action 1]] { // i.e AddProduct <br />
    >    static readonly type = "[[Module / Page name]] [[Brief Action Name]]" // i.e "[Product] Add Product"<br />
    >    constructor(payload:<interface> | any) { }<br />
    >  }

##### Create a State:
- Create a file with <[Module].state.ts> and declare state 

    > @State[[interface / schema of state]]({<br />
    >  name: [[property name]], //the name of property to access in/from state<br />
    >  defaults: [] // default value of property / state for initialization, <br />
    >})<br />

##### Create Action Handler
* In a <[Module].state.ts> file, Declare a class to Handle Actions

    > export class [StateName]State{ // i.e ProductState<br />
    > @Action([[Action from <[[Module]].action.ts> file]])<br />
    >   functionName(ctx: StateContext<[[State Schema]]>, {payload}: any) {<br />
    >       // Add a logic for State change as per action <br />
    >       // ctx.getState ||  ctx.setState || ctx.patchState<br />
    >    }<br />
    >   }<br />

##### Register State in Module
- Add States in an array of object form
     >  NgxsModule.forRoot([[StateName]State,...,N]),<br />

##### Dispatch Action
- Dispatch action by calling defined action
    > this.store.dispatch(new [[Action from <[Module].action.ts> file]])<br />

## Run the Application
-----
## Done
