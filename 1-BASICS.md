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
