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