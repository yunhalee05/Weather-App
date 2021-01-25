window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector('.temperature span');


    // 위치 허용할때 위치 접근해서 
    if(navigator.geolocation){ 
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // api이용한다. 
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            // api fetch후에 정보 받는다. 
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                // currently에서 정보를 뽑아오는데, 매번 data.currently.~의 식이아닌 {temperature}와 같은 식으로 쓸 수 있도록 설정한다.   
                // data.currently.temperature; 
                console.log(data);
                const {temperature, summary, icon}= data.currently;
                // Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                // FORMULA FOR CELSIUS
                let celsius = (temperature - 32)  * (5 / 9);

                // Set Icon
                setIcons(icon, document.querySelector('.icon'));

                // 도씨로 온도 바뀌도록 하기. 화씨<->도씨
                // Change temperature to Celsius/Farenheit
                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent ==="F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;

                    }
                })


            });
        });
    } 

    // API의 icon을 따다가 아이콘을 입력하도록 한다. 
    function setIcons(icon,iconID){
        const skycons = new Skycons({color :"white"});
        // 이름을 얻고 대문자로 바꾼다. 
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        // 실행한다.
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});