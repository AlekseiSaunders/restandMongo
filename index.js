const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
  {
    id: uuidv4(),
    username: 'Todd',
    comment: 'lol, that is so funny!',
  },
  {
    id: uuidv4(),
    username: 'Skyler',
    comment: 'I like to go birdwatching with my dog',
  },
  {
    id: uuidv4(),
    username: 'Sk8erBoi',
    comment: 'Plz delete your account, Todd!',
  },
  {
    id: uuidv4(),
    username: 'onlysayswoof',
    comment: 'woof, woof, woof',
  },
];

app.get('/comments', (req, res, next) => {
  res.render('./comments/index', { comments });
});

app.get('/comments/new', (req, res, next) => {
  res.render('./comments/new');
});

app.post('/comments', (req, res, next) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuidv4() });
  res.redirect('./comments');
});

app.get('/comments/:id', (req, res, next) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render('./comments/show', { comment });
});

app.patch('/comments/:id', (req, res, next) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  try {
    const foundComment = comments.find((c) => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
  } catch (e) {
    res.send('no comment with that id found');
    console.log(e);
  }
});

app.get('/comments/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render('./comments/edit', { comment });
});

app.delete('/comments/:id', (req, res, next) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect('/comments');
});

/* taco code below 
app.get('/tacos', (req, res, next) => {
  res.send('Get /tacos response');
});

app.post('/tacos', (req, res, next) => {
  const { meat, qty } = req.body;
  res.send(
    `Thanks for your order. Here are your ${qty} ${meat} tacos.`
  );
});
*/
app.listen(3000, () => {
  console.log('On Port 3000');
});
