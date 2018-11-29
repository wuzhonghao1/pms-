var myMaster = {
    user: 'lkpct',
    password: 'Passw0rd',
    connectString: '10.1.2.231:1521/omprod'
}
module.exports.myMaster = myMaster;

var mySlave = {
    host: '10.1.2.231',
    user: 'lkpct',
    password: 'Passw0rd',
    port: '1521',
    database: 'omprod',
}
module.exports.mySlave = mySlave;

