
function getData(){
    fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(data => displayData(data));
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
        
        row.setAttribute('class', 'clickable-row');
        row.setAttribute('data-href', '#country-detail');
        
        let cell1 = createCell('th', (parseInt(x)+1));
        cell1.setAttribute('scope', 'row');

        let cell2 = createCell('td', data[x].name);

        let cell3 = createCell('td', data[x].capital);

        let link = document.createElement('a');
        link.setAttribute('href', '#country-detail');
        addAll(row, cell1,cell2,cell3);
        tableBody.appendChild(row);
    }
    addAction(data);
}

function detailViewer(country){
    console.log(country);

    document.getElementById('flag').setAttribute('src', country.flag);
    document.getElementById('name').textContent = country.name;
    document.getElementById('population').textContent = country.population;
    document.getElementById('region').textContent = country.region;
    document.getElementById('time').textContent = country.timezones;

    document.getElementById('country-detail').style.display = "block";
    document.getElementById('country-detail').scrollIntoView();
    
}

function addAction(data){
    let table = document.querySelectorAll('#table tr');
    for(let i = 1; i < table.length; i++){
        table[i].addEventListener("click", function(){
            detailViewer(data[i-1]);
        });
    }
}

getData();

