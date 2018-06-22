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

    let colorBar = document.getElementById('color-bar');
    for(let i=0,len=sourceData.length;i<len;i++) {
        let outer = document.createElement('label');
        outer.textContent=sourceData[i].region+"-"+sourceData[i].product;
        let inner = document.createElement('div');
        inner.style.background=colors[i];
        inner.className="inner";
        outer.appendChild(inner);
        colorBar.appendChild(outer);
    }

    productRadio.querySelector("input[checkbox-type='single']").click();
    regionRadio.querySelector("input[checkbox-type='single']").click();
    drawBar(changeData(sourceData)[0].sale);
    drawLine(changeData(sourceData)[0].sale);

    table1 = wrapper2.querySelector('table');
    EventUtil.addHandler(table1,"mouseover",function(e) {
        console.log("!!!!");
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
            let data = changeData(getData(function(e,i) {
                let result = e.region===sel.region&&e.product===sel.product;
                if(result) {
                    selectedColors.push(colors[i]);
                }
                return result;
            }))[0].sale;
            drawBar(data);
            drawLine(data);
        }
    });
    EventUtil.addHandler(table1,"mouseleave",function(e) {

        e=EventUtil.getEvent(e);
        let target=EventUtil.getTarget(e);
        if(target===table1) {
            console.log("!@#");
            let data=changeData(getData(judge2));
            let data1 = data.map(function(e) {return e.sale;});
            drawLine(data1,true);
            drawBar(data1,true);
        }
    });

    // var datas = document.querySelectorAll('.data');
    EventUtil.addHandler(table1,'mouseover',addPencil);
    function addPencil(e) {
        e = EventUtil.getEvent(e);
        let target = EventUtil.getTarget(e);
        if(target.className==="data"&&e.relatedTarget!==target.querySelector('img')) {
            let img = document.createElement('img');
            img.src="pencil.svg";
            target.appendChild(img);
        }
    }
    table1.addEventListener('mouseout',function(e) {
        // console.log(e.target.tagName);
        if((e.target.className==="data"&&e.relatedTarget!==e.target.querySelector('img'))||(e.target.tagName==='IMG'&&e.relatedTarget!==e.target.parentElement)) {
            try{let img1 = e.target.parentElement.querySelector('img');
            img1.parentElement.removeChild(img1);
        }catch {
            console.log(e);
        }
        }
    });

    var curr;
    var oldvalue;
    var input;
    var editing=false;
    EventUtil.addHandler(table1,'click',function(e) {
        e=EventUtil.getEvent(e);
        let target = EventUtil.getTarget(e);
        console.log(target.tagName);


        if(target.tagName==='IMG') {
            editable();
            table1.removeEventListener('mouseover',addPencil);
        };
        function editable() {
            curr=target.parentElement;
            oldvalue=curr.textContent;
            console.log(curr);
            editing=true;
            curr.innerHTML='';
            input = document.createElement('input');
            input.type='text';
            input.value=oldvalue;
            curr.appendChild(input);
            let div = document.createElement('div');
            div.innerHTML='<span class="confirm">确定</span><span class="cancel">取消</span>';
            curr.appendChild(div);
            console.log(curr.innerHTML);
            editing=true;
        };
    });

    EventUtil.addHandler(table1,'keydown',function(e) {
        let confirm=document.querySelector('.confirm');
        let cancel=document.querySelector('.cancel');
        e=EventUtil.getEvent(e);
        let target=EventUtil.getTarget(e);
        if(target===input){
            switch(e.keyCode) {
                case 13:confirm.click();break;
                case 27:cancel.click();break;
            }
        }
    })

    EventUtil.addHandler(window,'click',update);
    function update(e) {
        e=EventUtil.getEvent(e);
        let target = EventUtil.getTarget(e);
        console.log(target.tagName);
        if(target.tagName==='SPAN') {
            if(target.textContent==='确定') {
                res=uneditable(true);
                if(res)
                    storageData();
            }
            else if(target.textContent==='取消') {
                uneditable(false);
            }
            
        }
        else if(editing&&target!==input&&target.tagName!=='IMG') {
            uneditable(false);
        }       
    }

    function storageData() {
        var data=[];
        let span = checkedValue[secondcol].length;
        let num=0;
        let trs=document.querySelectorAll('tr');
        for(let i=0,len=trs.length;i<len;i++) {
            let obj={};
            let tds=trs[i].querySelectorAll('td');
            if((num++)%span==0) {
                var first=tds[0].textContent;
                var second=tds[1].textContent;   
                var ind=2;             
            }
            else {
                var second=tds[0].textContent;
                ind=1;
            }
            obj['sale']=[];
            for(var j=ind;j<tds.length;j++) {
                obj.sale.push(tds[j].textContent);
            } 
            obj[firstcol]=first;
            obj[secondcol]=second;
            data.push(obj);
        }
        console.log(data);
        window.localStorage.setItem('data',JSON.stringify(data));
    }
   
    function uneditable(updated) {
        if(updated) {
            let val = input.value;
            if(isNaN(val)) {
                alert('please input a num');
                return false;
            }
            else {
                curr.textContent=val;
            }
        }
        else {
            curr.textContent=oldvalue;
        }
        editing=false;
        EventUtil.addHandler(table1,'mouseover',addPencil);
        // return true;
    }
}