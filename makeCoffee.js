let makecoffee = function () {
  return new Promise((resolve, reject) => {
    let madeCoffee = true;
    resolve(madeCoffee)
  })  
}


async function makeCoffeePlease(){
  let made = await makecoffee()
  console.log(made);
}

makeCoffeePlease();