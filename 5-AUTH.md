# In an TCP/IP protocol, user make the API call to server, then, it gets back the response from the server & then the connection is closed. So whenever, user is making any request to server, the user needs to be validated. (i.e if the user is valid or not)

# Whenever user do login, server creates a JWT token, wrap it inside COOKIE & send the COOKIE back to the user in response. Now, the browser will store that COOKIE. Now, whenever the user makes any API call, he will send this COOKIE also attached with it (basically, it is job of browser to send the COOKIE in every API call, we don't need to do it ourselves). And the server will validate this COOKIE on every request.

# To read the cookie, we need to install cookie-parser

# In jwt.sign(), I am hiding user id inside JWT token, and I am passing a password/secret-key also, which only server know. 

# We can expire JWT & COOKIES both. Also, in userAuth, I am attaching user in req.user

# Schema Methods:
- We can explode the logic for generating a JWT token in userSchema. Since this is closely related to users. (Here, we are using "this")
- validatePassword -> to validate password

# const authRouter = express.Router();  -> To get started with express router, now we will use authRouter.get() instead of app.get()

# For logout, just set the cookie token to null & expire the cookie right there.

# whenever, we are writing schema method or using "pre", use normal function & not arrow function.

# the search query in mongoDb will become much more faster, if we do indexing on Schema(model), just by doing  index: true or unique: true

# compound indexing
- Now, the search query, ConnectionRequest.findOne({fromUserId: iofjwiof, toUserId: kmgiojoi})  -> will be very much fast
- connectionRequestSchema.index({fromUserId: 1, toUserId: 1});  -> 1 means in ascending order & -1 means in descending order 
- userSchema.index({firstName: 1});

# POST -> Always think that the user can put some malicious data into our database. So, check each & every thing before writing .save()

# GET -> Always make sure that the loggedIn user is a verified user. And the data that he is asking for, he is allowed to see that data or not

# find() -> returns an array 
# findOne() -> returns an object

# ref & populate:-
# We use ref (reference) to refer to that particular collection. In our code, fromUserId is referring to user collection. So, I can use populate on fromUserId to get the user collection.
# .populate("fromUserId", ["firstName", "lastName"]) -> if not mentioned, then, it will pass all the details, which we should not do
# .populate("fromUserId", "firstName lastName age gender about skills");  -> use in strings

# To get all connections of Atul:-
    Aman -> Atul
    Atul -> Ayush
    So, to get all connections of Atul, Atul can be fromUser, toUser, and the status should be "accepted"

# we can't directly compare two mongoDb object id by using ===. First convert it into string, then compare.
- row.fromUserId._id.toString() === loggedInUser._id.toString()

# Feed API Logic:-
- user should see all the user cards except:
    - his own card
    - his connections
    - to one, to whom I have sent connection request to
    - to one, whom I have received

# We can chain the populate, select etc.

# Pagination:-
- /feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)
- /feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)
- /feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)



