const express = require('express')
const router = express.Router()

let user = null

const profiles = [
	{name: 'Steven', city:'Sydney', profession:'doctor'},
	{name: 'Mark', city:'Perth', profession:'lawyer'},
	{name: 'Michelle', city:'Sydney', profession:'programmer'}
]

router.get('/', (req, res, next) => {
	const data = {
		name: 'Index',
		date: req.timestamp,
		profiles: profiles,
		user: user
	}

	res.render('index', data)
})

router.get('/login', (req, res, next) => {
	res.render('login', null)
})

router.post('/login', (req, res, next) => {
	const username = req.body.username
	const password = req.body.password

	if (password === '123'){
		user = {username: username}
		res.redirect('/')
		return
	}

	const data = {
		message: 'Please check your password and/or username.'
	}

	res.render('error', data)
})

router.post('/join', (req, res, next) => {
	const body = req.body
	profiles.push(body)
	res.redirect('/')
})

router.get('/json', (req, res, next) => {
	console.log('Timestamp: ' + req.timestamp)
	const data = {name:'David', location:'Sydney', date:req.timestamp}
	res.json(data)
})

router.get('/html', (req, res, next) => {
	const html = '<html><h1 style="color:red">This is an HTML response</h1></html>'
	res.send(html)
})

router.get('/query', (req, res, next) => {
	const query = req.query
	res.json(query)
})

router.get('/params/:name/:location/:occupation', (req, res, next) => {
	const params = req.params
	res.json({
		params: params
	})

})

module.exports = router