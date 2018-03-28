var request = require('request');
const Promise = require('promise');

const months = {
    'jan': 1,
    'feb': 2,
    'mar': 3,
    'apr': 4,
    'may': 5,
    'jun': 6,
    'jul': 7,
    'aug': 8,
    'sep': 9,
    'oct': 10,
    'nov': 11,
    'dec': 12
};

const options = {
    method: 'GET',
    url: 'https://www.covers.com/Sports/NBA/Odds/US/TOTAL/competition/Online/ML',
    headers: { 'Cache-Control': 'no-cache' }
};

const makeDate = (dateArray) => {
    var today = new Date();
    var month = months[ dateArray[ 0 ].toLowerCase() ];
    var day = dateArray[ 1 ];
    var year = today.getFullYear();
    if (today.getMonth() > month - 1) {
        year++;
    }
    return '@' + month + '/' + day + '/' + year + ' ' + dateArray[ 2 ] + ' ' + dateArray[ 3 ];
};

const getTeamAbr = (td, which) => {
    try {
        if (which == 2) {
            td = td.replace(/<div class="cover-CoversOdds-details-Team">((.|\n|\r)*?)<\/div>/, '');
        }
        var regex = new RegExp(/<span class="cover-CoversOdds-tableTeamLink">((.|\n|\r)*?)<\/span>/);
        td = td.match(regex)[ 1 ].trim();
        regex = new RegExp(/<a(.|\n|\r)*?>((.|\n|\r)*?)<\/a>/);
        var team = td.match(regex)[ 2 ].trim();
        return team;
    } catch (err) {
        console.log(err);
        return '?';
    }
};

const getTeamFull = (td, which) => {
    try {
        var regex = new RegExp(/Best (home|away) odds for ((.|\n|\r)*?)"/);
        var teams = td.match(regex)[ 2 ].trim();
        var index = 0;
        if (which == 1) {
            regex = new RegExp(/((.|\n|\r)*?) vs/);
            return teams.match(regex)[ 1 ];
        }
        regex = new RegExp(/vs ((.|\n|\r)*)/);
        return teams.match(regex)[ 1 ];
    } catch (err) {
        console.log(err);
        return 'Unknown';
    }
};

const getTeamSpread = (td, which) => {
    try {
        if (which == 2) {
            td = td.replace(/<div class="cover-CoversOdds-odds-middle">((.|\n|\r)*?)<\/div>/, '');
        }
        var regex = new RegExp(/<span (.|\n|\r)*?>((.|\n|\r)*?)<\/span>/);
        var num1 = td.match(regex)[ 2 ];
        regex = new RegExp(/<span>((.|\n|\r)*?)<\/span>/);
        var num2 = td.match(regex)[ 1 ];
        return '(' + num1 + ', ' + num2 + ')';
    } catch (err) {
        console.log(err);
        return 'Unknown';
    }
};

const formatData = (trs) => {
    try {
        return trs.map(a => {
            var tds = [];
            // Remove all but first and last td
            while (a.indexOf('<td') >= 0) {
                tds.push(a.substring(a.indexOf('<td'), a.indexOf('</td>') + 5));
                a = a.slice(a.indexOf('</td>') + 5);
            }
            return [ tds[ 0 ], tds[ 1 ], tds[ tds.length - 1 ] ];
        }).map(a => {
            var date = a[ 0 ].substring(a[ 0 ].indexOf('<span class="cover-CoversOdds-tableTime">') + 41, a[ 0 ].indexOf('</span>'));
            date = date.replace(/M.*?ET/g, 'M').replace(',', '').trim().split(' ');
            date = makeDate(date);
            
            var team1Abr = getTeamAbr(a[ 0 ], 1);
            var team2Abr = getTeamAbr(a[ 0 ], 2);
            var team1Full = getTeamFull(a[ 1 ], 1);
            var team2Full = getTeamFull(a[ 1 ], 2);
            var spread1 = getTeamSpread(a[ 2 ], 1);
            var spread2 = getTeamSpread(a[ 2 ], 2);
            
            var finalStr = '*' + (team1Full.indexOf('Unk') == -1 ? team1Full : team1Abr) + '* ' + spread1 + ' vs. *' +
                (team2Full.indexOf('Unk') == -1 ? team2Full : team2Abr) + '* ' + spread2 + ' ' + date;
            
            return finalStr;
        });
    } catch (err) {
        return 'Something bad happened, the website most likely changed its format';
    }
};

const getTotals = () => {
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (error) reject(error);
            // Get only table
            var table = body.substring(body.indexOf('<table'), body.indexOf('</table>') + 8);
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
};


module.exports = {
    getTotals,
};
