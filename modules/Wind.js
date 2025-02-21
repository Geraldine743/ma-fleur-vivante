
class Wind {
    constructor (props) {
        const {lat,long}=props
        this.lat=lat
        this.long=long
        this.init ()

    }
    init () {
        this.buildUrl ()
        this.getWindData ()
        console.log (this.lat,this.long)
    }
    buildUrl (){
        const base ='https://api.open-meteo.com/v1/forecast'
        const requiredLatitude='latitude='+this.lat
        const requiredLongitude='longitude='+this.long
        const params = ['wind_speed_10m','wind_direction_10m']
        const paramsStringList =params.join (',')

        this.url = `${base}?${requiredLatitude}&${requiredLongitude}&current=${paramsStringList}`

    }
    getWindData () {
        fetch (this.url)
            .then (Response => Response.json())
            .then ( data => {
            })
    }
}
export { Wind }