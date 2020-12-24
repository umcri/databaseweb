const express = require('express');
const fs = require('fs');
const multer = require('multer');
const {Customer, Product, Transaction} = require('../models');

const router = express.Router();

const upload = multer({ dest: 'uploads/' })

try{
    fs.readdirSync('uploads');
  } catch (error) {
    fs.mkdirSync('uploads');
  }


  
router.post('/', upload.single('csvfile'), async(req, res) => {
    console.log(req.file);
    try{
        var array = fs.readFileSync(req.file.path).toString().split("\n");
        for(i in array) {
            const arr = array[i].split(",");
            if(arr[0] == "C"){
                arr[1] = arr[1].trim();
                arr[2] = arr[2].trim();
                arr[3] = arr[3].trim();
                arr[4] = arr[4].trim();
                try {
                    const customer = await Customer.create({
                    name: arr[1],
                    phone: arr[2],
                    address: arr[3],
                    gender: arr[4],
                    });
                    console.log(customer);
                } catch (err) {
                console.error(err);
                next(err);
                }
            } else if(arr[0] == "T"){
                arr[1] = arr[1].trim();
                arr[2] = arr[2].trim();
                arr[3] = arr[3].trim();
                arr[4] = arr[4].trim();
                arr[5] = arr[5].trim();
                var tempPrice = arr[3].split("$");
                arr[3] = parseFloat(tempPrice[1]);
                var tempDate = arr[4].split("/");
                arr[4] = tempDate[2] + "-" + tempDate[1] + "-" + tempDate[0];
                try {
                    const transaction = await Transaction.create({
                      transactionNumber: arr[1],
                      productID: parseInt(arr[2]),
                      price: arr[3],
                      date: arr[4],
                      customerName: arr[5],
                    });
                    console.log(transaction);
                } catch (err) {
                console.error(err);
                next(err);
                }
            } else { // P
                arr[1] = arr[1].trim();
                arr[2] = arr[2].trim();
                arr[3] = arr[3].trim();
                try {
                    const product = await Product.create({
                        name: arr[1],
                        productID: parseInt(arr[2]),
                        supplierName: arr[3],
                    });
                    console.log(product);
                } catch (err) {
                console.error(err);
                next(err);
                }
            }
        }
        res.redirect('/');
    } catch (err) {
        console.error(err);
    }
});


module.exports = router;