const express = require('express');
const morgan = require('morgan');
const faker = require('faker');
const lodash = require('lodash');
const bodyParser = require('body-parser');
const db = require('./models');
var routeAuthor = require('./router/author');
var routeBook = require('./router/book');
const app = express();



app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/book', routeBook);

app.use('/author', routeAuthor);


app.get('/migrate', (req,res) => {
    db.sequelize.sync({force:true}).then((results)=>{
        faker.locale = 'id_ID' ;
        db.author.bulkCreate(
            lodash.times(10, () => ({
                nama: faker.name.findName()
            }))
        );

        faker.locale = 'id_ID' ;
        db.book.bulkCreate(
            lodash.times(50, () => ({
                judul: faker.lorem.sentence(),
                penerbit: faker.company.companyName() + ' ' + faker.company.companySuffix(),
                tanggal_terbit:faker.date.past(),
                authorId:lodash.random(1,10)
            }))
        );
        res.json('Ok')

    }).catch((error)=> console.log(error));   

});


app.get('/', (req,res) => {
    return res.status(200).json({'message': 'Halo programmer Semarang'});
});




app.listen(5000, ()=> console.log('Hey run di http://localhost:5000'));