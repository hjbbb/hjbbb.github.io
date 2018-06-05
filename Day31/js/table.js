function setData(wrapper,judge) {
        let data = getData(judge);
        renderTable(wrapper,data);    
    }

function getData(judge) {
    return sourceData.filter(judge);
}

function renderTable(wrapper,data) {

    wrapper.innerHTML='';
    let table = document.createElement('table');
    wrapper.appendChild(table);
    setTableHead(wrapper);
    setTableBody(wrapper,data);
}
function setTableHead(wrapper) {
    let table = wrapper.querySelector("table");
    // let table = document.querySelector('#table-wrapper table');
    let ths = ['商品','地区','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    let thead = document.createElement('thead');
    for(let i in ths) {
        let th = document.createElement('th');
        th.innerText=ths[i];
        thead.appendChild(th);
    }
    table.appendChild(thead);
}
function setTableBody(wrapper,data) {
    let table = wrapper.querySelector('table');
    for(let i in data) {
        let tr = document.createElement('tr');
        for(let j in data[i]) {
            if(j==='sale') {
                for(let k in data[i][j]) {
                    let td = document.createElement('td');
                    td.textContent = data[i][j][k];
                    tr.appendChild(td);
                }
            }
            else {
                let td = document.createElement('td');
                td.textContent = data[i][j];
                tr.appendChild(td);
            }
        }
        table.appendChild(tr);
    }
}