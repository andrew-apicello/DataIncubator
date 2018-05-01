const express = require("express");
const app = express();
const path = require("path");
const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient();
const PythonShell = require('python-shell');
const apiURI = 'https://api.gdax.com';
const moment = require('moment');

const statistics = require('blockchain.info/statistics')

const websocket = new Gdax.WebsocketClient(['BTC-USD', 'ETH-USD']);


const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
	console.log("App running on port " + PORT + "!");
});

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "./index.html"));
});

app.get('/images/financial-translation-service.jpg', function(req, res) {
	res.sendFile(path.join(__dirname + '/images/financial-translation-service.jpg'));
});

app.get('/mychart.js', function(req, res) {
	res.sendFile(path.join(__dirname + '/mychart.js'));
});

app.get('/statisticscharts.js', function(req, res) {
	res.sendFile(path.join(__dirname + '/statisticscharts.js'));
});

app.get('/style.css', function(req, res) {
	res.sendFile(path.join(__dirname + '/style.css'));
});


app.get("/historicalprices/bitcoin", function(req, res) {
	var getHistoricalPrices = async function(crypto) {
		const granularity = 60 * 60 * 24  //number of seconds
		try {
			const prices = await publicClient.getProductHistoricRates(crypto,{ granularity: granularity });
			var timePre = [];
			var closePre = [];
			prices.map(x => {
				var dateString = moment.unix(x[0]).format("MM/DD/YYYY");

				timePre.push(dateString);
				closePre.push(x[4]);
			});
			var returnObject = {
				time: [],
				close: []
			};
			returnObject.time = timePre.reverse();
			returnObject.close = closePre.reverse();
			res.send(returnObject);
		} catch (error){
			console.log(error);
		}
	}
	getHistoricalPrices("BTC-USD");
});

app.get("/historicalprices/litecoin", function(req, res) {
	var getHistoricalPrices = async function(crypto) {
		const granularity = 60 * 60 * 24  //number of seconds
		try {
			const prices = await publicClient.getProductHistoricRates(crypto,{ granularity: granularity });
			var timePre = [];
			var closePre = [];
			prices.map(x => {
				var dateString = moment.unix(x[0]).format("MM/DD/YYYY");

				timePre.push(dateString);
				closePre.push(x[4]);
			});
			var returnObject = {
				time: [],
				close: []
			};
			returnObject.time = timePre.reverse();
			returnObject.close = closePre.reverse();
			res.send(returnObject);
		} catch (error){
			console.log(error);
		}
	}
	getHistoricalPrices("LTC-USD");
});

app.get("/historicalprices/ethereum", function(req, res) {
	var getHistoricalPrices = async function(crypto) {
		const granularity = 60 * 60 * 24  //number of seconds
		try {
			const prices = await publicClient.getProductHistoricRates(crypto,{ granularity: granularity });
			var timePre = [];
			var closePre = [];
			prices.map(x => {
				var dateString = moment.unix(x[0]).format("MM/DD/YYYY");

				timePre.push(dateString);
				closePre.push(x[4]);
			});
			var returnObject = {
				time: [],
				close: []
			};
			returnObject.time = timePre.reverse();
			returnObject.close = closePre.reverse();
			res.send(returnObject);
		} catch (error){
			console.log(error);
		}
	}
	getHistoricalPrices("ETH-USD");
});






app.get("/response/:ask", function(req, res) {
	var chartType = req.params.ask;
	console.log(chartType);

	if (chartType == 'pool'){
		asyncCallPool();
	} else {
		asyncCall();
	}

	async function asyncCall() {
		var result = await statistics.getChartData(chartType);
		var returnObject = {
			time: [],
			data: []
		};

		result.map(x => {
			var dateString = moment.unix(x["x"]).format("MM/DD/YYYY");

			returnObject.time.push(dateString);
			returnObject.data.push(x["y"]);
		});
		res.send(returnObject);
	}

	async function asyncCallPool() {
		var result = await statistics.getPoolData();
		res.send(result);
	}
	

	 // hash-rate
    //estimated-transaction-volume-usd
    //statistics.getPoolData(options)
    //market-price

});



// runSocket();

function runSocket(){
	websocket.on('message', data => {
		if (data.product_id == 'BTC-USD' && data.price != undefined){
			console.log(data);
		}
	});
	websocket.on('error', err => {
		console.log("An error has occured")
		console.log(err)
	});
	websocket.on('close', () => {
		console.log("GDAX WebSocket Terminated")
	});

}


