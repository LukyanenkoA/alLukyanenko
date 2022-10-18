function updatePrice(i) {
      // Находим select по имени в DOM.
      let s = document.getElementsByName("itemType"+i);
      let select = s[0];
      let price = 0;
      let prices = getPrices();
      let priceIndex = parseInt(select.value) - 1;
      if (priceIndex >= 0) {
      price = prices.itemTypes[priceIndex];
      }
      
      // Скрываем или показываем радиокнопки.
      let radioDiv = document.getElementById("itemRadio"+i);
      radioDiv.style.display = (select.value == "3" ? "block" : "none");
      
      // Смотрим какая товарная опция выбрана.
      let itemRadio = document.getElementsByName("myradio"+i);
      itemRadio.forEach(function(radio) {
      if (radio.checked) {
          let optionPrice = prices.myradio[radio.value];
          if (optionPrice !== undefined) {
          price += optionPrice;
          }
      }
      });
  
      // Скрываем или показываем чекбоксы.
      let checkDiv = document.getElementById("itemProp"+i);
      checkDiv.style.display = (select.value == "3" ? "none" : "block");
      
      // Смотрим какие товарные свойства выбраны.
      let itemProp = document.querySelectorAll("#itemProp"+ i +" input");
      itemProp.forEach(function(checkbox) {
      if (checkbox.checked) {
          let propPrice = prices.prodProperties[checkbox.name];
          if (propPrice !== undefined) {
          price += propPrice;
          }
      }
      });
      let count = document.getElementById("count"+i).value;
      price*=parseInt(count);
      let resultx = document.getElementById("result"+i);
      resultx.innerHTML = price;
      calc();
    }
  function getPrices() {
    return {
      itemTypes: [100, 200, 150],
      myradio: {
        Option1:15,
        Option2: 10,
        Option3: 5,
      },
      prodProperties: {
        prop1: 10,
        prop2: 20,
      }
    };
  }
  function calc(){
    let sum = 0;;
    let result = document.getElementById("result");
    for(let i =1; i<11; i++){
      let p = parseInt(document.getElementById("result"+i).innerHTML);
      sum+=p;
    }
    result.innerHTML = "Total cost: " + sum;
  }
  window.addEventListener('DOMContentLoaded', function (event) {
    for(let i = 1; i<11;i++){
    // Скрываем радиокнопки.
    let radioDiv = document.getElementById("itemRadio"+i);
    radioDiv.style.display = "none";
    
    // Находим select по имени в DOM.
    let s = document.getElementsByName("itemType"+i);
    let select = s[0];
    // Назначаем обработчик на изменение select.
    select.addEventListener("change", function(event) {
      updatePrice(i);
    });
    let count = document.getElementById("count"+i);
    count.addEventListener("change", function(event) {
        updatePrice(i);
    });
    // Назначаем обработчик радиокнопок.  
    let itemRadio = document.getElementsByName("myradio"+i);
    itemRadio.forEach(function(radio) {
      radio.addEventListener("change", function(event) {
        updatePrice(i);
      });
    });
  
      // Назначаем обработчик радиокнопок.  
    let itemProp = document.querySelectorAll("#itemProp"+i +" input");
    itemProp.forEach(function(checkbox) {
      checkbox.addEventListener("change", function(event) {
        updatePrice(i);
      });
    });
  
    updatePrice(i);
    calc();
    }
  });
