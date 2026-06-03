console.log('Hier komt je server voor Sprint 12.')

import express from 'express'

import { Liquid } from 'liquidjs'

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

const engine = new Liquid()
app.engine('liquid', engine.express())

app.set('views', './views')

const baseURL = 'heb ik nog niet'

app.get('/', async function (request, response) {

    response.render('home.liquid')
})