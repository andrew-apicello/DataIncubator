
    var label;
    var time;
    var close;
    var sma = [];
    var sma2 = [];


//Lookback One
var slider = document.getElementById("slider");
var output = document.getElementById("demo");

    output.innerHTML = slider.value; // Display the default slider value
    var lookback =slider.value;
    var smaLabel = lookback + " Day Moving Average";
    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
      output.innerHTML = this.value;
      lookback = this.value;

      simpleMovingAverage(lookback);

      function addData(label, data) {
        var smaLabel = lookback + " Day Moving Average";
        mychart.data.datasets[1].data = sma;
        mychart.data.datasets[1].label = smaLabel;
        mychart.update();
      }
      addData()
    }



//Lookback Two
var slider2 = document.getElementById("slider2");
var output2 = document.getElementById("demo2");

    output.innerHTML = slider.value; // Display the default slider value
    var lookback2 =slider2.value;
    var smaLabel2 = lookback2 + " Day Moving Average";
    // Update the current slider value (each time you drag the slider handle)
    slider2.oninput = function() {
      output2.innerHTML = this.value;
      lookback2 = this.value;

      simpleMovingAverageTwo(lookback2);

      function addDataTwo(label, data) {
        var smaLabel2 = lookback2 + " Day Moving Average";
        mychart.data.datasets[2].data = sma2;
        mychart.data.datasets[2].label = smaLabel2;
        mychart.update();
      }
      addDataTwo()
    }



    function simpleMovingAverage(lookback){
      sma = [];
      
      for (var y = 0; y < lookback; y++){
        sma.push(Number.NAN);
      }
      for (var x = lookback; x <= close.length; x++){
        var sum = 0;
        for (var i = 0; i < lookback; i ++){
          sum = sum + close[x-i];
        }
        sma.push(sum/lookback);
      }
    }

    function simpleMovingAverageTwo(lookback){
      sma2 = [];
      
      for (var y = 0; y < lookback; y++){
        sma2.push(Number.NAN);
      }
      for (var x = lookback; x <= close.length; x++){
        var sum = 0;
        for (var i = 0; i < lookback; i ++){
          sum = sum + close[x-i];
        }
        sma2.push(sum/lookback);
      }
    }

    var mychart;

    var ctx = document.getElementById("myChart").getContext('2d');

    

    function drawChart(cryptoCurrency){

      var urlGet = "/historicalprices/" + cryptoCurrency;

      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      cryptoCurrency = capitalizeFirstLetter(cryptoCurrency);

      label = cryptoCurrency + " Daily Close";


      $.ajax({
        url: urlGet,
        method: "GET"
      }).done(function(response){
        time = response.time;
        close = response.close;

        simpleMovingAverage(50);
        simpleMovingAverageTwo(25);



        mychart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: time,
            datasets: [{ 
              data: close,
              label: label,
              borderColor: "#3e95cd",
              fill: false
            } ,{ 
              data: sma,
              label: smaLabel,
              borderColor: "#f44245",
              fill: false
            },{ 
              data: sma2,
              label: smaLabel2,
              borderColor: "#ef8f10",
              fill: false
            }
            ]
          },
          options: {
            title: {
              display: true,
              text: 'Historical Prices of Crypto Currencies in USD'
            }
          }
        });
      });
    }

    drawChart("bitcoin")


    function serveBitcoin() {
      drawChart("bitcoin");
      output.innerHTML = 50;
      output2.innerHTML = 25;
      slider.value = 50;
      slider2.value = 25;
    }

    function serveLitecoin() {
      drawChart("litecoin");
      output.innerHTML = 50;
      output2.innerHTML = 25;
      slider.value = 50;
      slider2.value = 25;
    }

    function serveEthereum() {
      drawChart("ethereum");
      output.innerHTML = 50;
      output2.innerHTML = 25;
      slider.value = 50;
      slider2.value = 25;
    }
