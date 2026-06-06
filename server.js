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


        // Stuur de data door naar home.liquid
        response.render('home.liquid', { dashboardData: dashboardData });
});

app.get('/:id', async function (request, response) {

  const tweakersResponse = await fetch('https://gathering.tweakers.net/rss/list_messages/' + request.params.id)
  const tweakersResponseXML = await tweakersResponse.text()

  const { format, feed } = parseFeed(tweakersResponseXML)
//  console.log(feed) // Om te debuggen

  const items = []
  for (const item of feed.items) {
    items.push({
      name: item.title,
      link: item.link,
      preview: item.description,
    })
  }

// const channels = feed?.channels || [];
//   for (const channel of feed.channels) {
//     channels.push({
//       title: channel.title,
//     })
//   }
// // console.log(channel)

//   console.log(items)

  response.render('detail.liquid', {item: items[0], 
    //channel: channels[0]
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