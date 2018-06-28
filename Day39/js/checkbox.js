function formCheckBox(container,list) {
    let str = '<label><input type="checkbox" checkbox-type={checkbox-type} value={value}>{text}</label>'
    let result = '';
    result = result + str;
    result = result.replace("{checkbox-type}","all");
    result = result.replace("{value}","全选");
    result = result.replace("{text}","全选");
    for(let i in list) {
        result = result + str;
        let chkbox = document.createElement('input');
        result = result.replace("{checkbox-type}","single");
        result = result.replace("{value}",list[i].value);
        result = result.replace("{text}",list[i].value);
    }     
    container.innerHTML = result;

    EventUtil.addHandler(container,"click",function(e) {
        e = EventUtil.getEvent(e);
        let target = EventUtil.getTarget(e);
        if(target.type==="checkbox") {

            let type=target.getAttribute("checkbox-type");
            if(type==="all") {
                push=false;
                if(target.checked===false) {
                    e.preventDefault();
                }
                else {
                    var chks = container.querySelectorAll("input[checkbox-type='single'");
                    chks=Array.prototype.filter.call(chks,function(e) {
                        return e.checked===false;
                    });
                    for(let i=0,len=chks.length;i<len;i++) {
                        if(chks[i].checked===false) {
                            chks[i].click();
                        }
                    }
                }
                push=true;
            }
            else if(type==="single") {
                if(isUnique()) {
                    console.log('unique');
                    // console.log(target.checked);
                    e.preventDefault();
                }
                else {
                    let chks = container.querySelectorAll("input[checkbox-type='single'");
                    let chkeds = container.querySelectorAll("input[checkbox-type='single']:checked");
                    let allChk = container.querySelector("input[checkbox-type='all'");
                    if(chks.length === chkeds.length) {
                        allChk.checked="checked";
                    }
                    else {
                        allChk.checked="";
                    }
                }
            }
            
        }
        
    });
    
    EventUtil.addHandler(container,"change",function(e) {
        let key = container.id.slice(0,container.id.indexOf('-'));
        e = EventUtil.getEvent(e);
        let target = EventUtil.getTarget(e);
        if(target.type==="checkbox") {
            let type=target.getAttribute("checkbox-type"); 
            if(type==='single') {
                if(target.checked===true) {
                    checkedValue[key].push(target.value);
                }
                else {
                    let index = checkedValue[key].indexOf(target.value);
                    checkedValue[key].splice(index,1);
                }
                setData2(wrapper2,judge2);
            }             
        }
        if(push)
            history.pushState(checkedValue,'','#'+JSON.stringify(checkedValue));
    });

    function isUnique() {
        let chks = container.querySelectorAll("input[checkbox-type='single']:checked");
        return chks.length === 0;
    }

    function setData2(wrapper,judge) {
        let data = getData(judge);

        renderTable2(wrapper,data);    
    }

    function renderTable2(wrapper,data) {
        if(data.length!==0) {
            let table = wrapper.querySelector('table');
            if(!table) {
                table = document.createElement('table');
                wrapper.appendChild(table);
            }
            table.innerHTML='';
            setTableHead2(wrapper);
            setTableBody2(wrapper,data);
        }
    }
    function setTableHead2(wrapper) {
        let table = wrapper.querySelector("table");
        // let table = document.querySelector('#table-wrapper table');

        if(checkedValue.region.length===1&&checkedValue.product.length>1)
            var ths = ['地区','商品','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
        else {
            var ths = ['商品','地区','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
        }
        let thead = document.createElement('thead');
        for(let i in ths) {
            let th = document.createElement('th');
            th.innerText=ths[i];
            thead.appendChild(th);
        }
        table.appendChild(thead);
    }
    function setTableBody2(wrapper,data) {
        let table = wrapper.querySelector('table');


        if(checkedValue.region.length===1&&checkedValue.product.length>1) {
            firstcol = "region";
        }
        else {
            firstcol = "product";
        }
        inner(firstcol);
        function inner(first) {
            let span;
            secondcol = first==='region'?'product':'region';
            span = checkedValue[secondcol].length;
            let num = 0;
            for(let i in data) {
                let tr = document.createElement('tr');
                if((num++)%span===0) {
                    var tbody = document.createElement('tbody');
                    table.appendChild(tbody);
                    let td = document.createElement('td');
                    td.textContent = data[i][first];
                    td.rowSpan=span;
                    tr.appendChild(td);
                }
                let td = document.createElement('td');
                td.textContent = data[i][secondcol];
                tr.appendChild(td);
                for(let j in data[i].sale) {
                    let td = document.createElement('td');
                    td.className="data";
                    td.textContent = data[i].sale[j];
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
        }

        let data1 = data.map(function(e) {return e.sale;});
        drawLine(data.map(function(e){return e.sale;}),true);
        drawBar(data.map(function(e){return e.sale;}),true);
    }



}
function judge2(e,i) {
    let result=checkedValue.region.includes(e.region)&&checkedValue.product.includes(e.product);
    if(result) {
        selectedColors.push(colors[i]);
    }
    return result;
}