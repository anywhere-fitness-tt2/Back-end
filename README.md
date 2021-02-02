# Anywhere-Fitness
## End-Points

| AUTH | URL                | Requires                                  | Restrictions | Returns                                                 |
|------|--------------------|-------------------------------------------|--------------|---------------------------------------------------------|
| POST | /api/auth/register | -username<br>-email<br>-password<br>-role | None         | Newly created user with <br>auto-generated userId       |
| POST | /api/auth/login    | -username<br>-password                    | None         | Logged in user data and <br>JWT token for authorization |


---
