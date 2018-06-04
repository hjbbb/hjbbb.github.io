let EventUtil = {
    addHandler:function(element,type,handler) {
        if(element.addEventListener) {
            element.addEventListener(type,handler);
        }
        else if(element.attachEvent) {
            element.attachEvent('on'+type,handler);
        }
        else element['on'+type] = handler;
    },
    getEvent: function(event) {
        return event||window.event;
    },
    getTarget: function(event) {
        return event.target||event.srcElement;
    },
    preventDefault: function(event) {
        if(event.preventDefault) {
            event.preventDefault();
        }
        else event.returnValue=false;
    },
    stopPropagation:function(event) {
        if(event.stopPropagation) {
            event.stopPropagation();
        }
        else {
            event.cancelBubble=true;
        }
    }
}


window.onload = function(){
    let regions = document.querySelector('#region-select')
    let regionSelectedValue = '华东';
    regionData(regionSelectedValue);

    EventUtil.addHandler(regions,'change',function(e) {
        e = EventUtil.getEvent(e);
        let target = EventUtil.getTarget(e);
        let regionSelectedValue = target.value;
        regionData(regionSelectedValue);
    });
    
    function regionData(value) {
        let data = getData(value);
        renderTable(data);    
    }

    function getData(val) {
        return sourceData.filter(function(e) { return e.region===val; });
    }

    function renderTable(data) {
        let wrapper = document.querySelector('#table-wrapper');
        wrapper.innerHTML='';
        let table = document.createElement('table');
        wrapper.appendChild(table);
        setTableHead();
        setTableBody(data);
    }
    function setTableHead() {
        let table = document.querySelector('#table-wrapper table');
        let ths = ['商品','地区','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        let thead = document.createElement('thead');
        for(let i in ths) {
            let th = document.createElement('th');
            th.innerText=ths[i];
            thead.appendChild(th);
        }
        table.appendChild(thead);
    }
    function setTableBody(data) {
        let table = document.querySelector('#table-wrapper table');
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


}