const express = require('express')
const cors = require('cors')

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
        
        res.send(ip.match(/(?:[0-9]{1,3}\.){3}[0-9]{1,3}/g))
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
