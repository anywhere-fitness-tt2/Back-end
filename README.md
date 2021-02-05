# Anywhere-Fitness

## Front-End:  
https://github.com/anywhere-fitness-tt2/Front-end  

## Deployed Site:  
https://anywhere-fitness-tt2.vercel.app/  
## Auth End-Points
## Base Url: https://af-api-tt2.herokuapp.com/ 
| AUTH | URL                | Requires                                  | Restrictions | Returns                                                 |
|------|--------------------|-------------------------------------------|--------------|---------------------------------------------------------|
| POST | /api/auth/register | -username<br>-email<br>-password<br>-role | None         | Newly created user with <br>auto-generated userId       |
| POST | /api/auth/login    | -username<br>-password                    | None         | Logged in user data and <br>JWT token for authorization |


---

## User End-Points
| Users  | URL                       | Requires                                                                        | Restrictions | Returns                                               |
|--------|---------------------------|---------------------------------------------------------------------------------|--------------|-------------------------------------------------------|
| GET    | /api/users/               | N/A                                                                             | -Valid Token | Object Array of all Users<br>(instructors & students) |
| GET    | /api/users/:id            | N/A                                                                             | -Valid Token | Individual user object                                |
| GET    | /api/users/:id/classes    | N/A                                                                             | -Valid Token | Object array of a user's <br>enrolled classes         |
| PUT    | /api/users/:id            | -Any of the<br><br>keys (ex. username)                                          | -Valid Token | Single object of updated user's<br>data               |
| DELETE | /api/users/:id            | N/A                                                                             | -Valid Token | Deleted user                                          |
| POST   | /api/users/enrollment     | -The classID of the class<br>the currently logged in user<br>wants to enroll in | -Valid Token | Success/Error message                                 |
| DELETE | /api/users/enrollment/:id | N/A                                                                             | -Valid Token | Success/Error message                                 |


---

# Class End-Points

| Classes | URL                          | Requires                                                                                                         | Restrictions                                                                          | Returns                                                         |
|---------|------------------------------|------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| GET     | /api/classes/                | N/A                                                                                                              | -Valid Token                                                                          | Object Array of all Classes                                     |
| GET     | /api/classes/:id             | N/A                                                                                                              | -Valid Token                                                                          | Individual class object                                         |
| GET     | /api/classes/:id/students    | N/A                                                                                                              | -Valid Token                                                                          | Object array of the currently<br>enrolled students in the class |
| GET     | /api/classes/:id/instructors | N/A                                                                                                              | -Valid Token                                                                          | Object array of the instructor(s)<br>for the class              |
| POST    | /api/classes/                | -name<br>-type<br>-time<br>-duration<br>-intensityLvl<br>-location<br>-attendees (integer)<br>-maxSize (integer) | -Valid Token<br>-Can only be used<br>when currently<br>logged in as an<br>instructor  | Single object of newly created<br>class                         |
| PUT     | /api/classes/:id             | -Appropriate keys <br>with changed values                                                                        | -Valid Token<br>-Can only be used<br>when currently<br>logged in as an<br>instructor  | Single object of updated class<br>data                          |
| DELETE  | /api/classes/:id             | N/A                                                                                                              | -Valid Token<br>-Can only be used<br>when currently <br>logged in as an<br>instructor | The deleted class                                               |
