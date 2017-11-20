# Stickers CRUD

##ERD(https://drive.google.com/file/d/1zyb8hJfgdqhMfVN0zx1xBXLFCsJtCsPH/view?usp=sharing)

## CRUD APP NOTES

Create Project folder cd into folder
1. Create Server folder inside Project Folder cd into server folder
2. Run "express" in terminal to generate express app
3. (Open atom)
4. Initialize git repo "git init"
5. Add git ignore "gitignore node"
6. Install server module "npm install express
7. Edit package.json (change name(project name), and version(1.0.0)
8. Git add, git
———————————COMMIT—————————————
10. Create database: "createdb (name of database)"
11. Run "npm install save knex pg" to add knex and pg to package.json
12. Run "knex init" to create knexfile.js
13. Edit knexfile.js (delete everything but development obj) (Client: ’pg’ connection: 'postgres://localhost/(name of db)) 
———————————COMMIT—————————————
14. Create enity relationship diagram
15. Run "knex migrate:make (name of first migration)" (to create a migration folder and first migration within it)
16. Edit migration folder to create table using entity relationship diagram as reference
17. Run "knex migrate:latest"
18. Check that table was created and that in was migrated with psql in terminal:
    1. "psql (name of db)”
    2. "\dt"will show all tables)
    3. "\d (name of db)”(will describe the table you made)
———————————————————COMMIT———————————————————————
19. Run "knex seed:make (name of seed)" to make seed folder (name them starting  with number_(name) otherwise they will run in alphabetical order)
20. Edit seed file to insert sample data (could be manually inserted or called through a variable that looks in an existing file)
21. Run "knex seed:run" to run seeds
22. Check in psql to see that seeds are present using: "SELECT * FROM sticker;" (make sure to use a semicolon!
   —————————————COMMIT————————————————————— 
  Convert express app to json api: (app.js)
    1. Remove view engine set up(lines 13-15)
    2. Remove views folder inside server folder
    3. Remove routes folder inside server folder
    4. Remove routes in app.js (index, users)
    5. Remove where routes where being used(lines 8-9 and 21-22)
    6. Remove static serve from app.js (line 16)
    7. Remove public folder inside server folder
    8. Update error handler: replace lines 27-35 with:
	"app.use(function(err, req, res, next) {
 	 res.status(err.status || 500);
	 res.json({
   	 message: err.message,
  	error: req.app.get('env') === 'development' ? err : {}
  	});
	});"
	9.Run "npm uninstall jade" to remove jade from dependencies
	10.Run "npm install" to make sure it has all the latest dependencies
	11. Run "npm start" and in localhost:3000 in the browser you should see a not found message error. (convert all var’s to const) ————————————COMMIT———————————————
24.Inside server folder create a folder called api
25.Inside new api folder create a file called “stickers.js” (routes will go in here)
26.Inside this JS file: (bring in express, create a router, export router, create simple route “router.get“):
"const express =require('express');
const router = express.Router();
router.get('/', (req, res) => {
  res.json({
   message: 'Hello!'
  })
});

module .exports = router;"
27.Import router in app.js require in stickers router:
"const stickers = require('./api/stickers’)" (after the last const before first app.use)
28.Mount router in app.js after all middleware and before the 404 handler:
"app.use('/api/v1/stickers', stickers);" (second parameter is the router)
 ——————————————COMMIT——————————————————
29.Install nodemon as a develop dependency: "npm install nodemon —save-dev"
30.In package.json after “start”, add ”dev”: “nodemon”
31.Run "npm run dev" to start nodemon
32.Check “localhost:3000/api/v1/stickers”
33.Make connection to database
	1.Inside Server folder create “db” folder
	2.Inside db folder create “knex.js” file
	3. Create variables for connection to db
	"const environment = process.env.NODE_ENV || 'development';
	const config = require('../knexfile');
	const environmentConfig = config[environment];
	const knex = require('knex');
	const connection = knex(environmentConfig);

	module.exports = connection;"
——————————COMMIT—————————————
34.Create queries folder inside db folder
34.Inside queries file get file ready for queries by adding:
"const knex =require('./knex');

module.exports = {
 getAll() {

  }
}"
35.Make routes:
	1.Inside stickers.js add a queries variable to call the queries file into stickers.js:
	 "const queries = require(' ../db/queries’)";(top of file under last const)

	and write first route:
	"const express = require('express');
	const router = express.Router();
	const queries = require('../db/queries');

	router.get('/', (req, res) => {
	  queries.getAll().then(stickers => {
	    res.json(stickers);
	  });
	});

	module.exports = router;"
	2.In queries.js file create query for this route:  
	"module.exports = {
	  getAll() {
	    return knex('sticker');
	  }
	}"
	3.Check to see that your data comes back in localhost://3000 
  ————————————COMMIT————————————————
36.To make tests install mocha chai and supertest:
  "npm install --save-dev mocha chai supertest"
