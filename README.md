## GraphQL Server with Apollo and NodeJS 
tutorial on https://dev-blog.apollodata.com/tutorial-building-a-graphql-server-cddaa023c035

### _start Apollo server_
```
> cd fd17-graphql-server/apollo-starter-kit
> npm start
```

### _run GraphiQL (on Cloud9)_
https://fd17-graphql-mikhailbro.c9users.io/graphql


### GraphQL schema language cheat sheet
https://wehavefaces.net/graphql-shorthand-notation-cheatsheet-17cd715861b6


## Sequelize DB
### _Querying_
http://docs.sequelizejs.com/manual/tutorial/querying.html#basics

### _Associations_
http://docs.sequelizejs.com/manual/tutorial/associations.html#belongsto

## Casual Fake Data
### _casual generator_
https://github.com/boo1ean/casual



## MongoDB
### _start MongoDB_
```
> cd fd17-graphql-server
> ./mongod
```


#### _mongoimport auf heroku_
```
> cd fd17-graphql-server/db/insert-scripts
> mongoimport --host ds157521.mlab.com:57521 --db fd2017mongodb -u admin -p fd2017 --collection partner --file insert-fd17-partner.json
> mongoimport --host ds157521.mlab.com:57521 --db fd2017mongodb -u admin -p fd2017 --collection contract --file insert-fd17-contract.json 
> mongoimport --host ds157521.mlab.com:57521 --db fd2017mongodb -u admin -p fd2017 --collection claims --file insert-fd17-claims.json 
```


#### _mongoshell auf heroku (s. cheat sheet: https://docs.mongodb.com/manual/reference/mongo-shell/)_
```
> mongo
_rs-ds157521:PRIMARY_> use fd2017mongodb
_rs-ds157521:PRIMARY_> show collections
_rs-ds157521:PRIMARY_> db.partner.find()
_rs-ds157521:PRIMARY_> db.contract.find()
_rs-ds157521:PRIMARY_> db.claims.find()
```