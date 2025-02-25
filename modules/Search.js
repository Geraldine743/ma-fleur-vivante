import { Wind } from './Wind.js'
class Search {
    constructor () {
        this.input=document.querySelector ('.js-search-input')
        this.form=document.querySelector ('.js-search-form')
        this.cities= []

        this.init ()
    }
    init () {
        this.watchUserInput ()
        this.getCities ()
        this.getInputSuggestion ()
    
    }
    watchUserInput () {
        this.form.addEventListener ('submit', (event)=> {
            event.preventDefault ()
            this.getLatLong ()
            this.form.reset ()
        })
    }
    getLatLong () {
        const cityName = this.input.value
        const cityData = this.getCityData (cityName)
        if (cityData) {
            const lat = cityData.lat
            const long = cityData.lng
            new Wind ({lat,long})
        }else{
            alert ("La ville renseignée n'existe pas ou n'est pas disponible")
        }  
    }

    getCities () {
        fetch ('../data/france-cities.json')
            .then (response => response.json ())
            .then ( data => {
                this.cities = data
            })
        }

    /*getCityData (cityName) {
        let cityData = {}
        const cityNameLower = cityName.toLowerCase ()
        for (let i = 0; i< this.cities.length ; i++) {
            const cityNameInDataLower=this.cities[i].city.toLowerCase ()
            if (cityNameLower===cityNameInDataLower) {
                cityData = this.cities [i]
                break
            }
        }
        console.log (cityData)
        return cityData
    }*/

    getCityData (cityName) {
        const cityNameLower = cityName.toLowerCase ()
        const cityData = this.cities.find ((cityObject)=>cityObject.city.toLowerCase ()=== cityNameLower)
        return cityData
    }
    getInputSuggestion () {
        this.input.addEventListener ('keyup', (event)=> {
            const input= this.input.value
            const result = this.cities.filter(item=>item.city.toLowerCase().startsWith(input.toLowerCase()))
            let suggestion =''
            if (input!=""){
                result.forEach (resultItem =>
                    suggestion+= `<div class="suggestion">${resultItem.city}</div>`)}

            document.getElementById('suggestion').innerHTML=suggestion
        })
       
    }
}

export { Search }