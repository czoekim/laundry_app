# laundry_app

This project is the first prototype for a web application that will allow students to know the current status of the laundry rooms in their residence halls. This version consists of a login page and the main page where machine statuses are set to 'Available', 'In-use', or 'Broken' according its status in our database. It runs on a local host and can be manipulated by its user. We used Firebase Realtime Database service as our backend component and Cloud9 as our IDE. 

## Getting Started

We ran this program on Cloud9, which provided Node.js and its modules. Firebase and browserify must be installed in the IDE. We set up a Firebase console that provided a configuration code snippet, tying our JavaScript and HTML to our Firebase project. 

### Firebase & Browserify

Firebase provided the API for the authenication and database setup. In order for the Firebase modules to function in a browser, we used browserify to bundle our script.js code into bundle.js. 

### Install Firebase

To install Firebase:
```
npm install firebase --save
```
To install Firebase tools:
```
npm install -g firebase-tools
```
Initializing a new Firebase project directory:
```
firebase init
```
Select the services that you require (for this project, we chose Firebase Database). 

### Deployment

To begin the application on a localhost, we used the following command:
```
firebase serve -o $IP -p 8080
```
To close the open port, we used:
```
lsof -i tcp:8080

kill -9 PID# // PID# provided by previous command
```

## Acknowledgements 
- [Curtis Rodgers](https://codepen.io/crodg/pen/yNKxej) for HTML/CSS inspiration on the authentication page
- [W3Schools Template](https://www.w3schools.com/w3css/w3css_templates.asp) for HTML/CSS on the main page
- [JSFiddle](http://jsfiddle.net/nayztL4y/17/) for column/legend design on the main page
- Firebase for its services with the backend authenication and database API

