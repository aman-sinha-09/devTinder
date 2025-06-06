# npm init -> To initialise the project (will get package.json)
# Create a src folder and create app.js in it

# npm i express -> It downloaded all the express code from internet + dependencies of express + dependencies of dependencies, & put it inside the node_modules folder

# ^(caret) -> project will auto-update to 4.x.x, if there comes any minor or patch change

# "express": "^4.21.2"
    - 4 -> major (major change -> now things will break & not will be backward compatible)
    - 21 -> minor (minor change/feature -> but still, it will be backward compatible)
    - 2 -> patch (small change, bugfix)

# Flow for start:-
- npm init -> To initialise the project
- Create a src folder and create app.js in it
- Install express (npm i express)
- Create a server:-
    const express = require('express');
    const app = express();
- Install Nodemon (npm i -g nodemon), and Add "start" & "dev" in package.json
- Create a config folder & create a database.js & install mongoose (npm i mongoose) library
- Now, connect your application to the database, before listening to the port
- Now, create a models folder & create user.js in it
    In models, we use mongoose only to create a userSchema (also, we use validator to add schema level validation)
- Now, create a middlewares folder and create auth.js in it.
- Now, create a routes folder & create multiple route.js in it (eg: auth.js)
    - const authRouter = express.Router();  -> To get started with express router, now we   will use authRouter.get() instead of app.get()
- Also, make a folder named as utils & create validation.js in it

# Dummy app.js code:-
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(3001, () => {
  console.log(`Example app listening on port ${port}`)
});


# Deployments:-
- We want to deploy our application onto some other machine. That machine is given to us by AWS. And that machine is a centralised place where our application is deployed & we can access that application from all across the world as that machine is connected to internet.

- Signup on AWS
- On AWS console, search for EC2 (virtual server in cloud)
- Give name of the machine, type of os you want to run your code on etc
- create a key-value pair (devTinder-secret) & download it.
- Launch a new instance 
- Now, machine will be getting ready
- Go to downloads folder in terminal & execute below command:-
- "chmod 400 <secret>.pem" -> Modifying the permission of my .pem file
- "ssh -i "devTinder-secret.pem" ubuntu@ec2-56-228-25-202.eu-north-1.compute.amazonaws.com" (Now, I am logged in to my ubuntu machine in terminal)

- Now, in your new machine, install node.js through curl command
- "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash"
- To logout from your machine, type "exit"
- nvm install v18.16.0
- Now, we need our code on my new system, which we will get from github
- So, just do "git clone <repo-url>" -> For both frontend & backend

- First deploy frontEnd project
- Go to vs-code devTinder-web & type "npm run build"
- "npm run build" -> It basically bundles up your project & create a "dist" folder. "dist" folder will contain all the necessary files for my frontEnd project. And, we will deploy this "dist" folder only
- Now, on our ubuntu machine also, we need to build the frontEnd project (npm run build). But before this, do "npm install" in the frontEnd project.

- Now, to deploy our frontEnd project, we need nginx as it gives us an http server (to host our frontEnd project)
- But first do "sudo apt update" -> to update system dependencies/packages -> in devTinder-web
- Now install nginx to our machine -> "sudo apt install nginx"
- "sudo systemctl start nginx", "sudo systemctl enable nginx" -> To start & enable nginx on our machine
- Now, copy code from dist(build files) folder to /var/www/html/ -> "sudo scp -r dist/* /var/www/html/"
- Now, we are ready to see our application liiiivvvveeeee.

- Now, go to your instance on AWS, copy the public IP, & our code should be running on that IP, but it is not running because AWS blocks all ports
- Nginx http web server is deployed on port 80, so, I need to expose/enable port 80 on our instance
- To enable port-80, go to security on AWS instance -> security group -> Now, we need to add a inbound rule to allow access to port-80

# Now, frontEnd is deployed using nginx http server & now, we can map this IP to some domain name, we want to give


# Deploy backend:
- Go to devTinder on ubuntu machine & run "npm install"