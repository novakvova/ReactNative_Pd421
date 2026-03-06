@echo off

echo Docker login...
docker login

echo Building Docker image api...
docker build -t p421-api . 

echo Tagging Docker image api...
docker tag p421-api:latest novakvova/p421-api:latest

echo Pushing Docker image api to repository...
docker push novakvova/p421-api:latest

echo Done ---api---!
pause
 