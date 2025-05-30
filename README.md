# DevTinder

- create a vite + react project
- remove unesessary code and create a Hello World app
- install tailwind css
- install daisy ui
- add navbat component ot App.jsx
- create a NavBar.jsx separate component file
- install package react-router-dom for routing
- create browser router > routes > route = / body > route children
- create an outlet in body component
- create a footer

- Lec:2

- create a login page
- install axios
- install cors in backend, add as middleware to app with configurations : origin and credentials: true
- while making api call from frontend, pass withcredentials: true
- install react-redux  + @reduxjs/toolkit
- install  => configure store => add Provider => createSlice => add Reducer to store
- add redux dev tools in chrome
- Login and check if data is comingproperly in the store
- Navbar should update as soon as user logs in
- Refactor out code to add cosnstants file + create a components folder

- You should not be able to access other routes without login
- If token is not present, redirect the user to login page
- Logout
- get the feed and add the feed in the store
- build the user card on feed
- build the profile edit feature
- show toast message on save of profile
- See all my connections
- New page to see all my connections
- New page to see all my connection requests
- Feature: accept/reject connection request
- Send/ignore user from feed
- Signup new user
- E2E testing

Body
    NavBar
    Route = / => feed
    Route = /login => Login
    Route = /connections => Connections
    Route = /profile => Profile


# Deployment

- Signup on AWS
- Launch ec2 instance
- Create a key-value pair
- try to login though ssh
- chmod 400 <secret>.pem
- connected to ubuntu machine using ssh command: ssh -i "devTinder-secret.pem" ubuntu@ec2-13-51-233-21.eu-north-1.compute.amazonaws.com
- install Node on ubuntu(the same version we used during our local development)
- git clone both backend and frontend repos
- Frontend
    - npm install (to install the depedencies)
    - npm run build (generates a dist folder)
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy code from dist folder(build files) to nginx http server (located at: /var/www/html/)
    - sudo scp -r dist/* /var/www/html/
    - get the public ipv4 and enable port 80 of your instance