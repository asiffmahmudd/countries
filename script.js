
function getData(){
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        displayData(data)
    });
}

function createCell(type, value){
    let cell = document.createElement(type);
    let t = document.createTextNode(value);
    cell.appendChild(t);
    return cell; 
}

function addAll(){
    for(let i = 1; i < arguments.length; i++){
        arguments[0].appendChild(arguments[i]);
    }
}

function displayData(data){
    let tableBody = document.getElementById('tb-body');
    for(x in data){
        let row = table.insertRow(x);
        
        let cell1 = createCell('th', (parseInt(x)+1));
        cell1.setAttribute('scope', 'row');

        let cell2 = createCell('td', data[x].name.common);

        let cell3 = createCell('td', data[x].capital);

        let cell4 = createCell('button', 'Details');
        cell4.setAttribute('class', 'btn btn-dark mt-1');
        cell4.setAttribute('onclick', `addAction("${data[x].name.common}")`);

        addAll(row, cell1,cell2,cell3, cell4);
        tableBody.appendChild(row);
    }
}

function detailViewer(country){
    
    console.log(country);

    document.getElementById('flag').setAttribute('src', country[0].flags.png);
    document.getElementById('name').textContent = country[0].name.common;
    document.getElementById('population').textContent = country[0].population;
    document.getElementById('region').textContent = country[0].region;
    document.getElementById('time').textContent = country[0].timezones;

    document.getElementById('country-detail').style.display = "block";
    document.getElementById('country-detail').scrollIntoView();
    
}

function addAction(name){
    const url = `https://restcountries.com/v3.1/name/${name}`;
    fetch(url)
    .then(response => response.json())
    .then(data => detailViewer(data));
}

getData();

