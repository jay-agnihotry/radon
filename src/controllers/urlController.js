const urlModel = require("../models/urlModel");
const validUrl = require('valid-url');
const shortid = require('shortid');



const createShortUrl= async function(req,res){
    try{
          //==defining baseUrl==//
        const baseUrl = 'http://localhost:3000'

         //==validating request body==//
         if(Object.keys(req.body).length==0) return res.status(400).send({status: false, message: "Invalid request, please provide details"})

           //==validating long url==//
        let longUrl=req.body
      //  if (!validUrl(longUrl)) return res.status(400).send({status: false, message: "Invalid long URL"})

        let urlCode = shortid.generate()
        let shortUrl = baseUrl + '/' + urlCode  
        longUrl.urlCode = urlCode
        longUrl.shortUrl = shortUrl

        const urlCreate = await urlModel.create(longUrl)
       
       return res.status(201).send({status: true, data : {longUrl:urlCreate.longUrl,urlCode:urlCreate.urlCode,shortUrl:urlCreate.shortUrl} })
    }catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    } 
}


const getShortUrl = async function (req, res) {
    try { 
       
       const code=req.params.urlCode
        const urlData = await urlModel.findOne({ urlCode: code })  
        if (!urlData)  
            return res.status(404).send({status: false, message: "No URL Found "});
        return res.status(307).redirect(urlData.longUrl)    
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
}
module.exports={createShortUrl,getShortUrl}

