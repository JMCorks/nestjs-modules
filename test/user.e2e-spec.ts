import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app;
  let createdUUID: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .end((err, res) => {
        expect(Array.isArray(res.body)).toBe(true);
        done();
      });
  });

  it('/user (Post)', (done) => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        email: 'emailtest@hotmail.com',
        password: 'testpassword'
      })
      .expect(201)
      .end((err, res) => {
        createdUUID = res.body.id;
        expect(createdUUID).toBeDefined();
        expect(res.body.email).toBe('emailtest@hotmail.com');
        done();
      });
  });

  it('/user/:id (Get)', (done) => {
    return request(app.getHttpServer())
      .get(`/user/${createdUUID}`)
      .expect(200)
      .end((err, res) => {
        expect(createdUUID).toBeDefined();
        expect(res.body.email).toBe('emailtest@hotmail.com');
        done();
      });
  });

  it('/user/:id (Put)', (done) => {
    return request(app.getHttpServer())
      .put(`/user/${createdUUID}`)
      .send({
        email: 'emailtestupdated@hotmail.com',
      })
      .expect(200)
      .end((err, res) => {
        expect(createdUUID).toBeDefined();
        expect(res.body.email).toBe('emailtestupdated@hotmail.com');
        done();
      });
  });

  it('/user/:id (Delete)', (done) => {
    return request(app.getHttpServer())
      .delete(`/user/${createdUUID}`)
      .expect(200)
      .end((err, res) => {
        expect(createdUUID).toBeDefined();
        expect(res.body.affected).toBe(1);
        done();
      });
  });
});
