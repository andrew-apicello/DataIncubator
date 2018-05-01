import sys
import matplotlib.pyplot as plt
import numpy as np
# from matplotlib.finance import candlestick2_ohlc
import matplotlib.ticker as ticker
import datetime as datetime

time = list(map(float,sys.stdin.readline().split(",")))
time.reverse()
first = sys.stdin.readline()
first_closes= list(map(float,sys.stdin.readline().split(",")))
first_closes.reverse()
second = sys.stdin.readline()
second_closes = list(map(float,sys.stdin.readline().split(",")))
second_closes.reverse()

#ensure the lengths of both arrays are the same
if (len(first_closes) != len(second_closes)):
	first_closes_length = len(first_closes)
	second_closes_length = len(second_closes)

	if first_closes_length > second_closes_length:
		slice_length = first_closes_length - second_closes_length
		first_closes = first_closes[slice_length:]
	else:
		slice_length = second_closes_length - first_closes_length
		second_closes = second_closes[slice_length:]


correlation_coefficient = np.corrcoef(first_closes,second_closes)
print(correlation_coefficient)
