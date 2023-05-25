import mongoose from "mongoose";

let productScheme=new mongoose.Schema({
    titulo:String,
    nuevoprecio:Number,
    viejoprecio:Number,
    nuevostock:Number,
    viejostock:Number,
    sku:Number,
    company:Number,
    url:String,
    estadoactualizacion:String

})

module.exports=mongoose.model('Product',productScheme)