const express = require('express')
const cors = require('cors')
const fetchClients = require('../utils/fetchclients')

module.exports = function () {
    let app = express();
    let create
    let start

    create = function () {


        app.use(cors())
        app.use(express.json());
        app.set('port', 3000)
        app.use(function (err, req, res, next) {
            res.send("Error occured " + err.statusCode)
        })
    }


    app.get('/', (req, res) => {
        var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        ip = ip.match(/(?:[0-9]{1,3}\.){3}[0-9]{1,3}/g)[0]
        async function getMac() {
            
            const mac = await fetchClients.getMacFromIP(ip)
            res.send(mac)
        }
        getMac()
    })


    start = function () {


        let port = app.get('port')
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
    }
    return {
        create: create,
        start: start
    }
}
