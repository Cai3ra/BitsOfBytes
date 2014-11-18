/*
	Estudo de orienta��o a objetos em Javascript.
	Utiliza��o de Callbacks.
*/

var printer = function(){
	var identifier;
	var repeat;
}

printer.prototype.constructor = function(){
	this.identifier = '';
	this.repeat = 0;
	return this;
}

printer.prototype.constructor = function(id){
	this.identifier = id;
	this.repeat = 0;
	return this;
}

printer.prototype.getIdentifier = function(){
	return this.identifier;
}

printer.prototype.setIdentifier = function(_identifier){
	this.identifier = _identifier;
}

printer.prototype.getRepeat = function(){
	return this.identifier;
}

printer.prototype.setRepeat = function(_repeat){
	this.repeat = _repeat;
}

printer.prototype.print = function(){
	var loops = 0;
	var repeatContext = this.repeat;
	var id = this.identifier;
	
	setTimeout(function(){
		while((loops++) < repeatContext){
			console.debug(id + ': ' + loops.toString());
		}
	}, 0);
}
