# while using mongoose function, Always use async-await. Because mongoose functions returns a promise.

# when we are sending data from req.body (from postman), we were unable to read that json data (getting undefined). To read that data (i.e, to convert that data from json to js object), we need a middleware "express.json()"

# In findByIdAndUpdate, we can pass options, like "runValidators: true", to validate data again before updating it. Otherwise, if we are updating the data, then, the validator function will not run by default. It only runs when a new object is created.

# Any other key, that is not present in the schema, will not be saved in the database

# Two types of validations are there:-
1. Schema level Validations
2. API level Validations

# Once we have encrypted the password, we can't get plain text back.

# For some functions/methods, which is very specific to the user model, we can directly write those methods in the user model (eg:- validatePassword()), & then we can call this function whereever needed in the API.
