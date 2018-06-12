function drawBar(data,multi) {
    let length=multi?data[0].length:data.length;;
    let span = 50;
    let spacing = 10;
    let width = (span+spacing)*length+spacing;
    let height=400;
    let color="#0086b3";
    let axisWidth = width;
    let axisColor="#000";

    let max=Number.MIN_VALUE;
    getMax();
    

    let svg1 = document.querySelector("svg");
 
    if(!svg1) {
        svg1 = document.createElementNS("http://www.w3.org/2000/svg","svg");
        document.body.insertBefore(svg1,wrapper2);
        svg1.setAttribute("width",width+40);
        svg1.setAttribute("height",height+40);
        svg1.setAttribute("version","1.1");
    }

    svg1.innerHTML="";
    var g=document.createElementNS("http://www.w3.org/2000/svg","g");
    drawXScale();

    let yHeight = getYHeight(max);

    if(multi) {
        var subSpan=span/data.length;
        for(let i=0;i<data.length;i++) {
            color=selectedColors[i];
            drawOneBar(data[i],i);
        }
    }
    else {
        color=selectedColors[0];
        drawOneBar(data);
    }

    g.setAttribute("transform","translate(40,20)");
    svg1.appendChild(g);
    let horizon = document.createElementNS("http://www.w3.org/2000/svg","line");
    horizon.setAttribute("x1",0);
    horizon.setAttribute("x2",axisWidth);
    horizon.setAttribute("y1",height);
    horizon.setAttribute("y2",height);
    horizon.setAttribute("stroke",axisColor);
    horizon.setAttribute('stroke-width',2);
    g.appendChild(horizon);
    let vertical = document.createElementNS("http://www.w3.org/2000/svg","line");
    vertical.setAttribute('x1',0);
    vertical.setAttribute('x2',0);
    vertical.setAttribute('y1',height);
    vertical.setAttribute('y2',0);
    vertical.setAttribute('stroke',axisColor);
    vertical.setAttribute('stroke-width',2);
    g.appendChild(vertical);
    

    function drawOneBar(data,n) {
        let heights=data.map(function(val) {
            return val/yHeight *height;
        });
        for(let i=0;i<length;i++) {
            let column = document.createElementNS('http://www.w3.org/2000/svg','rect');
            if(multi)
                column.setAttribute('x',spacing*(i+1)+span*i+subSpan*n);
            else 
                column.setAttribute('x',spacing*(i+1)+span*i);
            column.setAttribute('y',height-heights[i]);
            if(multi)
                column.setAttribute('width',subSpan);
            else 
                column.setAttribute('width',span);
            column.setAttribute('height',heights[i]);
            column.setAttribute('fill',color);
            g.appendChild(column);
        }
    }

    function getYHeight(max) {
        let len = max.toString().length;
        unit = Math.ceil(Math.pow(10,len-1)/2);
        let yHeight = (Math.floor(max/unit)+1)*unit;
        drawYScale(unit,yHeight);
        return yHeight;
        
    }

    function drawXScale() {
        for(let i=0;i<12;i++) {
            let text = document.createElementNS('http://www.w3.org/2000/svg','text');
            text.textContent=i+1+'月';
            text.setAttribute('x',spacing+span/2+(spacing+span)*i);
            text.setAttribute('y',height);
            text.setAttribute('text-anchor','middle');
            text.setAttribute('dominant-baseline','hanging');
            g.appendChild(text);
        }
    }
    function drawYScale(unit,yHeight) {
        for(let i=0,ySpacing=height/(yHeight/unit);i<=yHeight/unit;i++) {
            let text=document.createElementNS('http://www.w3.org/2000/svg','text');
            text.setAttribute('x',-10);
            text.setAttribute('y',height-ySpacing*i);
            text.setAttribute('dominant-baseline','central');
            text.setAttribute('text-anchor','end');
            text.setAttribute('font-size','14px');
            text.textContent=unit*i;
            g.appendChild(text);
            
            let line=document.createElementNS('http://www.w3.org/2000/svg','line');
            line.setAttribute('x1',0);
            line.setAttribute('x2',width);
            line.setAttribute('y1',height-ySpacing*i);
            line.setAttribute('y2',height-ySpacing*i);
            line.setAttribute('stroke','rgba(0,0,0,.2)');
            g.appendChild(line);
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