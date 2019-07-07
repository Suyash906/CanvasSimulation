const express = require(`express`);
const graphqlHTTP  = require('express-graphql');
const schema = require('./schema/schema');
var cors = require('cors');

const app = express();

app.use('/graphql', cors(), graphqlHTTP((req) => {
    return {
      schema,
      graphiql:true
    };
  }));


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


app.listen(4000, ()=> {
    console.log(`listening  on port 4000`);
} )