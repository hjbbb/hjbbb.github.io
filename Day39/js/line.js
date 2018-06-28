function drawLine(data,multi) {
    let length=multi?data[0].length:data.length;
    let span=50;
    let width=span*length;
    let height=400;
    let radius=2.5;
    // let color="#8BC34A";
    let lineWidth=2;

    let max=Number.MIN_VALUE;
    getMax();



    let canvas = document.querySelector("canvas");
    if(!canvas) {
        canvas=document.createElement('canvas');
        canvas.width=width+40;
        canvas.height=height+40;
        document.body.insertBefore(canvas,wrapper2);
    }
    var ctx = canvas.getContext('2d');

 

    ctx.clearRect(0,0,canvas.width,canvas.height);


    ctx.save();
    ctx.translate(40,height+20);
    ctx.font="14px serif";
    ctx.save();
    ctx.textBaseline="middle";
    ctx.textAlign="end";
    let axisHeight=getYHeight(max);
    ctx.restore();
    ctx.scale(1,-1);


    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(width,0);
    ctx.moveTo(0,0);
    ctx.lineTo(0,height);
    ctx.stroke();
    ctx.save();
    ctx.scale(1,-1);
    for(let i=0;i<12;i++) {
        ctx.beginPath();

        ctx.textAlign="center";
        ctx.fillText(i+1+'月',i*span,15);
    }
    ctx.restore();

    if(multi) {
        for(let i=0;i<data.length;i++) {
            ctx.strokeStyle=selectedColors[i];
            drawOneLine(data[i]);
        }
    }
    else {
        ctx.strokeStyle=selectedColors[0];
        drawOneLine(data);
    }
        ctx.restore();

    function drawOneLine(data) {
        ctx.beginPath();
        ctx.lineWidth=lineWidth;
        ctx.fillStyle="#fff";
        let heights=data.map(function(val) {
            return val/axisHeight*height;
        });
        for(let i=0;i<length;i++) {
            ctx.beginPath();
            if(i!==length-1) {
                ctx.moveTo(span*i,heights[i]);
                ctx.lineTo(span*(i+1),heights[i+1]);
                ctx.stroke();
            }  
            ctx.beginPath();
            ctx.arc(span*i,heights[i],radius,0,Math.PI*2,false);
            ctx.fill();
            ctx.stroke(); 
        }
    }

    function getMax() {
        if(multi) {
            for(let i=0,len=data.length;i<len;i++) {
                for(let j=0;j<length;j++) {
                    if(max<data[i][j]) {
                        max=Number(data[i][j]);
                    }
                }
            }
        }
        else {
            for(let i=0;i<length;i++) {
                if(max<data[i]) {
                    max=Number(data[i]);
                }
            }
        }
    }

    function getYHeight(max) {
        let len = max.toString().length;
        unit = Math.ceil(Math.pow(10,len-1)/2);
        let yHeight = (Math.floor(max/unit)+1)*unit;
        drawYScale(unit,yHeight);
        return yHeight;
        
    }

    function drawYScale(unit,yHeight) {
        for(let i=0,ySpacing=height/(yHeight/unit);i<=yHeight/unit;i++) {
            ctx.beginPath();
            ctx.fillText(''+unit*i,-10,-ySpacing*i);
            ctx.moveTo(0,-ySpacing*i);
            ctx.lineTo(width,-ySpacing*i);
            ctx.strokeStyle="rgba(0,0,0,.2)";
            ctx.stroke();
        }
    }
}