## GraphQL Server with Apollo and NodeJS 
#### tutorial on https://dev-blog.apollodata.com/tutorial-building-a-graphql-server-cddaa023c035

### _start Apollo server_
```
> npm start
```

### _run GraphiQL on Cloud9_
https://fd17-apollo-server-mikhailbro.c9users.io/graphql


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
### _mongoimport auf mLab_
```
> cd db/insert-scripts
> mongoimport --host ds157521.mlab.com:57521 --db fd2017mongodb -u admin -p fd2017 --collection partner --file fd17-partner.json
> mongoimport --host ds157521.mlab.com:57521 --db fd2017mongodb -u admin -p fd2017 --collection contract --file fd17-contract.json 
> mongoimport --host ds157521.mlab.com:57521 --db fd2017mongodb -u admin -p fd2017 --collection claims --file fd17-claims.json 
```


### _mongoshell auf mLab_
#### _mongoshell cheat sheet: https://docs.mongodb.com/manual/reference/mongo-shell/_
```
> mongo
_rs-ds157521:PRIMARY_> use fd2017mongodb
_rs-ds157521:PRIMARY_> show collections
_rs-ds157521:PRIMARY_> db.partner.find()
_rs-ds157521:PRIMARY_> db.contract.find()
_rs-ds157521:PRIMARY_> db.claims.find()
```