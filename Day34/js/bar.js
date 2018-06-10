function drawBar(data) {
    let length=data.length;
    let span = 40;
    let spacing = 10;
    let width = (span+spacing)*length+spacing;
    let height=400;
    let color="#0086b3";
    let axisWidth = width;
    let axisColor="#000";

    let max=-1;
    for(let i=0;i<data.length;i++) {
        if(max<data[i]) {
            max=data[i];
        }
    };
    
    let axisHeight = getYHeight(max);
    let heights=data.map(function(val) {
        return val/axisHeight*height;
    });
    let svg1 = document.querySelector("svg");
 
    if(!svg1) {
        svg1 = document.createElementNS("http://www.w3.org/2000/svg","svg");
        document.body.insertBefore(svg1,wrapper2);
        svg1.setAttribute("width",width+10);
        svg1.setAttribute("height",height+10);
        svg1.setAttribute("version","1.1");
    }

    svg1.innerHTML="";
    let g=document.createElementNS("http://www.w3.org/2000/svg","g");
    g.setAttribute("transform","translate(10,0)");
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
    
    for(let i=0;i<length;i++) {
        let column = document.createElementNS('http://www.w3.org/2000/svg','rect');
        column.setAttribute('x',spacing*(i+1)+span*i);
        column.setAttribute('y',height-heights[i]);
        column.setAttribute('width',span);
        column.setAttribute('height',heights[i]);
        column.setAttribute('fill',color);
        g.appendChild(column);
    }

} 

function getYHeight(max) {
    let len = max.toString().length;
    let unit = Math.ceil(Math.pow(10,len-1)/2);
    let yHeight = (Math.floor(max/unit)+1)*unit;
    return yHeight;
}