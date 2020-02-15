const mongoose=require('mongoose');
const WebHook=mongoose.Schema({
    name:String,
    payload:Object,
    addedby:String,
    isDelete:String
},{
    timestamps:true
}); 
module.exports=mongoose.model('WebHook',WebHook);