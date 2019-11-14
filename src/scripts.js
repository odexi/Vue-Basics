const mapTemps = (weatherData) => {
    let temps = [];

    weatherData.list.map(weather => {
        let date = new Date(weather.dt * 1000);
        let temp = weather.main.temp;

        temps.push({
            date: date,
            temp: temp
        });
    });

    let days = [];
    let tempsOfOneDay = [];
    let date = null;
    let currentDate;

    temps.map(t => {
        if (date === t.date.getDate() || date === null) {
            date = t.date.getDate();
            currentDate = t.date;
            tempsOfOneDay.push(t);
        }

        if (date !== t.date.getDate()) {
            let newDay = {
                date: currentDate,
                temps: tempsOfOneDay
            };

            days.push(newDay);
            tempsOfOneDay = [];
            date = t.date.getDate();
            tempsOfOneDay.push(t);
        }
        currentDate = t.date;
    });

    let newDay = {
        date: currentDate,
        temps: tempsOfOneDay
    };

    days.push(newDay);

    return days;
}
export{ mapTemps };

// Celsius character: ℃
// const url = "https://api.openweathermap.org/data/2.5/forecast/";
// params: {
//     q: "vantaa, fi",
//     units: "metric",
//     appId: 51156b18ec42c8c3724b49fbb0018c05
//   }
// weekDays: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"]

// formatDate(date) {
//     return date.getDate() + "." + (date.getMonth() + 1) + ".";
// },

{/* 
<v-container>
    <v-row>
        <v-col>
            <v-card>
                <v-card-title>
                    
                </v-card-title>
                <v-divider></v-divider>
                <v-list-item>
                    <v-list-item-content>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </v-col>
    </v-row>
</v-container> 
*/}