const mongoose = require('mongoose');
const User = require('../src/models/user');

describe('/users', () => {
  beforeEach((done) => {
    mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  describe('POST /users', () => {
    it('creates a new user', (done) => {
      chai.request(server)
        .post('/users')
        .send({
          firstName: 'Georgia',
          lastName: 'Hughes',
          email: 'georgiahughes05@gmail.com',
          password: 'password',
        })
        .end((error, res) => {
          expect(error).to.equal(null);
          expect(res.status).to.equal(201);

          User.findById(res.body._id, (err, user) => {
            expect(err).to.equal(null);
            expect(user.firstName).to.equal('Georgia');
            expect(user.lastName).to.equal('Hughes');
            expect(user.email).to.equal('georgiahughes05@gmail.com');
            expect(user.password).to.equal('password');
            done();
          });
        });
    });
  });
});
