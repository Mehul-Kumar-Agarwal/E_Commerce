const formidable=require('formidable'); //to handle form data and  files that come with it
const _=require('lodash');
const fs=require('fs'); //to use file system
const Product=require('../Models/Product')
const {errorHandler}=require('../Helpers/dbErrorHandler');
const { response } = require('express');


exports.productById=(req,res,next,id)=>{    //this will make us easily update stuff about product
    Product.findById(id).exec((err,product)=>{
            if(err || !product){
                return res.status(400).json({
                    error:"Product ID error. Product not found"
                });
            }
            req.product=product;
            next();
    });
};

exports.read=(req,res)=>{
    req.product.photo=undefined;
    return res.json(req.product);
};




exports.create=(req,res)=>{
   let form=new formidable.IncomingForm();  
   form.keepExtensions=true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error:"An Error Occurred in the form/ Image could not be uploaded"
            });
        }
        
        //validation of all field availabilty
        const {name,description,category,price,quantity,shipping}=fields;
        if(!name || !description || !category || !price || !quantity || !shipping){
            return res.status(400).json({
                error:"Missing Field. Please Enter all fields!"
            });
        }


        let product=new Product(fields);
        if(files.photo) //photo is the name at the client side, if we use img then change photo as img
        {
            if(files.photo.size>1000000){
                return res.status(400).json({
                    error:"Image should be less that 1Mb"
                });
            }
            product.photo.data=fs.readFileSync(files.photo.path);
            product.photo.contentType=files.photo.type;
        }

        product.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                });
            }
            res.json(result);
        });

    });
};


exports.remove=(req,res)=>{
    let product=req.product;
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        res.json({
            "message":"Product was deleted"  
        });
    });

};  


exports.update=(req,res)=>{
    let form=new formidable.IncomingForm();  
   form.keepExtensions=true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error:"An Error Occurred in the form/ Image could not be uploaded"
            });
        }
        
        //validation of all field availabilty
        const {name,description,category,price,quantity,shipping}=fields;
        if(!name || !description || !category || !price || !quantity || !shipping){
            return res.status(400).json({
                error:"Missing Field. Please Enter all fields!"
            });
        }


        let product=req.product;
        product=_.extend(product,fields) //this method is provided by lodash package
        if(files.photo) //photo is the name at the client side, if we use img then change photo as img
        {
            if(files.photo.size>1000000){
                return res.status(400).json({
                    error:"Image should be less that 1Mb"
                });
            }
            product.photo.data=fs.readFileSync(files.photo.path);
            product.photo.contentType=files.photo.type;
        }

        product.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                });
            }
            res.json(result);
        });

    });
};
/*
* display products based on sell/arrival...most soled, new arrrivals
* sort by sell-> /products?sortBy=sold&order=desc&limit=4
* sort by arrivals-> /products?sortBy=createdAt&order=desc&limit=4
* If no params, all products are displayed
*/

exports.list=(req,res)=>{
    let order=req.query.order ? req.query.order:'asc' ;
    let sortBy=req.query.sortBy ? req.query.sortBy:'_id';
    let limit=req.query.limit ? parseInt(req.query.limit):6;

    Product.find()
            .select("-photo")
            .populate('category')
            .sort([[sortBy,order]])  //sort takes an array of arrays as parameter
            .limit(limit)
            .exec((err,products)=>{
                if(err){
                    return res.status(400).json({
                        error:'Products Not Found'
                    });
                }
                res.json(products);
            });
};

/*

It will find the products based on req product category
other products that have same category will be returned

*/

exports.listRelated=(req,res)=>{
    let limit=req.query.limit ? parseInt(req.query.limit):6;

    Product.find({_id:{$ne: req.product},category:req.product.category})
            .limit(limit)
            .populate('category','_id name')
            .exec((err,products)=>{
                if(err){
                    return res.status(400).json({
                        error:'Products Not Found'
                    });
                }
                res.json(products);
            });
};

exports.listCategories=(req,res)=>{
    Product.distinct("category",{},(err,categories)=>{
        if(err){
            return res.status(400).json({
                error:'Categories Not Found'
            });
        }
        res.json(categories)
    }); //second para you can pass queries if needed
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set('Content-Type',req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};