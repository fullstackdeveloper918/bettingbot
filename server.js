// Wager API Technologies

const express = require('express');
const app = express();
const cors = require('cors');
const rp = require('request-promise');
const bodyParser = require('body-parser');

var NFLSpreads = require('./controllers/nfl-spreads.js');
var NFLMoneyline = require('./controllers/nfl-ml.js');
var NFLTotals = require('./controllers/nfl-totals.js');
var NFLFutures = require('./controllers/nfl-futures.js');

var NBASpreads = require('./controllers/nba-spreads.js');
var NBAMoneyline = require('./controllers/nba-ml.js');
var NBATotals = require('./controllers/nba-totals.js');
var NBAFutures = require('./controllers/nba-futures.js');

var NCAAFSpreads = require('./controllers/ncaaf-spreads.js');
var NCAAFMoneyline = require('./controllers/ncaaf-ml.js');

const epl = require('./controllers/epl');
const laliga = require('./controllers/la-liga');
const bundesliga = require('./controllers/bundesliga');
const uefa = require('./controllers/uefa');

const nhl = require('./controllers/nhl');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options('*', cors());

// NFL Functions

app.post('/nfl-spread', function (req, res) {
	console.log(req.body.text);
	NFLSpreads.getSpreads()
		.then(data => {
			res.send({response_type: 'in_channel', text: data});
                        res.end();
		})
		.catch(err => {
			res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the spreads.'});
                        res.end();
		});
});

app.post('/nfl-ml', function (req, res) {
	console.log(req.body.text);
	NFLMoneyline.getML()
		.then(data => {
			res.send({response_type: 'in_channel', text: data});
                        res.end();
		})
		.catch(err => {
			res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the spreads.'});
                        res.end();
		});
});

app.post('/nfl-totals', function (req, res) {
	console.log(req.body.text);
	NFLTotals.getTotals()
		.then(data => {
			res.send({response_type: 'in_channel', text: data});
                        res.end();
		})
		.catch(err => {
			res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the spreads.'});
                        res.end();
		});
});

app.post('/nfl-futures', function (req, res) {
	console.log(req.body.text);
	NFLFutures.getFutures()
		.then(data => {
			res.send({response_type: 'in_channel', text: data});
                        res.end();
		})
		.catch(err => {
			res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the spreads.'});
                        res.end();
		});
});

// NFL Futures

app.post('/nfl-futures-sb', function (req, res) {
	console.log(req.body.text);
	NFLFutures.getFutures(0)
		.then(data => {
			res.send({response_type: 'in_channel', text: data});
                        res.end();
		})
		.catch(err => {
			console.error(err);
			res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the spreads.'});
                        res.end();
		});
});


app.post('/nfl-futures-afc', function (req, res) {
	console.log(req.body.text);
	NFLFutures.getFutures(1)
		.then(data => {
			res.send({response_type: 'in_channel', text: data});
                        res.end();
		})
		.catch(err => {
			console.error(err);
			res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the spreads.'});
                        res.end();
		});
});

app.post('/nfl-futures-nfc', function (req, res) {
	console.log(req.body.text);
	NFLFutures.getFutures(2)
		.then(data => {
			res.send({response_type: 'in_channel', text: data});
                        res.end();
		})
		.catch(err => {
			console.error(err);
			res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the spreads.'});
                        res.end();
		});
});

// NBA Functions

app.post('/nba-spread', function (req, res) {
	console.log(req.body.text);
	NBASpreads.getSpreads()
		.then(data => {
			res.send({response_type: 'in_channel', text: data});
                        res.end();
		})
		.catch(err => {
			res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the spreads.'});
                        res.end();
		});
});

app.post('/nba-ml', function (req, res) {
	console.log(req.body.text);
	NBAMoneyline.getML()
		.then(data => {
			res.send({response_type: 'in_channel', text: data});
                        res.end();
		})
		.catch(err => {
			res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the spreads.'});
                        res.end();
		});
});

app.post('/nba-totals', function (req, res) {
	console.log(req.body.text);
	NBATotals.getTotals()
		.then(data => {
			res.send({response_type: 'in_channel', text: data});
                        res.end();
		})
		.catch(err => {
			res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the spreads.'});
                        res.end();
		});
});

app.post('/nba-futures', function (req, res) {
	console.log(req.body.text);
	NBAFutures.getFutures(0)
		.then(data => {
			res.send({response_type: 'in_channel', text: data});
                        res.end();
		})
		.catch(err => {
			console.error(err);
			res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the spreads.'});
                        res.end();
		});
});

// NCAAF Functions

app.post('/cfb-spread', function (req, res) {
	console.log(req.body.text);
	NCAAFSpreads.getSpreads()
		.then(data => {
			res.send({response_type: 'in_channel', text: data});
                        res.end();
		})
		.catch(err => {
			res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the spreads.'});
                        res.end();
		});
});

