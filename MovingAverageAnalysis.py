import sys
import matplotlib.pyplot as plt
import numpy as np
# from matplotlib.finance import candlestick2_ohlc
import matplotlib.ticker as ticker
import datetime as datetime

time = list(map(float,sys.stdin.readline().split(",")))
time.reverse()
close = list(map(float,sys.stdin.readline().split(",")))
close.reverse()
crypto_asset = sys.stdin.readline()

def displayGraph(x,xtitle,y,ytitle,title):

	xdate = [datetime.datetime.fromtimestamp(i) for i in x]
	new_x_date = []
	n = 0
	while n < len(x):
		new_x_date.append(xdate[n])  
		n += 1

	x= new_x_date
	plot_title = crypto_asset + 'Daily Moving Averages' 
	plt.title(plot_title)
	plt.xlabel(xtitle)
	plt.ylabel(ytitle)
	plt.plot(x,y,label=title)


moving_average_array = []

def moving_average(x):
	x_day_moving_average = []
	a = x
	while a < len(close):

		x_day_bracket = []

		for b in range(0,x):
			x_day_bracket.append(close[a-b])

		x_day_bracket = np.array(x_day_bracket)
		x_day_mean = np.mean(x_day_bracket) 

		x_day_moving_average.append(x_day_mean)
		moving_average_array.append(x_day_moving_average)
		a += 1

	new_time = time[x:]
	y_axis = "Price $"

	displayGraph(new_time,"Time",x_day_moving_average,y_axis,y_axis)

# Look back period
moving_average(10)
moving_average(20)
moving_average(50)
moving_average(100)
moving_average(200)


# j = 0
# while j < len(moving_average_array[0]):

# 	if moving_average_array[0][j] == moving_average_array[1][j]:
# 		print(moving_average_array[0][j])
# 		print("Alpha")

# 	j+=1



plt.legend([10,20,50,100,200])
plt.show()