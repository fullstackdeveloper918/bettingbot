var request = require('request');
const Promise = require('promise');

var options = {
    method: 'GET',
    url: 'https://www.covers.com/Sports/NFL/Odds/US/SPREAD/Futures/Online/ML',
    headers: { 'Cache-Control': 'no-cache' }
};

const formatData = (trs) => {
    try {
        return trs.map(a => {
            var regex1 = /a>\s*([\w\s\.]*)/g;
            var regex2 = /span>([\w\W]*?)</g;
            return regex1.exec(a)[ 1 ].trim() + ' ' + regex2.exec(a)[ 1 ];
        });
    } catch (err) {
        return 'Something bad happened, the website most likely changed its format';
    }
};

const getFutures = (tableIndex) => {
    
    return new Promise((resolve, reject) => {
        var cvrsAdsProfile = 'default';
        
        request(options, function (error, response, body) {
            if (error) reject(error);
            // Get table only
            var tableRegex = /table\s*id="coversFuturesTable"[\w\W\s]*?<\/table>/g;
            var table;
            for (var i = 0; i <= tableIndex; i++)
                table = tableRegex.exec(body)[ 0 ];
            
            // Remove thead from table
            table = table.substring(0, table.indexOf('<thead')) + table.substring(table.indexOf('</thead>') + 8);
            var trs = [];
            while (table.indexOf('<tr') >= 0) {
                trs.push(table.substring(table.indexOf('<tr'), table.indexOf('</tr>') + 5));
                table = table.slice(table.indexOf('</tr>') + 5);
            }
            var data = formatData(trs).join('\n');
            resolve(data);
        });
    });
}

module.exports = {
    getFutures,
};
