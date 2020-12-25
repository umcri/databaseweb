const express = require("express");
const { Customer, Product, Transaction } = require("../models");
const { sequelize } = require("../models");
const { Op } = require("sequelize");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.render("extend");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/f1", async (req, res, next) => {
  try {
    const [
      f1,
      metadata,
    ] = await sequelize.query(`select woman.name from (SELECT pd.name, count(cus.gender) as cnt FROM dbhw.transactions as tr, dbhw.customers as cus, dbhw.products as pd
        where cus.gender = "Male" and cus.name = tr.customerName and pd.productID = tr.productID 
        group by pd.name) as man, (SELECT pd.name, count(cus.gender) as cnt FROM dbhw.transactions as tr, dbhw.customers as cus, dbhw.products as pd
        where cus.gender = "Female" and cus.name = tr.customerName and pd.productID = tr.productID 
        group by pd.name) as woman
    where (man.name = woman.name and man.cnt < woman.cnt) or woman.name not in (SELECT pd.name FROM dbhw.transactions as tr, dbhw.customers as cus, dbhw.products as pd
        where cus.gender = "Male" and cus.name = tr.customerName and pd.productID = tr.productID 
        group by pd.name)
    group by woman.name`);
    console.log(f1);
    return res.render("extend", { womans: f1 });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/f2", async (req, res, next) => {
  const idate = req.query.idate;
  const kValue = req.query.kValue;
  if (!idate || !kValue) {
    return res.redirect("/extend");
  }
  try {
    const [f2, metadata] = await sequelize.query(`SELECT 
            pd.name, sum(tr.price) as sum
        FROM dbhw.transactions as tr, dbhw.products as pd
        where pd.productID = tr.productID and tr.date < '${idate}'
        group by pd.name
        order by sum DESC
        limit ${kValue}`);
    return res.render("extend", { mosts: f2 });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/f3", async (req, res, next) => {
  const mValue = req.query.mValue;
  if (!mValue) {
    return res.redirect("/extend");
  }
  try {
    const [
      f3,
      metadata,
    ] = await sequelize.query(`SELECT name FROM (SELECT cus.name, count(pd.productID) as cnt, pd.supplierName
        FROM dbhw.transactions as tr, dbhw.customers as cus, dbhw.products as pd
        where cus.name = tr.customerName and pd.productID = tr.productID
        group by pd.supplierName, cus.name) as cntTable
    WHERE cnt >= ${mValue}`);
    return res.render("extend", { customerMs: f3 });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
