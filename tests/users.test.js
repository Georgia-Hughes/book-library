const mongoose = require('mongoose');
const User = require('../src/models/userModel');

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
          secondName: 'Hughes',
          email: 'georgiahughes05@gmail.com',
          password: 'password',
        })
        .end((error, res) => {
          expect(error).to.equal(null);

          expect(res.status).to.equal(201);

          User.findById(res.body._id, (err, user) => {
            expect(err).to.equal(null);
            expect(user.firstName).to.equal('Georgia');
            expect(user.secondName).to.equal('Hughes');
            expect(user.email).to.equal('georgiahughes05@gmail.com');
            expect(user.password).to.not.equal('password');
            expect(user.password.length).to.equal(60);
            expect(res.body).not.to.have.property('password');
            done();
          });
        });
    });
  });
  it('checks email address', (done) => {
    chai.request(server)
      .post('/users')
      .send({
        firstName: 'Georgia',
        secondName: 'Hughes',
        email: 'georgiahughes05gmail.com',
        password: 'password',
      })
      .end((error, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors.email).to.equal('please enter a valid email address');
        done();
      });
  });
  it('checks the password is 8 characters long', (done) => {
    chai.request(server)
      .post('/users')
      .send({
        firstName: 'Georgia',
        secondName: 'Hughes',
        email: 'georgiahughes05@gmail.com',
        password: 'pass',
      })
      .end((error, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors.password).to.equal('please enter a valid password');
        done();
      });
  });
});
