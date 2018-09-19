rem This Batch Script tests connection to server every 20 minutes.
@echo off
:loop
rem assuming test.bat and connection.py are in the same directory
python connection.py > temp.txt rem Run Python Program and save value in temp.txt
set /p OUT=<temp.txt
if not %OUT%==0 goto endit
timeout /t 1200 >null
goto loop

:endit
rm temp.txt
echo "END"