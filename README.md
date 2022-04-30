# social-network-api

#### Social Network API is my first attempt at a node/express/mongo back end server.  It is set up as a social networking site where users can post thoughts and reactions to others' thoughts.

---

#### Collaborators:
*  [Brian Swartz](https://github.com/bdswartz)

---

## Installation
npm i 

---

## Usage
At this point, the application is an "endpoints only" application.  

---

## Technologies

> <b>Development Tools:</b>
* JavaScript
* [Express.js](https://www.npmjs.com/package/express)
* [MongoDB](https://www.mongodb.com/)
* node.js
* [Mongoose](https://mongoosejs.com/)

  ---

## User Story
### AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
    
### Acceptance Criteria for Minimum Viable Product

GIVEN a social network API
*  WHEN I enter the command to invoke the application
    THEN my server is started and the Mongoose models are synced to the MongoDB database
*  WHEN I open API GET routes in Insomnia for users and thoughts
    THEN the data for each of these routes is displayed in a formatted JSON
*  WHEN I test API POST, PUT, and DELETE routes in Insomnia
    THEN I am able to successfully create, update, and delete users and thoughts in my database
*  WHEN I test API POST and DELETE routes in Insomnia
    THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
 
---

## Features
-  The API contains all of the standard CRUD endpoints for users, thoughts (with a tie to the user that created the thought), and reactions.
-  As with all social sites, there is also an endpoint for the user to create a "friends" list using the user ID of the user they would like to "friend".

---

## Questions
Please visit my GitHub page
at https://github.com/bdswartz

If there are any questions about the project,
feel free to open an issue or contact me at briandswartz@outlook.com