app.post('/cfb-ml', function (req, res) {
	console.log(req.body.text);
	NCAAFMoneyline.getML()
		.then(data => {
			res.send({response_type: 'in_channel', text: data});
                        res.end();
		})
		.catch(err => {
			res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the spreads.'});
                        res.end();
		});
});

// EPL Functions

app.post('/epl-spread', function (req, res) {
    console.log(req.body.text);
    epl.getSpreads()
        .then(data => {
            res.send({response_type: 'in_channel', text: data});
            res.end();
        })
        .catch(err => {
            res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the spreads.'});
            res.end();
        });
});

app.post('/epl-ml', function (req, res) {
    console.log(req.body.text);
    epl.getML()
        .then(data => {
            res.send({response_type: 'in_channel', text: data});
            res.end();
        })
        .catch(err => {
            res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the mls.'});
            res.end();
        });
});

app.post('/epl-totals', function (req, res) {
    console.log(req.body.text);
    epl.getTotals()
        .then(data => {
            res.send({response_type: 'in_channel', text: data});
            res.end();
        })
        .catch(err => {
            res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the mls.'});
            res.end();
        });
});

// Bundesliga Functions

app.post('/bundesliga-spread', function (req, res) {
    console.log(req.body.text);
    bundesliga.getSpreads()
        .then(data => {
            res.send({response_type: 'in_channel', text: data});
            res.end();
        })
        .catch(err => {
            res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the spreads.'});
            res.end();
        });
});

app.post('/bundesliga-ml', function (req, res) {
    console.log(req.body.text);
    bundesliga.getML()
        .then(data => {
            res.send({response_type: 'in_channel', text: data});
            res.end();
        })
        .catch(err => {
            res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the mls.'});
            res.end();
        });
});

app.post('/bundesliga-totals', function (req, res) {
    console.log(req.body.text);
    bundesliga.getTotals()
        .then(data => {
            res.send({response_type: 'in_channel', text: data});
            res.end();
        })
        .catch(err => {
            res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the mls.'});
            res.end();
        });
});

// La Liga Functions

app.post('/la-liga-spread', function (req, res) {
    console.log(req.body.text);
    laliga.getSpreads()
        .then(data => {
            res.send({response_type: 'in_channel', text: data});
            res.end();
        })
        .catch(err => {
            res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the spreads.'});
            res.end();
        });
});

app.post('/la-liga-ml', function (req, res) {
    console.log(req.body.text);
    laliga.getML()
        .then(data => {
            res.send({response_type: 'in_channel', text: data});
            res.end();
        })
        .catch(err => {
            res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the mls.'});
            res.end();
        });
});

app.post('/la-liga-totals', function (req, res) {
    console.log(req.body.text);
    laliga.getTotals()
        .then(data => {
            res.send({response_type: 'in_channel', text: data});
            res.end();
        })
        .catch(err => {
            res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the totals.'});
            res.end();
        });
});

// Champions League Uefa Functions

app.post('/uefa-spread', function (req, res) {
    console.log(req.body.text);
    uefa.getSpreads()
        .then(data => {
            res.send({response_type: 'in_channel', text: data});
            res.end();
        })
        .catch(err => {
            res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the spreads.'});
            res.end();
        });
});

app.post('/uefa-ml', function (req, res) {
    console.log(req.body.text);
    uefa.getML()
        .then(data => {
            res.send({response_type: 'in_channel', text: data});
            res.end();
        })
        .catch(err => {
            res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the mls.'});
            res.end();
        });
});

app.post('/uefa-totals', function (req, res) {
    console.log(req.body.text);
    uefa.getTotals()
        .then(data => {
            res.send({response_type: 'in_channel', text: data});
            res.end();
        })
        .catch(err => {
            res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the totals.'});
            res.end();
        });
});

// NHL

app.post('/nhl-spread', function (req, res) {
    console.log(req.body.text);
    nhl.getSpreads()
        .then(data => {
            res.send({response_type: 'in_channel', text: data});
            res.end();
        })
        .catch(err => {
            res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the spreads.'});
            res.end();
        });
});

app.post('/nhl-ml', function (req, res) {
    console.log(req.body.text);
    nhl.getML()
        .then(data => {
            res.send({response_type: 'in_channel', text: data});
            res.end();
        })
        .catch(err => {
            res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the mls.'});
            res.end();
        });
});

app.post('/nhl-totals', function (req, res) {
    console.log(req.body.text);
    nhl.getTotals()
        .then(data => {
            res.send({response_type: 'in_channel', text: data});
            res.end();
        })
        .catch(err => {
            res.send({response_type: 'in_channel', text: 'Sorry, we had an accident retreiving the totals.'});
            res.end();
        });
});
a

// Is The Server Running

app.listen(3000, function () {
  	console.log('Magic happening on port 3000!')
});
