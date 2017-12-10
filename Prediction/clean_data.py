import csv
from datetime import datetime,timedelta
def getTimeInterval(date):
	x1 = date.replace(hour=1, minute=0, second=0, microsecond=0)
	x2 = date.replace(hour=4, minute=59, second=0, microsecond=0)
	if date >= x1  and date <= x2: return 'T1'
	x1 += timedelta(hours=4)
	x2 += timedelta(hours=4)
	if date >= x1  and date <= x2: return 'T2'
	x1 += timedelta(hours=4)
	x2 += timedelta(hours=4)
	if date >= x1  and date <= x2: return 'T3'
	x1 += timedelta(hours=4)
	x2 += timedelta(hours=4)
	if date >= x1  and date <= x2: return 'T4'
	x1 += timedelta(hours=4)
	x2 += timedelta(hours=4)
	if date >= x1  and date <= x2: return 'T5'
	return 'T6'

def shrinkDistrict(disc):
	if disc >= 1 and disc <= 10: return 1
	if disc >= 11 and disc <= 20:return 2
	if disc >= 21 and disc <= 30:return 3
	if disc >= 31 and disc <= 40:return 4
	return 5

INPUT = 'test.csv'
OUTPUT  = 'output.csv'


with open(INPUT,'r') as csvinput:
    with open(OUTPUT, 'w') as csvoutput:
        writer = csv.writer(csvoutput, lineterminator='\n')
        reader = csv.reader(csvinput)

        all = []
        row = next(reader)
        row  = [row[13], 'weekday', 'timezone']
        
        for row in reader:
            date = datetime.strptime(row[3], '%m/%d/%Y %I:%M:%S %p')
            all.append([shrinkDistrict(int(float(row[13]))),date.strftime("%A"), getTimeInterval(date)])

        writer.writerows(all)