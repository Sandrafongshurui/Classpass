# Classpass

CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Features
 * Challenges
 * Techniques/Frameworks
 * Future Features

---------------------
 Introduction:
 This is a class booking application inspired by Classpass website. It allows users to book classes at studios with credits. It is a application for multiple companies/studios to reach out to a wider range of audience, all within one application.

 Application Usage
 
 1) Users are able to log in and create an account for themself, with this account, they can proceed to booking the different classes.

 2)Without logging in you are still able to browse the studios and the classes, however you are unable to see the credits of that particular class and also unable to proceed further to book the classes.

 3) Information about each studio/class can be found at their info page alow with reviews submitted by people who attented the classes.

 4) Each booked class will deduct the credits from your account, your bookes callses will be reflected in the you upcoming tab.

 5) You are able to cancel the classes as well, and credits will be refunded to your account

 5) Once a class is over, it will appear in your history tab, where you are able to levae a review, this review will appear in the studios info page.

 6) You may also edit your profile(name, email, etc) at your profile tab.

---------------------
Features

1) Features the different RESTful routes
-Index route to GET the multiple studios
-Create route to show forms for sign ups and reviews
-Show rout to show a particular studio and also the reviews
-Edit route to edit profile of user
-Update routs to update the credits and classes booked for the user and the studios
-Delete route to cancel the classes from users account

2) Specific redirection for users after they log in, bringing them back to the page they were previously.


---------------------
Challenges
1) Getting data from my client side to the server side

2) EJS syntax errors

3) Familiarising with the process of frontend validation and backend validation.

4) Editing my schema multiple times

5) Deciding when to use frontend or backend for my function.

---------------------
Techniques/Framework

1) Used bootstrap and bootstrap.bundle and MDB Ui kit

2) MongoDB and mongoose for server side.

3)bcrypt to hash passwords

4) JavaScript

5) Express and node.js runtime environment

6) JOI library for frontend validation

7) Heroku deploment

---------------------
Future Features

1) Account login for the studios side, to create the studio and classes.

2) Feature to purchase credits if credits are insufficient

3) To show the lessons details when user filter by classes

4) Search Bar to serach for studios and classes 
