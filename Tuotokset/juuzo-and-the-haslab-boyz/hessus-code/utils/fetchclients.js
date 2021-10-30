const fs = require('fs')
const path = require('path')
const { NodeSSH } = require('node-ssh')
const ssh = new NodeSSH()
const config = require('../config/config')

function fetch() {
    const fetchdata = new Promise((resolve, reject) => {
        var ret
        ssh.connect({
            host: config.hostaddress,
            username: config.username,
            privateKey: fs.readFileSync(__dirname + config.serti, 'utf8'),
            port: config.port,
        }).then(function () {
            ssh.execCommand('cat /tmp/clientlist.json', {})
                .then(function (result) {
                    ret = result.stdout
                }).then(() => {
                    ssh.dispose()
                    resolve(ret)
                }).catch((err) => {
                    reject(err)
                })
        }).catch((err) => {
            reject(err)
        })
    })
    return fetchdata

}


 async function getMacFromIP(ip) {
    var retVal
     await fetch().then((data) => {
        var parsedData = JSON.parse(data)
        Object.values(parsedData).forEach(value1 => {
            Object.values(value1).forEach(value2 => {
                Object.keys(value2).forEach(key => {
                    if(ip === value2[key].ip) {
                        retVal = key
                        return
                    }
                })
            })
        })
    })
    return retVal
}


function parseJson(data) {
    var parsedData = JSON.parse(data)
    var retArr = []
    Object.values(parsedData).forEach(value1 => {
        Object.values(value1).forEach(value2 => {
            Object.keys(value2).forEach(key => {
                obj = { mac: key, ip: value2[key].ip }
                retArr.push(obj)
            })
        })
    })
    return retArr

}

module.exports = {
    getMacFromIP
}
