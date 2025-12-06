//https://dolarapi.com/docs/venezuela/

const base_url = "https://ve.dolarapi.com";

const bcv_url = `${base_url}/v1/dolares/oficial`;
const bcv_logo = document.getElementById("bcv_logo");
const bcv_rate_container = document.getElementById("bcv_rate_container");

//const bcv_eur_url = `${base_url}/api/v1/eur?page=bcv`;

const enparalelo_url = `${base_url}/v1/dolares/paralelo`;
const enparalelo_logo = document.getElementById("enparalelo_logo");
const enparalelo_title = document.getElementById("enparalelo_title");
const enparalelo_rate_container = document.getElementById("enparalelo_rate_container");

// const bitcoin_url = `${base_url}/v1/dolares/bitcoin`;
// const bitcoin_logo = document.getElementById("bitcoin_logo");
// const bitcoin_rate_container = document.getElementById("bitcoin_rate_container");

const average_container = document.getElementById("average_container");

const date = document.getElementById("date");


async function getRates(url1, url2) {
    const res1 = await fetch(url1);
    const data1 = await res1.json();

    const res2 = await fetch(url2);
    const data2 = await res2.json();

    // const res3 = await fetch(url3);
    // const data3 = await res3.json();


    let bcv_rate;
    let enparalelo_rate;
    // let bitcoin_rate;

    let average_rate;

    if(res1.status !== 200 || res2.status !== 200) {
        console.log("Hubo un error: " + res1.status);
        average_container.innerHTML = "Ha habido un error al consultar las tasas";
    } else {
        bcv_rate = data1.promedio;
        bcv_rate_container.innerHTML = `<span>${bcv_rate.toFixed(1)}</span> Bs./USD`;

        enparalelo_rate = data2.promedio;
        enparalelo_rate_container.innerHTML = `<span>${enparalelo_rate.toFixed(1)}</span> Bs./USD`;

        // bitcoin_rate = data3.promedio;
        // bitcoin_rate_container.innerHTML = `<span>${bitcoin_rate.toFixed(1)}</span> Bs./USD`;

        average_rate = (bcv_rate+enparalelo_rate)/2;
        average_container.innerHTML = `<span>${average_rate.toFixed(1)}</span> Bs./USD`;

        date.innerHTML = `${data1.fechaActualizacion.slice(0,10)}`;
    }  
}

getRates(bcv_url, enparalelo_url);
