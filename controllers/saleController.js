const _ = require('lodash');
const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const {Sale,validateSale} = require('../models/sale.js')
// const Sale = mongoose.model('Sale');


router.get('/',async(req,res)=>{
 const sales = await Sale.find().sort({name:1})
 return res.send(sales).status(200)
})

router.get('/:id', async(req,res)=>{
const sale = await Sale.findById(req.params.id)
return res.send(sale);
})

router.post('/', async(req,res)=>{
    const {error} = validateSale(req.body);

    if(error) 
    return res.send(error).status(400)
    const sale = new Sale(_.pick(req.body,['SaleCategory','SaleAmount','quantity','productId']))

    await sale.save()
    return res.send(sale).status(200).message("the sale is succesfully created")
})
router.put('/:id', async(req,res)=>{
   const {error} = validateSale(req.body)
   if(error)
    return res.send(error)

   const sale = await Sale.findByIdAndUpdate({ _id: req.params.id}, req.body, { new: true })
   return res.send(sale);
})

module.exports= router;