### nonoGrid -- Frontend

This is the frontend for the nonoGrid project (#4)

- ReactJS
- Passport

A nonoGrid is a puzzle game where the gamer must reconstruct an image
based on clues given in each row and column of a grid. "2 3" means in the row there are two groups, one of two blocks and another of three blocks that are separated by at least one block.
https://en.wikipedia.org/wiki/Nonogram

## User Stories

- User is presented with a welcome page
- User can sign-up or sign-in
- Onced signed-in a user can select a nonoGrid puzzle to play
- User can use mouse to click on a square to cycle through filled-in, empty, unknown states
- Right click cycles in opposite direction
- User can hold and move to change state of multiple squares.
- ...


Based off:
- https://github.com/GoThinkster/react-redux-realworld-example-app
- https://github.com/gothinkster/node-express-realworld-example-app
- https://facebook.github.io/react/tutorial/tutorial.html

Backend:
- https://github.com/dmozzoni/nono-back


Three models:

- User
```
var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  bio: String,
  image: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  hash: String,
  salt: String
}, {timestamps: true});
```

- Article
```
var ArticleSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  description: String,
  body: String,
  solution: [{ type: Number }],
  solutionWidth: {type: Number, default: 0},
  solutionHeight: {type: Number, default: 0},
  favoritesCount: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tagList: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});
```

- Comment
```
var CommentSchema = new mongoose.Schema({
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }
}, {timestamps: true});
```