37.in knexfile.js add new environment called test:
"test: {
    client: 'pg',
    connection: 'postgres://localhost/test-quintanas-web-store'
  },"
38.In server folder create new directory called “test” and a file inside called “app.test.js”
39.In app.test.js make a describe script:
"describre('CRUD Stickers', () => {

});"
40.In package.json add a npm test script so every time npm test is ran the db will be dropped and created:
"test": "(dropdb --if-exists test-quintanas-web-store && createdb test-quintanas-web-store) NODE_ENV=test mocha”(run npm test to check tests are running)
——————————————COMMIT——————————————————
41.In app.test.js add db connection app.js chai and supertest:
“const request = require('supertest');
const chai = require('chai').expect;
const knex = require('../db/knex');
const app = require('../app');”

- Inside the describe add before function to run migrations and seeds:
“describe('CRUD Stickers', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        return knex.seed.run();
      }).then(() => done());
  });”

42.Create first mocha test for listing all records:
“it('Lists all Records', (done) => {
  request(app)
    .get('/api/v1/stickers')
    .set('Accept', 'application/json')
    .expect('Content—Type', /json/)
    .expect(200)
    .then((response) => {
      expect(response.body).to.be.a('array');
      expect(response.body).to.deep.equal(fixtures.stickers);
      done();
    });
});”

43.Inside test folder create fixtures folder with seed data. At the top of this file create a variable that is equal to an array with the data that will be used in testing.
-require fixtures file in app.test.js file:

“const fixtures = require('./fixtures’);”  ———————————COMMIT—————————————
44.Create a functions to validate stickers:
“function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

function validSticker(sticker)
{
  const hasTitle = typeof sticker.title == 'string' && sticker.title.trim() != '';
  const hasURL = typeof sticker.url == 'string' && sticker.url.trim() != '';
  const hasDescription = typeof sticker.description == 'string' && sticker.description.trim() != '';
  const hasRating = !isNaN(sticker.rating)
  return hasTitle && hasDescription && hasURL && hasRating;
}”

———————————COMMIT—————————————

45.Show one record with GET /api/v1/stickers/:id

1.Create route:
“router.get('/:id', isValidId, (req, res, next) => {
  queries.getOne(req.params.id).then(sticker => {
    if (sticker) {
      res.json(sticker);
    } else {
      next();
    }
  });
});”

2.Validate id(isValidId)

3.Create query:
“getOne(id) {
   return knex('sticker').where('id', id).first();
 },”

4.Add test:
“it('Show one record by id', (done) => {
    request(app)
      .get('/api/v1/stickers/5')
      .set('Accept', 'application/json')
      .expect('Content—Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.stickers[4]);
        done();
      });
  });”

———————————COMMIT—————————————

46. Create a record with POST /api/v1/stickers:  1.Create route:
“router.post('/', (req, res, next) => {
  if(validSticker(req.body)) {
    queries.create(req.body).then(stickers => {
      res.json(stickers[0]);
    });
  }else {
    next(new Error('Invalid sticker'));
  }
});”

2.Validate id(isValidId)

3.Create query:
“create(sticker) {
   return knex('sticker').insert(sticker, '*');
 },”

4.Add test:
“it('Creates a record', (done) => {
    request(app)
      .post('/api/v1/stickers')
      .send(fixtures.sticker)
      .set('Accept', 'application/json')
      .expect('Content—Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        fixtures.sticker.id =response.body.id;
        expect(response.body).to.deep.equal(fixtures.sticker);
        done();
      });
  });”

———————————COMMIT—————————————

47.Update a record withPUT /api/v1/stickers/:id   1.Create route:
“router.put('/:id', isValidId, (req, res, next) => {
  if (validSticker(req.body))
    queries.update(req.params.id, req.body).then(stickers => {
      res.json(stickers[0]);
    });
  } else {
    next(new Error('Invalid sticker'));
  }
});”

2.Validate id(isValidId)

3.Create query:
“ update(id, sticker) {
   return knex('sticker').where('id', id).update(sticker, '*');
 },”

4.Add test:
“it('Updates a record', (done) => {
    fixtures.sticker.rating = 5;
    request(app)
      .put('/api/v1/stickers/10')
      .send(fixtures.sticker)
      .set('Accept', 'application/json')
      .expect('Content—Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.sticker);
        done();
      });
  });”

———————————COMMIT—————————————
48. Delete a record with DELETE /api/v1/stickers/:id  1.Create route:
“router.delete('/:id', isValidId, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});”

2.Validate id(isValidId)

3.Create query:
“delete(id) {
   return knex('sticker').where('id', id).del();
 },,”

4.Add test:
“it('Deletes a record', (done) => {
    request(app)
      .delete('/api/v1/stickers/10')
      .set('Accept', 'application/json')
      .expect('Content—Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal({
          deleted: true
        });
        done();
      });
  });”

———————————COMMIT—————————————   
