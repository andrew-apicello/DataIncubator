const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient();
const PythonShell = require('python-shell');
const apiURI = 'https://api.gdax.com';



exports.getTickerSymbols = async function() {
  try {
    const products = await publicClient.getProducts();
    for (var i = 0; i < products.length; i ++){
    	console.log(products[i].id)
    }
  } catch (error) {
    console.log(error);
  }
}


exports.getHistoricalPrices = async function() {
	const granularity = 60 * 60 * 24  //number of seconds
	try {
		const prices = await publicClient.getProductHistoricRates("BTC-USD",{ granularity: granularity });
		// console.log(prices);
		pythonAnalysis(prices);
	} catch (error){
		console.log(error);
	}
}

exports.correlationAnalysis = function(first,second) {

	getPrices = async function() {
	const granularity = 60 * 60 * 24  //number of seconds

	try {
		const firstPrices = await publicClient.getProductHistoricRates(first,{ granularity: granularity });
		const secondPrices = await publicClient.getProductHistoricRates(second,{ granularity: granularity });
		// console.log(prices);
		pythonCorrelationAnalysis(first,firstPrices,second,secondPrices);
	} catch (error){
		console.log(error);
	}
	}

	getPrices()

	function pythonCorrelationAnalysis(first,firstPrices,second,secondPrices){
		console.log("Begin Python Correlation Analysis");
		
		var time = [];
		var firstClose = [];
		var secondClose = [];

		firstPrices.map(x => {
			time.push(x[0])
		 	firstClose.push(x[4])
		});

		secondPrices.map(x => {
			time.push(x[0])
		 	secondClose.push(x[4])
		});

		var pyshell = new PythonShell('./CorrelationAnalysis.py');

		pyshell.send(time);
		pyshell.send(first);
		pyshell.send(firstClose);
		pyshell.send(second);
		pyshell.send(secondClose);

		pyshell.on('message', function (message) {
			console.log("Python Output");
			console.log(message);
		});
		pyshell.end(function (err) {
			if (err) throw err;
			console.log('Python Script Complete');
		});

	}

}

exports.movingAverageAnalysis = function(cryptoAsset){

	getPrices = async function() {
	const granularity = 60*60*24  //number of seconds

	try {
		const prices = await publicClient.getProductHistoricRates(cryptoAsset,{ granularity: granularity });
		// console.log(prices);
		pythonMovingAverageAnalysis(prices,cryptoAsset);
	} catch (error){
		console.log(error);
	}
	}

	getPrices()

	function pythonMovingAverageAnalysis(data,cryptoAsset){

		console.log("Begin Moving Average Analysis");
		
		var time = []
		var close = []

		data.map(x => {
			time.push(x[0])
			close.push(x[4])
		})

		var pyshell = new PythonShell('./MovingAverageAnalysis.py');

		pyshell.send(time);
		pyshell.send(close);
		pyshell.send(cryptoAsset);

		pyshell.on('message', function (message) {
			console.log("Python Output");
			console.log(message);
		});
		pyshell.end(function (err) {
			if (err) throw err;
			console.log('Python Script Complete');
		});
	}
}