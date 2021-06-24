const mongoose = require('mongoose');
const Joi= require('joi');

const SaleSchema = new mongoose.Schema({
    SaleCategory: {
        type: String,
        enum: ['leasing', 'buying'],
        required:true
    },
    SaleAmount: {
        type: String,
        min:1,
        required: true
    },
    quantity: {
        type: String,
        min:1
    },
    productId: {
        type:String,
       
    }
},
    {timestamps:true});
    

exports.validateSale = (Sale) =>{
    const validate_schema = Joi.object().keys({
        SaleCategory:Joi.string().valid('leasing','buying').required(),
        SaleAmount: Joi.string().min(1).required(),
        quantity:Joi.string().min(1),
        productId:Joi.string().required()
    });
    return validate_schema.validate(Sale)
}

const Sale = mongoose.model('Sale',SaleSchema)
module.exports.Sale = Sale