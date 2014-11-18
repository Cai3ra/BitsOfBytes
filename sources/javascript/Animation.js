/**
 * ...
 * @author caiera
 */

//MOUSE 
 function mouseOverButtons(obj, alpha)
{
	fade(obj, 1, 100, alpha);
}

function mouseOutButtons(obj, alpha)
{
	fade(obj, 1, alpha, 100);
}
 
//Função que recebe os parametros a serem "manipulados"
function fx(obj, init, end, propCss, unit, curve, ms)
{ 
    var t = new transition(curve, ms, function(perc){ 
        if (end < init){ 
            var delta = init - end; 
            obj.style[propCss] = (init - (perc * delta)) + unit; 
        } 
        else{ 
            var delta=end-init; 
            obj.style[propCss] = (init + (perc * delta)) + unit; 
        } 
    }); 
    t.init(); 
    t = null; 
} 

function transition(curve, ms, callback)
{	
    this.ant 	= 0.01; 
    var _this 	= this; 
    this.start	= new Date().getTime(); 
    this.init	= function(){ 
					setTimeout( function(){ 
							if(!_this.next()){ 
								callback(1); 
								window.globalIntervalo = 0; 
								return; 
							} 
							callback(_this.next()); 
							_this.init(); 
						}, 13); 
					}; 
   
	this.next = function(){ 
        var now = new Date().getTime(); 
        if ((now - this.start) > ms) {
            return false; 
		} else {
		    return this.ant = curve((now - this.start + .001) / ms , this.ant); 
		}
    }; 
} 

//CURVAS DE ANIMAÇÃO
function senoidal(perc, ant){ 
    return (1 - Math.cos(perc * Math.PI)) / 2; 
} 

function bounce(perc, alt)
{ 
    if( perc <= 0.6){ 
        return Math.pow(perc * 5/3, 2); 
    }else{ 
        return Math.pow((perc - 0.8) * 5, 2) * 0.4 + 0.6; 
    } 
}

function bounceElastic(perc, alt)
{ 
	return Math.pow(2, 10 * (perc-1)) * Math.cos(20 * Math.PI * 0.5*perc)
}

function makeEaseOut(delta) { 
	return function(progress) {
		return 1 - delta(1 - progress)
	}
}


function makeEaseInOut(delta) { 

	return function(progress) {
	  if (progress < .5)
	  {
		return delta(2*progress) / 2;
	  } else {
		return (2 - delta(2*(1-progress))) / 2;
	  }
	}

}


function slow (perc, ant)
{ 
    var maxValue = 1, minValue = .001, totalP = 1, k = .25; 
    var delta = maxValue - minValue;  
    var stepp = minValue + (Math.pow(((1 / totalP) * perc), k) * delta);  
   
	return stepp;  
}

function fast (perc, ant)
{ 
    var maxValue = 1, minValue = .001, totalP = 1, k = 7; 
    var delta = maxValue - minValue;  
    var stepp = minValue + (Math.pow(((1 / totalP) * perc), k) * delta);  
    
	return stepp;  
}


//FADE
function fadeOut(id, time, delay, callback) 
{  
	if (delay > 0)
	{
		setTimeout(function(){
			fade(id, time, 100, 0);   
		}, delay*1000);
	} else {
		fade(id, time, 100, 0);  
	}
	if (callback != null){
		setTimeout(callback, delay*1500);
	}
}  
  
function fadeIn(id, time, delay, callback) 
{  
	if (delay > 0)
	{
		setTimeout(function(){
			fade(id, time, 0, 100);   
		}, delay*1000);
	} else {
		fade(id, time, 0, 100);  
	} 
	
	if (callback != null){
		setTimeout(callback, delay*1500);
	}
	//if (callback) callback();
}  
  
function fade(id, time, _initial, _final) 
{  
	var target = id;  
	var alpha = _initial;  
	var _increment;  
	
	if (_final >= _initial) 
	{   
		_increment = 2;   
	} else {  
		_increment = -2;  
	}  
	timer = (time * 1000) / 50;  
	
	var i = setInterval( 
	function() {  
		if ((_increment > 0 && alpha >= _final) || (_increment < 0 && alpha <= _final)) {  
			clearInterval(i);  
		}  
		setAlpha(target, alpha);  
			alpha += _increment;  
	}, timer);  
}  
  
function setAlpha(target, alpha) 
{   
	if (target) target.style.opacity = alpha/100;  
}
