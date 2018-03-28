const R = require('ramda');
const domParser = require('html-dom-parser');
const cheerio = require('cheerio');
const request = require('request');
const {
    getTextFromCheerioObject,
} = require('../utils');

const TOTALS_REQUEST_OPTIONS = {
    method: 'GET',
    url: 'https://www.sportsbookreview.com/betting-odds/soccer/totals/',
    headers: { 'Cache-Control': 'no-cache' }
};

const SPREAD_REQUEST_OPTIONS = {
    method: 'GET',
    url: 'https://www.sportsbookreview.com/betting-odds/soccer/pointspread/',
    headers: { 'Cache-Control': 'no-cache' }
};

const ML_REQUEST_OPTIONS = {
    method: 'GET',
    url: 'https://www.sportsbookreview.com/betting-odds/soccer/',
    headers: { 'Cache-Control': 'no-cache' }
};

const BOOKS_DATA_HTML_ID = 'booksData';

const doRequest = (options) => {
    return new Promise(function (resolve, reject) {
        request(options, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
};

const getDomObjectFromString = (response) => domParser(response);

const parsePageToDomObject = R.compose(
    cheerio.load,
    getDomObjectFromString,
);

const getTeamName = ($, row, teamNumber) => getTextFromCheerioObject(
    $(row)
        .find('.eventLine-team')
        .find('.team-name')
        .find('a')[ teamNumber ]
);

const getGameTime = ($, row) => getTextFromCheerioObject(
    $(row)
        .find('.eventLine-time')
        .find('[class*=\'eventLine-book-value\']')[ 0 ]
);

const getOdds = ($, row, teamNumber) => $(row).find('.eventLine-book')
    .filter((index, book) => !!getTextFromCheerioObject($(book).find('[class*=\'eventLine-book-value\']').find('b')[ teamNumber ]))
    .map((index, book) => getTextFromCheerioObject(
        $(book)
            .find('[class*=\'eventLine-book-value\']')
            .find('b')[ teamNumber ]
        )
            .replace(/&nbsp;/, '')
    )
    .toArray();

const getOutputStringFromRow = (rows, date) => {
    return rows.reduce(
        (acc, row) => `${acc}${row.teamName1} (${row.team1Odds[ 0 ]}) vs ${row.teamName2} (${row.team2Odds[ 0 ]}) @ ${date} ${row.time}m\n`,
        ''
    );
};

const getBookData = ($) => {
    //take only nearest date
    const dateGroup = $(`#${BOOKS_DATA_HTML_ID}`).find('.dateGroup').first();
    const date = getTextFromCheerioObject($(dateGroup).find('.date')[ 0 ]);
    const rows = $(dateGroup).find('.event-holder').map((index, row) => {
        return {
            teamName1: getTeamName($, row, 0),
            teamName2: getTeamName($, row, 1),
            time: getGameTime($, row),
            team1Odds: getOdds($, row, 0),
            team2Odds: getOdds($, row, 1),
        };
    }).toArray();
    return getOutputStringFromRow(rows, date);
};

const getTotals = async () => {
    const response = await doRequest(TOTALS_REQUEST_OPTIONS);
    const $ = parsePageToDomObject(response);
    return getBookData($);
};

const getSpreads = async () => {
    const response = await doRequest(SPREAD_REQUEST_OPTIONS);
    const $ = parsePageToDomObject(response);
    return getBookData($);
};

const getML = async () => {
    const response = await doRequest(ML_REQUEST_OPTIONS);
    const $ = parsePageToDomObject(response);
    return getBookData($);
};

module.exports = {
    getTotals,
    getSpreads,
    getML,
};
