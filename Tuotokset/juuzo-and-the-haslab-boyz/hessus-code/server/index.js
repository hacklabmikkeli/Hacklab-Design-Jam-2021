const express = require('express')
const cors = require('cors')
const fetchClients = require('../utils/fetchclients')
const path = require('path')
const Nickname = require('./models/Nickname')
const mongoose = require('mongoose')

module.exports = function () {
    let app = express();
    let create
    let start

    create = function () {


        app.use(cors())
        app.use(express.json());
        app.set('port', 3000)
        app.use(function (err, req, res, next) {
            console.log(err)
            res.send("Error occured " + err.statusCode)
        })
    }


    app.get('/getmac', (req, res) => {
        var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        ip = ip.match(/(?:[0-9]{1,3}\.){3}[0-9]{1,3}/g)[0]
        async function getMac() {
            const mac = await fetchClients.getMacFromIP(ip)
            res.json({mac:mac})
        }
        getMac()
    })

    app.get('/getallclients', (req,res) => {
        async function getAllClients() {
            const macs = await fetchClients.parseJson()
            res.send(macs)
        }
        getAllClients()
    })

    app.post('/savenickname', (req,res) => {
        
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
