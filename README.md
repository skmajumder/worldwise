# WorldWise

This is an **_Ongoing_** React project that allows users to select a city they have visited and take notes about their trip. The project uses a real-time map and UI state management to enhance the user experience. In this project I use React, React Router, json-server, context API, memo, useMemo, useCallback, hooks, Reducer.

## Prerequisites

Before you begin, ensure you have the following prerequisites installed on your system:

- Node.js - Make sure to install [Node.js](https://nodejs.org/en), which includes npm (Node Package Manager)

## Getting Started

To start this project on your local machine, follow those steps.

#### 1. Clone the Repository

First, clone this repository from GitHub.

```
git clone https://github.com/skmajumder/worldwise.git
cd worldwise
```

#### 2. Open the project in a code editor.

If you use [VSCode](https://code.visualstudio.com/download), use this command to open this project in a new editor.

```
code worldwise
```

#### 3. Install Dependencies

Install the required dependencies for the project. Use this command to install dependencies.

```
npm install
```

## Run the project

After installing the dependencies, you need to follow some steps to run the project.

#### 1. Run the JSON Server.

[Json-server](https://www.npmjs.com/package/json-server) is a full fake REST API with zero coding in less than 30 seconds. In **_data_** folder/directory it has a source file **_cities.json_** for the json server. Now need to run the JSON Server. To run the JSON Server run the following command.

```
npm run server
```

After successfully running the JSON Server you will get a URL something like this: **_http://localhost:8000/cities_**.

#### 2. Run the project

Now you can run the project on development mode. For that you will need to run the following command.

```
npm run dev
```

After successfully running the command you will get a URL like this: **_http://localhost:5173_** URL can be different on the different machine. Copy and paste the following URL into your browser.

> Run the project on production mode (Optional)

You can also run the project on production with the following command.

```
npm run preview
```

After successfully running the JSON-server and the project, now you can see the project.

## Used packages & Tech

I use the following packages and Tech on the project. You can see the list of packages available on the project.

#### Packages

- [React](https://react.dev)
- [Json-server](https://www.npmjs.com/package/json-server)
- [React Router](https://reactrouter.com/en/main/start/tutorial)
- [React leaflet](https://www.npmjs.com/package/react-leaflet)
- [React Datepicker](https://www.npmjs.com/package/react-datepicker)
- [Eslint](https://eslint.org)
- [Firebase](https://www.npmjs.com/package/firebase)

#### Techs

- Vite
- Context API
- Memo
- useMemo
- useCallback
- Hooks
- Custom Hooks
- Reducer
- .env

## Live URL

Here is the live URL for the application. You can use the following URL to see the live project.

[Live Url](https://worldwise-94d6d.web.app/)
