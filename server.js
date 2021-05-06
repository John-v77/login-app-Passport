const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const initializePassport = require('./passport-config')

const initialize = require('./passport-config')
initializePassport(
    passport, 
    email => {return users.find(user => user.email === email)})

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended:false}))


app.get('/', (req, res) => {
    res.render('index.ejs', { user: 'John' })
})

app.get('/login', (req, res) =>{
    res.render('login.ejs')
})

app.get('/register', (req, res) =>{
    res.render('register.ejs')
})

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = bycrypt.hash(req.body.password, 10)
        
        // data bases will do this field automatically 
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log('users',users)
})

app.listen(3000)