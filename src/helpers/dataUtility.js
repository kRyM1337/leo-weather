module.exports = {
    //For current weather calls
    convertCurrent: (json) => {
        const weather = {
            'City': json.name,
            'Temperature': `${Math.round(json.main.temp)} ° F`,
            'Humidity': `${json.main.humidity} %`,
            'Visibility': `${(json.visibility / 1000).toFixed(0)} miles`,
            'WindSpeed': `${Math.round(json.wind.speed)} mph`,
            'Sunrise': `${timeStamp(json.sys.sunrise)}`,
            'Sunset': `${timeStamp(json.sys.sunset)}`
        }
        Object.defineProperty(weather, 'iconUrl', {
            value: `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`,
            enumerable: false
        });

        return weather;
    },
    convertFiveday: (json) => {
        // let weatherArray = []
        // for (let i = 0; i < 5; i++) {
        let weather = {
            'City': json.city.name,
            'Temperature': `${Math.round(json.list[1].main.temp)} ° F`,
            'Humidity': `${json.list[1].main.humidity} %`,
            'WindSpeed': `${Math.round(json.list[1].wind.speed)} mph`,
            'Sunrise': `${timeStamp(json.city.sunrise)}`,
            'Sunset': `${timeStamp(json.city.sunset)}`
        }
        Object.defineProperty(weather, 'iconUrl', {
            value: `http://openweathermap.org/img/wn/${json.list[1].weather[0].icon}@2x.png`,
            enumerable: false
        });

        // weatherArray.push(weather)
        // }


        return weather;
    }
}


function timeStamp(unixTime) {
    //@TO-DO Need to fix local time issue when calculating other countries
    let date = new Date(unixTime * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    return `${hours}:${minutes.substr(-2)}`
}

//Removed following properties: json.main.pressure
//'Description: ': json.weather[0].description,
