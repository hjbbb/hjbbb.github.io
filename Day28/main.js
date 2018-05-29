var EventUtil = {
    addHandler: function( element, type, handler ) {
        if( element.addEventListener ) {
            element.addEventListener( type, handler );
        }
        else if( element.attachEvent ) {
            element.attachEvent( 'on' + type, handler );
        }
        else {
            element['on' + type] = handler;
        };
    },
    getEvent: function( event ) {
        return event ? event : window.event;
    },
    getTarget: function(event) {
        return event.Target||event.srcElement;
    }
};

window.onload=function() {
    var postfixList = [ '163.com', 'gmail.com', '126.com', 'qq.com', '263.net' ];

    var emailInput = document.querySelector( '#email-input ');
    var sug_wrapper = document.querySelector('#email-sug-wrapper');

    emailInput.focus();

    EventUtil.addHandler( emailInput, 'input', function(e) {
        var input = getInput();
        sug_wrapper.innerHTML="";
        if( input !== "" ) {
            var sugs = formSug(input);
            addSugs(sugs);
        }
        setState(input);

    });

    EventUtil.addHandler( emailInput, 'keydown',function(e) {
        e = EventUtil.getEvent(e);
        if(e.keyCode===38) {
            upKey();
        }
        else if(e.keyCode===40) {
            downKey();
        }
        else if(e.keyCode===13) {
            enterKey();
        }
        else if(e.keyCode===27) {
            emailInput.select();
        }
    });

    function getInput() {
        var value = emailInput.value;
        value = trim(value);
        return value;
    };

    function trim(s) {
        var i=0,
            j=s.length-1;
        while( i<s.length && (s[i]==='\u0020'||s[i]==='\u3000'))
            i++;
        while( j>i && (s[j]==='\u0020'||s[j]==='\u3000'))
            j--;
        return s.slice(i,j+1);
    };

    function formSug(input) {
        var result = [];
        var index = input.indexOf('@');
        var tag=0;
        if(index!==-1) {
            var match = input.slice(index+1);
            input=input.slice(0,index);
            for( var i = 0; i < postfixList.length; i++ ) {
                if(postfixList[i].indexOf(match)===0) {
                    tag=1;
                }
            }
        }
        for( var i = 0; i < postfixList.length; i++ ) {
            if(tag===1) {
                if(postfixList[i].indexOf(match)===0)
                    result.push(input+'@'+postfixList[i]);
            }
            else {
                result.push(input+'@'+postfixList[i]);
            }
        }
        return result;
    };
    
    function addSugs(sugs) {
        
        for(var i = 0; i<sugs.length; i++ ) {
            var elt = document.createElement('li');
            elt.textContent = sugs[i];
            sug_wrapper.appendChild(elt);
        }
        document.querySelector('li').className="on";
    }

    function setState(input) {
        if(input.length) {
            show();
        }
        else {
            hide();
        }
    }

    function upKey() {
        var lis = document.querySelectorAll('li');
        var firstLi = document.querySelector('li');
        var sel = document.querySelector('li.on');
        if(sel) {
            sel.className='';
        }
        if(sel===firstLi) {
            lis[lis.length-1].className='on';
        }
        else {
            sel.previousElementSibling.className='on';
        }
    }

    function downKey() {
        var lis = document.querySelectorAll('li');
        var lastLi = document.querySelector('li:last-child');
        var sel = document.querySelector('li.on');
        if(sel) {
            sel.className='';
        };
        if(sel===lastLi) {
            lis[0].className='on';
        }
        else {
            sel.nextElementSibling.className='on';
        }
    }

    function enterKey() {
        var sel = document.querySelector('li.on');
        emailInput.value=sel.textContent;
        hide();
    }

    function show() {
        sug_wrapper.style.display="block";
    }
    function hide() {
        sug_wrapper.style.display="none";
    }

    var ul = document.querySelector("ul");
    EventUtil.addHandler(ul,'click',function(e) {
        e=EventUtil.getEvent(e);
        var target = EventUtil.getTarget(e);
        if(target.tagName==="LI") {
            emailInput.value=target.textContent;
            hide();
        }
        emailInput.focus();
    });


};