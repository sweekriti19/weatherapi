const path=require('path')
const express=require('express')
const app=express()
const router=require('./controller/router')
const exphbs = require('express-handlebars');

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: false, layoutsDir: __dirname + '/views/' }));
app.set('view engine', 'hbs');
app.use(express.static('public'))
app.use('/',router)

app.listen(3000,function(req,res){
    console.log("listening on 3000")
})