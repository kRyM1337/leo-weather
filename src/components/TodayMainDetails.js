import React, { Component } from 'react'
import '../styles/WeatherApp.css'
import { grabCurrentWeather, grabFivedayWeather } from '../helpers/weatherApi'


//@TO-DO API data list needs unique keys for each li
export class TodayMainDetails extends Component {
    constructor(props) {
        super(props)
        this.state = { latitude: this.props.lat, longitude: this.props.long, todayInfo: {}, tomorrowInfo: {}, fiveDay: [], cityId: this.props.cityId, iconUrl: '', tomorrowIcon: '' }
    }

    componentDidMount() {
        let lat = this.state.latitude
        let long = this.state.longitude
        let city = this.state.cityId

        if (lat !== null && long !== null) {
            this.getCurrentCoordsWeather(lat, long)
            this.getFivedayCoordsWeather(lat, long)
        } else if (city !== '') {
            this.getCurrentCityWeather(city)
            this.getFivedayCityWeather(city)
        }
        //Select default tab on DOM load
        document.getElementById("defaultOpen").click()
    }

    componentDidUpdate(prevProps) {
        let city = this.props.cityId
        let prevCity = prevProps.cityId
        let lat = this.props.lat
        let prevLat = prevProps.lat
        let long = this.props.long
        let prevLong = prevProps.long

        if (city !== prevCity) {
            this.getCurrentCityWeather(city)
            this.getFivedayCityWeather(city)

        } else if (lat !== prevLat && long !== prevLong) {
            this.getCurrentCoordsWeather(lat, long)
            this.getFivedayCoordsWeather(lat, long)
        }
    }

    //Handles toggling tabs
    openTab(e) {
        e.preventDefault()
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(e.target.innerHTML.toLowerCase()).style.display = "initial";
        e.currentTarget.className += " active";
    }

    //Helper functions
    getCurrentCoordsWeather(lat, long) {
        try {
            grabCurrentWeather(lat, long).then(info => {
                const icon = info === undefined ? 'No icon url exists because undefined' : info.iconUrl
                this.setState({
                    todayInfo: info,
                    iconUrl: icon
                })
            })
        } catch (err) {
            console.log(err)
        }

    }

    getFivedayCoordsWeather(lat, long) {
        try {
            grabFivedayWeather(lat, long).then(info => {
                const icon = info === undefined ? 'No icon url exists because undefined' : info[1].iconUrl
                this.setState({
                    tomorrowInfo: info[1],
                    tomorrowIcon: icon,
                    fiveDay: [...info]
                })
            })
        } catch (error) {
            console.log(error)
        }

    }

    getCurrentCityWeather(city) {
        try {
            grabCurrentWeather(city).then(info => {
                const icon = info === undefined ? 'No icon url exists because undefined' : info.iconUrl
                this.setState({
                    todayInfo: info,
                    iconUrl: icon
                })
            })
        } catch (error) {
            console.log(error)
        }

    }

    getFivedayCityWeather(city) {
        try {
            grabFivedayWeather(city).then(info => {
                const icon = info === undefined ? 'No icon url exists because undefined' : info[1].iconUrl
                this.setState({
                    tomorrowInfo: info[1],
                    tomorrowIcon: icon,
                    fiveDay: [...info]
                })
            })
        } catch (error) {
            console.log(error)
        }

    }

    render() {
        if (this.state.todayInfo === undefined || this.state.tomorrowInfo === undefined || this.state.fiveDay.includes(undefined)) {
            return 'Undefined values found in API calls. Please reload page and try again. If the issue persists please contact app owner @ https://github.com/krym1337'
        } else {
            return (
                <div className="todayDetails">

                    <div className="tab">
                        <button id="defaultOpen" className="tablinks" onClick={this.openTab}>Current</button>
                        <button className="tablinks" onClick={this.openTab}>Tomorrow</button>
                        <button className="tablinks" onClick={this.openTab}>Five</button>
                    </div>

                    <div id="current" className="tabcontent">
                        <div className="oneDayList">
                            {Object.entries(this.state.todayInfo).map(item => <p><img src={require(`../img/${item[0]}.svg`)} alt="" /><div>{item[1]}</div></p>)}
                        </div>

                        <div className="iconRow">
                            <img src={this.state.iconUrl} alt="" />
                            <img src={this.state.iconUrl} alt="" />
                            <img src={this.state.iconUrl} alt="" />
                            <img src={this.state.iconUrl} alt="" />
                        </div>
                    </div>

                    <div id="tomorrow" className="tabcontent">
                        <div className="tomorrowList">
                            {Object.entries(this.state.tomorrowInfo).map(item => <p><img src={require(`../img/${item[0]}.svg`)} alt="" /><div>{item[1]}</div></p>)}
                        </div>

                        <div className="iconRow">
                            <img src={this.state.tomorrowIcon} alt="" />
                            <img src={this.state.tomorrowIcon} alt="" />
                            <img src={this.state.tomorrowIcon} alt="" />
                            <img src={this.state.tomorrowIcon} alt="" />
                        </div>
                    </div>


                    <div id="five" className="tabcontent">
                        <div className="fiveDayList">
                            {this.state.fiveDay.map(day =>
                                Object.entries(day).map(item => <p><img src={require(`../img/${item[0]}.svg`)} alt="" /><div>{item[1]}</div></p>)
                            )
                            }
                        </div>
                    </div>
                </div >
            )
        }
    }
}
export default TodayMainDetails