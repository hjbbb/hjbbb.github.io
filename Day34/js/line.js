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
    let axisHeight=getYHeight(max);


    let canvas = document.querySelector("canvas");
    if(!canvas) {
        canvas=document.createElement('canvas');
        canvas.width=width+10;
        canvas.height=height+10;
        document.body.insertBefore(canvas,wrapper2);
    }
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();
    ctx.translate(10,height);
    ctx.scale(1,-1);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(width,0);
    ctx.moveTo(0,0);
    ctx.lineTo(0,height);
    ctx.stroke();

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
                        max=data[i][j];
                    }
                }
            }
        }
        else {
            for(let i=0;i<length;i++) {
                if(max<data[i]) {
                    max=data[i];
                }
            }
        }
    }
}