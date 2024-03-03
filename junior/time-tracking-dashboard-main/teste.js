/* async function getData(){
  let data = "data.json";
  try {
    let res = await fetch(data);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function render() {
  let data = await getData();
  let teste = data.find(item => item.title === "Work");
  console.log(teste.title);
  console.log(teste.timeframes.daily.current);
  console.log(teste.timeframes.daily.previo);
}
render(); */
