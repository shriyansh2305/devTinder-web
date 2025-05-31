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
- Backend
    - whitelist the public ip of ec2 machine on mongo
    - installed pm2 globally (npm i pm2 -g)
    - pm2 start npm -- start or pm2 start npm --name "devTinder-backend" -- start
    - pm2 logs
    - pm2 flush <name of process>
    - pm2 list
    - pm2 stop <name of process>
    - pm2 delete <name of process>
    - config nginx- sudo nano /etc/nginx/sites-available/default
    - test nginx- sudo nginx -t
    - restart nginx- sudo systemctl reload nginx
    - Modify the BASE_URL in frontend project to "/api"


    Frontend = http://13.51.233.21/
    Backend = http://13.51.233.21:7777/

    Domain Name = devtinder.com => mapped to => 13.51.223.21

    Frontend = devtinder.com
    Backend = devtinder.com:7777 => mapped to => devtinder.com/api

    proxy pass in the nginx configuration

# nginx config: 

    server_name 13.51.233.21;
    location /api/ {
            proxy_pass http://localhost:7777/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
    }