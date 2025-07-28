const base_url = "https://pydolarve.org";

const bcv_url = `${base_url}/api/v1/dollar?page=bcv`;
const bcv_logo = document.getElementById("bcv_logo");
const bcv_rate_container = document.getElementById("bcv_rate_container");

//const bcv_eur_url = `${base_url}/api/v1/eur?page=bcv`;

const enparalelo_url = `${base_url}/api/v1/dollar?page=enparalelovzla`;
const enparalelo_logo = document.getElementById("enparalelo_logo");
const enparalelo_title = document.getElementById("enparalelo_title");
const enparalelo_rate_container = document.getElementById("enparalelo_rate_container");

const average_container = document.getElementById("average_container");

const date = document.getElementById("date");


async function getRates(url1) {
    const res1 = await fetch(url1);
    const data1 = await res1.json();

    //const res2 = await fetch(url2);
    //const data2 = await res2.json();

    console.log(data1);

    let bcv_rate;
    let enparalelo_rate;

    if(res1.status !== 200) {
        console.log("Hubo un error: " + res1.status);
    } else {
        bcv_rate = data1.monitors.usd.price;
        bcv_rate_container.innerHTML = `<span>${bcv_rate.toFixed(1)}</span> Bs./USD`;

        enparalelo_rate = data1.monitors.eur.price;
        enparalelo_rate_container.innerHTML = `<span>${enparalelo_rate.toFixed(1)}</span> Bs./Euro`
    }

    //console.log(data2);

    
/*
    if(res2.status !== 200) {
        console.log("Hubo un error: " + res2.status);
    } else {
        //const img = document.createElement("img");
        //img. src = data2.monitors.enparalelovzla.image;
        //enparalelo_logo.appendChild(img);

        //enparalelo_title.innerHTML = `${data2.monitors.enparalelovzla.title}`
    }
*/
    let average_rate;

    if(res1.status == 200) {
        average_rate = (bcv_rate+enparalelo_rate)/2;
        average_container.innerHTML = `<span>${average_rate.toFixed(1)}</span> Bs./USD`;

        date.innerHTML = `${data1.datetime.date}`;
    } else {
        average_container.innerHTML = "Ha habido un error al consultar las tasas";
    }
    
}

getRates(bcv_url);
