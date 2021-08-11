
const request = require('supertest')
const app = require('./app')

test('GET image status 200', (done) => {
  request(app)
      .get('/home')
      .expect(200)
  done()

});

test('POST image status 200', (done) => {
  request(app)
      .get('/api')
      .expect(200)
  done()

});
