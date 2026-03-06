FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

COPY ["WEB_API/WEB_API.csproj", "WEB_API/"]
RUN dotnet restore "WEB_API/WEB_API.csproj"

COPY . .
WORKDIR /source/WEB_API
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "WEB_API.dll"]
