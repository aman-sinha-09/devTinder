# API Lists:

<!-- authRouter -->
- POST /signup
- POST /login
- POST /logout

<!-- profileRouter -->
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password   -> forgot password

<!-- connectionRequestRouter -->
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
# Merge above 2 API's  ->  POST /request/send/:status/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId
# Merge above 2 API's  -> POST /request/review/:status/:requestId

<!-- userRouter -->
- GET /user/requests/received
- GET /user/connections
- GET /user/feed  -> Gets you the profiles of other users on platform


Status: ignore, interested, accepted, rejected