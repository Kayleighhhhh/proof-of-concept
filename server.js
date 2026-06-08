console.log('Hier komt je server voor Sprint 12.')

import express from 'express'

import { Liquid } from 'liquidjs'

import { parseFeed } from 'feedsmith'

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

const engine = new Liquid()
app.engine('liquid', engine.express())

app.set('views', './views')


app.get('/', async function (request, response) {

    const categorieen = [
        { naam: 'Computers', url: 'https://gathering.tweakers.net/rss/list_category_topics/2' },
        { naam: 'Wonen en Mobiliteit', url: 'https://gathering.tweakers.net/rss/list_category_topics/21' },
        { naam: 'Games', url: 'https://gathering.tweakers.net/rss/list_category_topics/15' },
        { naam: 'Beeld en geluid', url: 'https://gathering.tweakers.net/rss/list_category_topics/12' },
        { naam: 'Tablets en telefoons', url: 'https://gathering.tweakers.net/rss/list_category_topics/13' },
        { naam: 'General chat', url: 'https://gathering.tweakers.net/rss/list_category_topics/19' }
    ]

    for (const cat of categorieen) {
        const tweakersResponse = await fetch(cat.url)
        const tweakersResponseXML = await tweakersResponse.text()

        const { format, feed } = parseFeed(tweakersResponseXML)

        cat.items = []

        for (const item of feed.items.slice(0, 5)) {
            cat.items.push({
                title: item.title,
                link: item.comments,
                replies: Number(item.description.substring(10, item.description.indexOf('\n'))),
                // categorieNaam: cat.naam
            })
        }
    }
    //console.log(categorieen)

    // Stuur de data door naar home.liquid
    response.render('home.liquid', { dashboardData: categorieen })
})



app.get('/:id', async function (request, response) {

    const tweakersResponse = await fetch('https://gathering.tweakers.net/rss/list_messages/' + request.params.id)
    const tweakersResponseXML = await tweakersResponse.text()

    const { format, feed } = parseFeed(tweakersResponseXML)
    //console.log(feed.title.substring(0, feed.title.indexOf(' - Geachte redactie'))) // Om te debuggen


    const items = []
    for (const item of feed.items) {
        items.push({
            name: item.title,
            link: item.link,
            preview: item.description,
        })
    }

    response.render('detail.liquid', {
        title: feed.title.substring(0, feed.title.indexOf(' - Geachte redactie')),
        item: items[0]
    })
})


// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
    // Toon een bericht in de console
    console.log(`http://localhost:${app.get('port')}/`)
})