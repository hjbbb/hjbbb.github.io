var colors=["#0f9fa8","#8a96f4","#6859b2","#7149f5","#19b2ae","#092cda","#b0e808","#e6550b","#29a29a"];
var selectedColors=[];

let firstcol;
let secondcol;
let chkboxList1 = [
    {value:"手机",text:"手机"},
    {value:"笔记本",text:"笔记本"},
    {value:"智能音箱",text:"智能音箱"}
];
let productRadio = document.querySelector("#product-radio-wrapper");
let regionRadio = document.querySelector("#region-radio-wrapper");
formCheckBox(productRadio,chkboxList1);
let chkboxList2 = [
    {value:"华东",text:"华东"},
    {value:"华北",text:"华北"},
    {value:"华南",text:"华南"},
];
formCheckBox(regionRadio,chkboxList2);

let wrapper2 = document.querySelector("#table-wrapper2");
let checkedValue = {
    'region':[],
    'product':[],
}

window.onload = function(){
    productRadio.querySelector("input[checkbox-type='single']").click();
    regionRadio.querySelector("input[checkbox-type='single']").click();
    drawBar(sourceData[0].sale);
    drawLine(sourceData[0].sale);

    table1 = wrapper2.querySelector('table');
    EventUtil.addHandler(table1,"mouseover",function(e) {
        e=EventUtil.getEvent(e);
        let target = EventUtil.getTarget(e);
        if(target.tagName==="TD") {
            let tr=target.parentElement;
            let tbody=tr.parentElement;
            let ths=table1.querySelectorAll("th");
            let sel={};
            sel[firstcol]=tbody.children[0].children[0].textContent;
            if(tr.querySelector("td[rowspan]")){
                sel[secondcol]=tr.children[1].textContent;
            }
            else {
                sel[secondcol]=tr.children[0].textContent;
            }
            let data = getData(function(e,i) {
                let result = e.region===sel.region&&e.product===sel.product;
                if(result) {
                    selectedColors.push(colors[i]);
                }
                return result;
            })[0].sale;
            drawBar(data);
            drawLine(data);
        }
    });
    EventUtil.addHandler(table1,"mouseleave",function(e) {
        e=EventUtil.getEvent(e);
        let target=EventUtil.getTarget(e);
        if(e.target===table1) {
            let data=getData(judge2);
            let data1 = data.map(function(e) {return e.sale;});
            drawLine(data.map(function(e){return e.sale;}),true);
        }
    });
}


