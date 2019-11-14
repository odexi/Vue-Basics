<template>
    <v-container>
        <input v-model="myName" />
        <h4>{{ city + ', ' + country }}</h4>
        <span>{{ clickedTemp }}</span>
        <v-row>
            <v-col v-for="(weather, index) in weathers" :key="index">
                <v-card>
                    <v-card-title>
                        <h4>
                            {{ weekDays[weather.date.getDay()] + ' ' + formatDate(weather.date) }}
                        </h4>
                    </v-card-title>
                    <v-divider></v-divider>
                    <Temperature v-for="(temp, index) in weather.temps" 
                    :key="index" 
                    :temp="temp"
                    @tempClicked="onTempClick"
                    />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios';
import Temperature from './Temperature.vue';
import { mapState } from 'vuex';

const scripts = require("../scripts.js");

export default {

    components: {
        Temperature
    },

    computed: {
        ...mapState(["weathers"]),

        myName: {
            get () {
                return this.$store.state.name;
            },
            set (value) {
                this.$store.dispatch('setName', value);
            }
        },

        lowerCasedName () {
            return this.$store.getters.nameLowerCase;
        },
    },

    data () {
        return {
            country: '',
            city: '',
            weekDays: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
            clickedTemp: '',
        }
    },
    methods: {
        async getWeatherData() {
            const url = "https://api.openweathermap.org/data/2.5/forecast/";

            const result = await axios.get(url, 
                {
                    params: {
                        q: "vantaa, fi",
                        units: "metric",
                        appId: "51156b18ec42c8c3724b49fbb0018c05"
                    }
                }
            )
            

            const weatherData = result.data;

            const days = scripts.mapTemps(weatherData);
            
            this.city = weatherData.city.name;
            this.country = weatherData.city.country;

            this.$store.dispatch('setWeather', days);
        },

        formatDate(date) {
            return date.getDate() + "." + (date.getMonth() + 1) + ".";
        },

        onTempClick(temp) {
            this.clickedTemp = temp.temp;
        }
    },

    mounted () {
        this.getWeatherData();
    }
}
</script>
<style scoped>

</style>