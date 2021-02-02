# Anywhere-Fitness
## End-Points

| AUTH | URL                | Requires                                  | Restrictions | Returns                                                 |
|------|--------------------|-------------------------------------------|--------------|---------------------------------------------------------|
| POST | /api/auth/register | -username<br>-email<br>-password<br>-role | None         | Newly created user with <br>auto-generated userId       |
| POST | /api/auth/login    | -username<br>-password                    | None         | Logged in user data and <br>JWT token for authorization |


---


| Users  | URL                       | Requires                                                                        | Restrictions | Returns                                               |
|--------|---------------------------|---------------------------------------------------------------------------------|--------------|-------------------------------------------------------|
| GET    | /api/users/               | N/A                                                                             | -Valid Token | Object Array of all Users<br>(instructors & students) |
| GET    | /api/users/:id            | N/A                                                                             | -Valid Token | Individual user object                                |
| GET    | /api/users/:id/classes    | N/A                                                                             | -Valid Token | Object array of a user's <br>enrolled classes         |
| PUT    | /api/users/:id            | -Any of the<br><br>keys (ex. username)                                          | -Valid Token | Single object of updated user's<br>data               |
| DELETE | /api/users/:id            | N/A                                                                             | -Valid Token | Deleted user                                          |
| POST   | /api/users/enrollment     | -The classID of the class<br>the currently logged in user<br>wants to enroll in | -Valid Token | Success/Error message                                 |
| DELETE | /api/users/enrollment/:id | N/A                                                                             | -Valid Token | Success/Error message                                 |