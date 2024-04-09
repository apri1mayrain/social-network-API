# NoSQL: Social Network API
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://github.com/apri1mayrain/social-network-API/blob/main/LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-darkgreen?style=for-the-badge)](https://nodejs.org/en)
[![Express.js](https://img.shields.io/badge/Express.js-darkgreen?style=for-the-badge)](https://expressjs.com/)
[![Day.js](https://img.shields.io/badge/Day.js-orange?style=for-the-badge)](https://day.js.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-green?style=for-the-badge)](https://www.mongodb.com/docs/manual/)
[![Mongoose](https://img.shields.io/badge/Mongoose-darkred?style=for-the-badge)](https://mongoosejs.com/docs/guide.html)
[![Insomnia](https://img.shields.io/badge/Insomnia-purple?style=for-the-badge)](https://insomnia.rest/)

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Demo](#demo)
- [Credits](#credits)
- [License](#license)

## Description

API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

Please check out the demo video: [https://drive.google.com/file/d/1OJ0_jm9-cEMaab0AiOwf-xcmXtbvDWo6/view?usp=sharing](https://drive.google.com/file/d/1OJ0_jm9-cEMaab0AiOwf-xcmXtbvDWo6/view?usp=sharing)

### User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

### Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

### Models

* **User**
  * `username`
  * `email`
  * `thoughts`
  * `friends`

* **Thought**
  * `thoughtText`
  * `createdAt`
  * `username`
  * `reactions` (Array of nested documents created with the `reactionSchema`)
    * `reactionId`
    * `reactionBody`
    * `username`
    * `createdAt`

### API Routes

**`/api/users`**

* `GET` all users
* `GET` a single user by its `_id` and populated thought and friend data
* `POST` a new user
* `PUT` to update a user by its `_id`
* `DELETE` to remove user by its `_id`

**`/api/users/:userId/friends/:friendId`**

* `POST` to add a new friend to a user's friend list
* `DELETE` to remove a friend from a user's friend list

**`/api/thoughts`**

* `GET` to get all thoughts
* `GET` to get a single thought by its `_id`
* `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
* `PUT` to update a thought by its `_id`
* `DELETE` to remove a thought by its `_id`

**`/api/thoughts/:thoughtId/reactions`**

* `POST` to create a reaction stored in a single thought's `reactions` array field
* `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

## Features

* [Node.js](https://nodejs.org/en) to execute JavaScript in CLI or *outside* of web browser.
* [Express.js](https://expressjs.com/) to implement back-end web framework for routing, middleware, and API.
* [Day.js](https://day.js.org/) to format date timestamp.
* [MongoDB](https://www.mongodb.com/docs/manual/) is a popular document database to store application data.
* [Mongoose](https://mongoosejs.com/docs/guide.html) provides a schema-based solution to model the application data.
* [Insomnia](https://insomnia.rest/) to debug and test API.


## Installation

1. Download [Node.js](https://nodejs.org/en).
2. Download repo files by [cloning the repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository#cloning-a-repository) or [downloading the ZIP folder](https://github.com/apri1mayrain/social-network-API/archive/refs/heads/main.zip). If downloading ZIP folder, please be sure to extract the folder.
3. Open your preferred command line interface and navigate to the file directory containing the repo.
4. Install the NPMs with command: `npm install`
4. Seed the database: `npm run seed`
6. Start the app with command: `npm start`
7. To test API routes, install [Insomnia](https://insomnia.rest/).

## Demo

Demo video link: [https://drive.google.com/file/d/1OJ0_jm9-cEMaab0AiOwf-xcmXtbvDWo6/view?usp=sharing](https://drive.google.com/file/d/1OJ0_jm9-cEMaab0AiOwf-xcmXtbvDWo6/view?usp=sharing)

## Credits

* [SocialBee](https://socialbee.com/ai-post-generator/) to generate thought data.
* Researched Stack Overflow forums and other coding resources.

## License

MIT License - Copyright © 2024 apri1mayrain

[(Go back to top)](#nosql-social-network-api)