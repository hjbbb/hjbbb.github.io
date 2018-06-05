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
    let regions = document.querySelector('#region-select');
    let products = document.querySelector("#product-select");
    let selectedValue = {
        'region':'华东',
        'product':'手机',
    };
    let wrapper = document.querySelector("#table-wrapper");
    function judge1(e) { return e.region===selectedValue.region &&
        e.product===selectedValue.product; }
    setData(wrapper,judge1);

    EventUtil.addHandler(regions,'change',function(e) {
        e = EventUtil.getEvent(e);
        let target = EventUtil.getTarget(e);
        selectedValue.region = target.value;
        setData(wrapper,judge1);
    });

    EventUtil.addHandler(products,'change',function(e) {
        e = EventUtil.getEvent(e);
        let target = EventUtil.getTarget(e);
        selectedValue.product = target.value;
        setData(wrapper,judge1);
    })
    
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

 
 
 
 
 
    function formCheckBox(container,list) {
        let str = '<label><input type="checkbox" checkbox-type={checkbox-type} value={value}>{text}</label>'
        let result = '';
        result = result + str;
        let str1 = ''+str;
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
                    var chks = container.querySelectorAll("input[checkbox-type='single'");
                    for(let i in chks) {
                        if(chks[i].checked===false) {
                            chks[i].click();
                        }
                    }
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
        })

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
                wrapper.innerHTML='';
                let table = document.createElement('table');
                wrapper.appendChild(table);
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
            let firstcol;
            if(checkedValue.region.length===1&&checkedValue.product.length>1) {
                firstcol = "region";
            }
            else {
                firstcol = "product";
            }
            inner(firstcol);
            function inner(first) {
                let span;
                let second = first==='region'?'product':'region';
                span = checkedValue[second].length;
                let num = 0;
                for(let i in data) {
                    let tr = document.createElement('tr');
                    if((num++)%span===0) {
                        let td = document.createElement('td');
                        td.textContent = data[i][first];
                        td.rowSpan=span;
                        tr.appendChild(td);
                    }
                    let td = document.createElement('td');
                    td.textContent = data[i][second];
                    tr.appendChild(td);
                    for(let j in data[i].sale) {
                        let td = document.createElement('td');
                        td.textContent = data[i].sale[j];
                        tr.appendChild(td);
                    }
                    table.appendChild(tr);
                }
            }
        }
    }

    let chkboxList1 = [
        {value:"手机",text:"手机"},
        {value:"笔记本",text:"笔记本"},
        {value:"智能音箱",text:"智能音箱"}
    ];
    formCheckBox(document.querySelector("#product-radio-wrapper"),chkboxList1);
    let chkboxList2 = [
        {value:"华东",text:"华东"},
        {value:"华北",text:"华北"},
        {value:"华南",text:"华南"},
    ];
    formCheckBox(document.querySelector("#region-radio-wrapper"),chkboxList2);

    let wrapper2 = document.querySelector("#table-wrapper2");
    checkedValue = {
        'region':[],
        'product':[],
    }
    function judge2(e) {
        return checkedValue.region.includes(e.region)&&checkedValue.product.includes(e.product);
    }
}