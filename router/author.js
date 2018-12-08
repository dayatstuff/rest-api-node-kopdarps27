var { author,book } = require('../models');
var express = require('express');
var Joi = require('joi');
var router = express.Router();


function validateAuthor(book){
    const schema = {
        nama : Joi.string().min(3).required()
    }

    return Joi.validate(book, schema);
}

router.route('/')
    .get((req,res)=>{
        author.findAll({
            order: ['id']
        }).then((results) => {
            res.json(results);
        }).catch((error)=>{
            console.log(error);
            res.status(500).json({'error':error});
        });

    })
    .post((req,res)=>{

        const { error }= validateAuthor(req.body);
        
        if( error ){
            
            res.status(400).json({'error': error.details[0].message}) ;
            return ;
        }
        
        author.create({
            nama: req.body.nama
        }).then((result) => {
            res.json(result);
        }).catch((error)=>{
            res.status(500).json({'error' : error});
        });

    });

router.route('/:id')
    .get((req,res)=>{
        author.findById(req.params.id, {
           
        }).then((result)=>{
            res.json(result);
        }).catch((error)=>{
            console.log(error);
            res.status(500).json({'error': error});
        });
    })
    .put((req,res)=>{
        author.update({
            nama: req.body.nama
        },
        {
            where: {
                id: req.params.id
            }
        }).then((result) => res.json(result)).catch((error)=>{
            console.log(error);
            res.status(500).json({'error':error});
        });
    })
    .patch((req,res)=>{
        author.update({
            nama_buku: req.body.nama_buku,
            penerbit: req.body.penerbit,
            authorId: req.body.authorId,
            tanggal_terbit: req.body.tanggal_terbit
        },
        {
            where: {
                id: req.params.id
            }
        }).then((result) => res.json(result)).catch((error)=>{
            console.log(error);
            res.status(500).json({'error':error});
        });
    })
    .delete((req,res)=>{
        author.destroy({
        where: {
            id: req.params.id
        }
        }).then((result) => res.json(result)).catch((error)=>{
            console.log(error);
            res.status(500).json({'error':error});
        });
    });

router.get('/:id/book', (req,res)=>{
    author.findById(req.params.id, {
        include: [{
            model: book
        }]
    }).then((result)=>{
        res.json(result);
    }).catch((error)=>{
        console.log(error);
        res.status(500).json({'error': error});
    });
});


module.exports = router ;