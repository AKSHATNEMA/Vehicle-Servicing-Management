const express = require("express");
const session = require("express-session");
const con = require("../database/sql_connect");

var router = express.Router();

function protectLogin(req, res, next) {
  if (!session.userID) {
    console.log("Login to continue");
    return res.redirect("/admin");
  } else if (session.userType === "customer") {
    console.log("logged in as customer");
    res.redirect("/admin/customer");
  } else {
    next();
  }
}

router.get("/dashboard", protectLogin, (req, res) => {
  res.render("adminDashboard");
});

router.get("/customerView", function (req, res, next) {
  var sql = "SELECT * FROM customer";
  con.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("customerView", { title: "Customer Details", userData: data });
  });
});

router.get('/employeeView', function(req, res, next) {
  var sql='SELECT * FROM employee';
  con.query(sql, function (err, data, fields) {
  if (err) throw err;
  res.render('employeeView', { title: 'Employee Details', userData: data});
});
});

router.get('/feedbackView', function(req, res, next) {
  var sql='SELECT * FROM feedback';
  con.query(sql, function (err, data, fields) {
  if (err) throw err;
  res.render('feedbackView', { title: 'Feedbacks', userData: data});
});
});

router.get('/deleteEmployee', protectLogin, (req, res)=>{
  res.render('deleteEmployee')
})

router.post('/deleteEmployee',async function(req, res) {
  const { id,email } = req.body
  // DELETE FROM `employee` WHERE 0
      const query ="DELETE FROM employee WHERE id=? AND email=?"
      con.query(query,[id,email], (err,result) =>{
         if (err){
             console.log(err);
             console.log('Something went wrong')
         } else {
         console.log('successfully deleted  Employee!');
         }
         res.redirect('/admin/deleteEmployee')
      })
  });

  router.get('/addUpdateEmployee', protectLogin, (req, res)=>{
    res.render('addUpdateEmployee')
  })

  router.get('/updateEmployee', protectLogin, (req, res)=>{
    res.render('updateEmployee')
  })

  router.post('/updateEmployee',async function(req, res) {
    const { id,exampleRadios,correctedInfo } = req.body
    // console.log(correctedInfo)
    if(exampleRadios==='option1'){
      const query ="UPDATE employee SET name=? WHERE id=?"
      con.query(query,[correctedInfo,id], (err,result) =>{
         if (err){
             console.log(err);
             console.log('Something went wrong')
         } 
         else {
         console.log('successfully inserseted name');
         }
      })
    }
    else if(exampleRadios==='option2'){
      const query ="UPDATE employee SET post=? WHERE id=?"
      con.query(query,[correctedInfo,id], (err,result) =>{
         if (err){
             console.log(err);
             console.log('Something went wrong')
         } 
         else {
         console.log('successfully inserseted post');
         }
      })
    }
    else if(exampleRadios==='option3'){
      const query ="UPDATE employee SET email=? WHERE id=?"
      con.query(query,[correctedInfo,id], (err,result) =>{
         if (err){
             console.log(err);
             console.log('Something went wrong')
         } 
         else {
         console.log('successfully inserseted eamil');
         }
      })
    }
    else if(exampleRadios==='option4'){
      const query ="UPDATE employee SET contact_no=? WHERE id=?"
      con.query(query,[correctedInfo,id], (err,result) =>{
         if (err){
             console.log(err);
             console.log('Something went wrong')
         } 
         else {
         console.log('successfully inserseted contact no.');
         }
      })
    }
    else if(exampleRadios==='option5'){
      const query ="UPDATE employee SET street=? WHERE id=?"
      con.query(query,[correctedInfo,id], (err,result) =>{
         if (err){
             console.log(err);
             console.log('Something went wrong')
         } 
         else {
         console.log('successfully inserseted street');
         }
      })
    }
    else if(exampleRadios==='option6'){
      const query ="UPDATE employee SET city=? WHERE id=?"
      con.query(query,[correctedInfo,id], (err,result) =>{
         if (err){
             console.log(err);
             console.log('Something went wrong')
         } 
         else {
         console.log('successfully inserseted city');
         }
      })
    }
    else if(exampleRadios==='option7'){
      const query ="UPDATE employee SET state=? WHERE id=?"
      con.query(query,[correctedInfo,id], (err,result) =>{
         if (err){
             console.log(err);
             console.log('Something went wrong')
         } 
         else {
         console.log('successfully inserseted state');
         }
      })
    }
    res.redirect('/admin/updateEmployee')
})

  router.get('/deleteCustomer', protectLogin, (req, res)=>{
    res.render('deleteCustomer')
  })

  router.post('/deleteCustomer',async function(req, res) {
    const { id,email } = req.body
    // DELETE FROM `employee` WHERE 0
        const query ="DELETE FROM customer WHERE id=? AND email=?"
        con.query(query,[id,email], (err,result) =>{
           if (err){
               console.log(err);
               console.log('Something went wrong')
           } else {
           console.log('successfully deleted Customer!');
           }
           res.redirect('/admin/deleteCustomer')
        })
    });
  

router.post('/login', (req, res) => {
    const { aemail, apass } = req.body
    const password = '12345'
    const admin='admin@gmail.com'
    if(aemail===admin && apass===password) {
        session.userType='admin'
        session.userID='10000'
        res.redirect('/admin/dashboard')
    }
    else{
        console.log('Wrong Credentials')
        res.redirect('/admin')
    }
  })
  module.exports = router;
