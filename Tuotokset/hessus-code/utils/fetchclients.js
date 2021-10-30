const fs = require('fs')
const path = require('path')
const { NodeSSH } = require('node-ssh')
const ssh = new NodeSSH()

function fetch() {
    ssh.connect({
        host: '192.168.8.45',
        username: 'admin',
        privateKey: fs.readFileSync(__dirname + '/../config/testi3', 'utf8'),
        port: 1025,
    }).then(function () {
        ssh.execCommand('cat /tmp/clientlist.json', {}).then(function (result) {
            ret = parseJson(result.stdout)
            console.log(ret)
        }).then(() => {
            ssh.dispose()
        })
    })


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
    fetch
}
