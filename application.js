const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";


const dropdownselect = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";

    }
    const URL = `${BASE_URL}/currencies/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let exchangeRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]; 
    if (exchangeRate) {
                console.log(`Exchange rate from ${fromCurr.value} to ${toCurr.value}: ${exchangeRate}`);
                // Perform calculations or update UI with the exchange rate and amount
            } 
            else 
            {
                console.error(`Exchange rate for ${toCurr.value} not found in the response`);
            }
    
    let finalAmt = amtVal * exchangeRate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
}


for (let select of dropdownselect){
    for (currCode in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOpt.selected = "selected";
        }
        if (select.name === "to" && currCode === "INR") {
            newOpt.selected = "selected";
        }

        select.append(newOpt);
    }   
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}


const updateFlag = (ele) => {
    let currCode = ele.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = ele.parentElement.querySelector("img");
    img.src =  newsrc;
};


btn.addEventListener("click",  (evt) => {
    evt.preventDefault();   
    updateExchangeRate();    
});


document.addEventListener("load", ()=>{
    updateExchangeRate();
})