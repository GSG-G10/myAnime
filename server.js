const express = require('express');
const path = require('path');
const app = express();
const routerHome = require('./src/app');

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routerHome);

app.use((req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname, 'public', '404.html'));
});

app.use((req, res) => {
  res.status(500);
  res.sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(app.get('port'), () => {
  console.log(`run to>> http://localhost:${app.get('port')}`);
});
