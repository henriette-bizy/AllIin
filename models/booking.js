const mongoose = require('mongoose');
const joi = require('joi');
const moment = require('moment');


const BookingSchema = new mongoose.Schema({
    userId:{
        type:Schema.ObjectId,
        ref: 'User'
    },
    bookingStart:Date,
    bookingEnd:Date,
    startHour:Number,
    duration:Number,
    recurring:[],
    Purpose:{
       type:String,
       required:true
   },
   roomId:{
       type:String,
   }

},
{timestamps:true} 
)

//hehehe to validate if a room cannot be double roomed/booked

BookingSchema.path('bookingStart').validate(function(value){
    let roomId = this.roomId

    //ng this is to convert the dates into the numbers
     let newBookingStart = value.getTime()
     let newBookingEnd = this.bookingEnd.getTime()

     let clashesWithExisting = (existingBookingStart, existingBookingEnd, newBookingStart, newBookingEnd) => {
        if (newBookingStart >= existingBookingStart && newBookingStart < existingBookingEnd || 
          existingBookingStart >= newBookingStart && existingBookingStart < newBookingEnd) {
          
          throw new Error(
            `Booking could not be saved. There is a clash with an existing booking from ${moment(existingBookingStart).format('HH:mm')} to ${moment(existingBookingEnd).format('HH:mm on LL')}`
          )
        }
        return false
      }
      
})

module.exports = mongoose.model(Booking , BookingSchema)