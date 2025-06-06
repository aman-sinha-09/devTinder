# Routes:-

1. /test will respond to /test/*  and  / will respond to /*  (But order of routes matters, i.e the code will check from first route, that if it matches or not?) 

<!-- this will only handle GET call to /user -->
app.get("/user", (req, res) => {
  res.send({ firstName: "Aman", lastName: "Anand" });
});

<!-- this will match all HTTP method API call to /test (i.e GET, POST, PUT etc) -->
app.use("/test", (req, res) => {
  res.send("test route");
});

2. "/ab?c"  -> now, /abc and /ac both works (since "b" is optional here)
3. "/ab+c"  -> now, we can add as many "b", we want (i.e /abc, /abbbbbc)
4. "/ab*cd" -> now, it will work for, start should be "ab" and end should be "cd" (eg: /abAMANcd) (also, it is not case-sensitive, i.e "a" & "A" are same)
5. "/a(bc)?d" -> i.e "bc" is optional (eg: /abcd, /ad will work)
6. "/a(bc)+d" -> i.e it will work for /abcd, /abcbcbcbcd
7. /a/  -> This is regex (i.e, it will work for all string having letter "a", eg: cab)

<!-- req.query -->
# http://localhost:3000/user?userId=101&password=testing 

  app.get("/user", (req, res) => {
  console.log(req.query);                                 // { userID: '101', password: 'testing' }
  res.send({ firstName: "Aman", lastName: "Anand" });
});

<!-- req.params -->
# http://localhost:3000/user/101/Aman Anand

  app.get("/user/:userID/:userName", (req, res) => {
  console.log(req.params);                                // { userID: '101', userName: 'Aman Anand' }
  res.send({ firstName: "Aman", lastName: "Anand" });
}); 

# If we donot send any response back from "Route handler", our postman keep on sending request. And, after a time, it times out.

# one route can have multiple Route handlers. & if we donot send any response back from 1st handler, then using next(), it will go to second route handler. If we haven't used next(), it will not go to second route handler. Also, if we send back response from 1st route handler only, then, it will not be able to send response from 2nd route handler & vice versa, even if we use next(). as, we can not set headers after they are sent to the client.

# i.e, express tells that, you can make as many route handlers you want, but at the end, you should send some response back. Otherwise, postman will keep on sending request. 

# Code:-
app.use(
  "/user",
  (req, res, next) => {
    // Route handler
    console.log("first route handler");
    next();
  },
  (req, res, next) => {
    console.log("second route handler");
    next();
  },
  (req, res, next) => {
    console.log("third route handler");
    res.send("sending from third route handler");
  }
);

# we can add multiple route handlers inside an array also
app.use("/user", [R1, R2, R3, R4, R5])    or    app.use("/user", [R1, R2], R3, R4, R5)

# Below code give an error in postman, as there is no route handler for path "/user"
app.use("/user", (req, res, next) => {
  // Route handler
  console.log("first route handler");
  next();
});

# we can also do like below:-
app.use("/user", (req, res, next) => {
  next();
});

app.use("/user", (req, res, next) => {
  res.send("meoe");
});..

# whenever we call any route/endpoint/API in express, it goes through chain of "middlewares" till the time, it gets an request/route/response handler, which actually sends some response back.

# we need middlewares, to check authenticity, & always use it in a clean code manner.

# res.send("Data sent successfully") -> it is "200 status code" by default.

# Generally, we use app.use(), for writing middlewares.

# For error handling, always write code in try & catch block, but another way to handle unexpected error is like:-
app.get("/user", (req, res) => {
  throw new Error("my error");
  res.send("getting response");    // this line will not get executed, as we got an error.
});

<!-- keep below code towards the end of your application -->
app.use("/", (err, req, res, next) => {
  if (err) {
    // Log your errors
    res.status(500).send("something went wrong");
  }
});
res.send(")
# Route handler is the function, which is actually sending the response back. All other's middle functions are known as Middlewares.

# 2 ways to send back response:-
# First:-
try{
  // Also, if there is any error (like, if user already exists), use below. Then, it will directly go to catch block 
   if (user) {
      throw new Error("User already exists");
    }
  res.json({
      message: "Data fetched successfully",
      data: connectionRequest,
    });
}
catch(err){
  res.status(400).json({
      message: "Error: " + err.message,
    });
}

# Second:-
try{
  res.send(user);
}
catch(err){
  res.status(400).send("ERROR: " + err.message);
}