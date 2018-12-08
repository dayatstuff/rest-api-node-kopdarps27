var { book,author } = require('../models');
var express = require('express');
var router = express.Router();
var Joi = require('joi');



function validateBook(book){
    const schema = {
        judul : Joi.string().min(3).required(),
        authorId : Joi.number().integer().required(),
        penerbit : Joi.string().required(),
        tanggal_terbit : Joi.date().required()
    }

    return Joi.validate(book, schema);
}


router.route('/')
    .get((req,res)=>{
        book.findAll({
            include: [{
                model: author,
                
            }],
            order: ['id']
        }).then((results) => {
            res.json(results);
        }).catch((error)=>{
            console.log(error);
            res.status(500).json({'error':error});
        });

    })
    .post((req,res)=>{

        const { error }= validateBook(req.body);
        
        if( error ){
            
            res.status(400).json({'error': error.details[0].message}) ;
            return ;
        }



        book.create({
            judul: req.body.judul,
            penerbit: req.body.penerbit,
            tanggal_terbit: req.body.tanggal_terbit,
            authorId: req.body.authorId
        }).then((result) => {
            res.json(result);
        }).catch((error)=>{
            res.status(500).json({'eroor' : error});
        });

    });

router.route('/:id')
    .get((req,res)=>{
        book.findById(req.params.id, {
            include: [{
                model: author
            }]
        }).then((result)=>{
            res.json(result);
        }).catch((error)=>{
            console.log(error);
            res.status(500).json({'error': error});
        });
    })
    .put((req,res)=>{
        book.update({
            judul: req.body.judul,
            penerbit: req.body.penerbit,
            authorId: req.body.authorId,
            tanggal_terbit: req.body.tanggal_terbit
        },
        {
            where: {
                id: req.params.id
            }
        }).then((result) => res.json({'message':'Updated'})).catch((error)=>{
            console.log(error);
            res.status(500).json({'error':error});
        });
    })
    .patch((req,res)=>{
        book.update({
            judul: req.body.judul,
            penerbit: req.body.penerbit,
            authorId: req.body.authorId,
            tanggal_terbit: req.body.tanggal_terbit
        },
        {
            where: {
                id: req.params.id
            }
        }).then((result) => res.json({'message': 'Updated'})).catch((error)=>{
            console.log(error);
            res.status(500).json({'error':error});
        });
    })
    .delete((req,res)=>{
        book.destroy({
        where: {
            id: req.params.id
        }
        }).then((result) => res.json({'message':'Deleted'})).catch((error)=>{
            console.log(error);
            res.status(500).json({'error':error});
        });
    });


module.exports = router ;