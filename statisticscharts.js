var ctx2 = document.getElementById("statisticsChart1").getContext('2d');

var time = [];
var bitcoinSupply = [];
var transactionVolume = [];
var price = [];
var priceEstimate = [];


var hashrateGrowth = [];

var velocity = 0.018;
var potential = 1;
var hashrateImportance = 1;


$.ajax({
  url: "/response/estimated-transaction-volume-usd",
  method: "GET"
}).done(function(response){
  time = response.time;
  transactionVolume = response.data;

  $.ajax({
    url: "response/total-bitcoins",
    method: "GET"
  }).done(function(response){
    bitcoinSupply = response.data;

    $.ajax({
      url: "response/market-price",
      method: "GET"
    }).done(function(response){
      price = response.data;
      $.ajax({
        url: "response/hash-rate",
        method: "GET"
      }).done(function(response){
        hashrate = response.data;

        


        for (var x = 0; x < bitcoinSupply.length; x++){

          if (x == 0){
            var singleHashrateGrowth = (hashrate[x+1]-hashrate[x])/hashrate[x];
        
          } else {
            var singleHashrateGrowth = (hashrate[x]-hashrate[x-1])/hashrate[x-1];
          }

            hashrateGrowth.push(singleHashrateGrowth);
            
            var estimate = transactionVolume[x]*potential/velocity/bitcoinSupply[x]+hashrateGrowth[x]*hashrateImportance*1000;
            priceEstimate.push(estimate);

        }

      drawChart2();
    });
    });

    });
  });

  

  function drawChart2(){
    statisticsChart = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: time,
        datasets: [{ 
          data: priceEstimate,
          label: "Price Estimate (USD)",
          borderColor: "#8a1cce",
          fill: false
        },{ 
          data: price,
          label: "Actual Price (USD)",
          borderColor: "#18eae6",
          fill: false
        }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Velocity of Bitcoin'
        }
      }
    });
  };


//Lookback Three
var slider3 = document.getElementById("slider3");
var output3 = document.getElementById("demo3");

    output.innerHTML = slider.value; // Display the default slider value
    var lookback3 =slider3.value;
    var smaLabel3 = lookback3 + " Day Moving Average";
    // Update the current slider value (each time you drag the slider handle)
    slider3.oninput = function() {
      output3.innerHTML = this.value;
      lookback3 = this.value;

      simpleMovingAverageThree(lookback3);

      function addDataThree() {
        statisticsChart.data.datasets[0].data = priceEstimate;
        statisticsChart.data.datasets[0].label = "Price Estimate";
        statisticsChart.update();
      }
      addDataThree()
    }

  function simpleMovingAverageThree(lookback){
      priceEstimate = [];

      hashrateImportance = lookback;

      for (var x = 0; x < 370; x++){
      var newEstimate = transactionVolume[x]*potential/velocity/bitcoinSupply[x]+hashrateGrowth[x]*hashrateImportance*1000;
      priceEstimate.push(newEstimate);

      }
    }

//Lookback Four
var slider4 = document.getElementById("slider4");
var output4 = document.getElementById("demo4");

    output.innerHTML = slider.value; // Display the default slider value
    var lookback4 =slider4.value;
    // Update the current slider value (each time you drag the slider handle)
    slider4.oninput = function() {
      output4.innerHTML = this.value;
      lookback4 = this.value;

      simpleMovingAverageFour(lookback4);

      function addDataFour() {
        statisticsChart.data.datasets[0].data = priceEstimate;
        statisticsChart.data.datasets[0].label = "Price Estimate";
        statisticsChart.update();
      }
      addDataFour()
    }

  function simpleMovingAverageFour(lookback){
      priceEstimate = [];

      potential = lookback;

      for (var x = 0; x < 349; x++){
      var newEstimate = transactionVolume[x]*potential/(velocity)/bitcoinSupply[x]+hashrateGrowth[x]*lookback*1000;
      priceEstimate.push(newEstimate);

      }
    }

// Size of those markets in the future
//   What percentage of the market bitcoin will capture
//   What bitcoins velocity will be
//   What an appropriate discount rate is
//     A function of risk, 30% or more





//Hash Rate can predict price
  //means more miners are joining the network
  //experts and profit driven actors forsee an opportunity
  //means added security for the network
  //This happens when miners suspect an increase in value and offer their computer power to the network.


// How much would an actor would an actor need to spend to create a 51% attack?


//Herfandol herschman index
//The US department of Justice uses this to access potential mergers and acquisitions


//% market share of each entity, square each market share, sum these squares, before multiplying by 10,000

// var percentMarketShareofEachEntity;
// var squareofEachMarketShare;
// var sumOfTheseSquares;
// var product;

// if (product <= 1500){
//   console.log("Competitice Marketplace");
// } else if (product <= 2500){
//   console.log("Moderately Concentrated Marketplace")
// } else {
//   console.log("Highly Concentrated Marketplace")
// }


// var pieData = {
//     datasets: [{
//         data: [10, 20, 30]
//     }],

//     // These labels appear in the legend and in the tooltips when hovering different arcs
//     labels: [
//         'Red',
//         'Yellow',
//         'Blue'
//     ]
// };

// var myPieChart = new Chart(ctx,{
//     type: 'pie',
//     data: pieData
// });


