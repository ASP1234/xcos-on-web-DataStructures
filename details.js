// All arrays - separated by ',' or ';' or ' ' are taken to be 1 Dimensional
// Only during printing, their nomenclature will change
// Good read: http://javascript.info/tutorial/arguments#keyword-arguments

function scicos_block() {
	var options = arguments[0] || new Object();
	var i=0;
	var l=0;

	this.type=new ScilabString(new data("block",i++,l),new data("graphics",i++,l),new data("model",i++,l),new data("gui",i++,l),new data("docs",i++,l));
	this.graphics = options.graphics || new scicos_graphics();
	this.model = options.model || new scicos_model();
	this.gui = options.gui || new ScilabString();
	this.docs = options.docs || list();

	return mlist(this.type,this.graphics,this.model,this.gui,this.docs);
}

function scicos_graphics() {
	var options = arguments[0] || new Object();
	var i=0;
	var l=0;

	this.type=new ScilabString(new data("graphics",i++,l),new data("orig",i++,l),new data("sz",i++,l),new data("flip",i++,l),new data("theta",i++,l),new data("exprs",i++,l),new data("pin",i++,l),new data("pout",i++,l),new data("pein",i++,l),new data("peout",i++,l),new data("gr_i",i++,l),new data("id",i++,l),new data("in_implicit",i++,l),new data("out_implicit",i++,l),new data("in_style",i++,l),new data("out_style",i++,l),new data("in_label",i++,l),new data("out_label",i++,l),new data("style",i++,l));
	this.orig = options.orig || new ScilabDouble(new data(0,0,0),new data(0,1,0));
	this.sz = options.sz || new ScilabDouble(new data(80,0,0),new data(80,1,0)); // Space and comma works the same!
	this.flip = options.flip || new ScilabBoolean(new data("true",0,0));
	this.theta = options.theta || new ScilabDouble(new data(0,0,0));
	this.exprs = options.exprs || new ScilabDouble();
	this.pin = options.pin || new ScilabDouble();;
	this.pout = options.pout || new ScilabDouble();;
	this.pein = options.pein || new ScilabDouble();;
	this.peout = options.peout || new ScilabDouble();;
	this.gr_i = options.gr_i || new ScilabString();
	this.id = options.id || new ScilabString(new data("",0,0));
	this.in_implicit = options.in_implicit || new ScilabDouble();
	this.out_implicit = options.out_implicit || new ScilabDouble(); // There is only one!
	this.in_style = options.in_style || new ScilabDouble();
	this.out_style = options.out_style || new ScilabDouble();
	this.in_label = options.in_label || new ScilabDouble();
	this.out_label = options.out_label || new ScilabDouble();
	this.style = options.style || new ScilabString();

	return mlist(this.type,this.orig,this.sz,this.flip,this.theta,this.exprs,this.pin,this.pout,this.pein,this.peout,this.gr_i,this.id,this.in_implicit,this.out_implicit,this.in_style,this.out_style,this.in_label,this.out_label,this.style);


}

function standard_define() {
	var sz = arguments[0];
	var model = arguments[1];
	var label = arguments[2];
	var gr_i = arguments[3] || new ScilabString();
	
	var pin = new ScilabDouble();
	var pout = new ScilabDouble();
	var pein = new ScilabDouble();
	var peout = new ScilabDouble();
	
	var nin = model[findModel("in")].length;
	if(nin > 0){
		pin = zeros(nin);
		pin=convert2Double(pin);
	}
	var nout = model[findModel("out")].length;
	if(nout > 0){
		pout = zeros(nout);
		pout=convert2Double(pout);
	}
	var ncin = model[findModel("evtin")].length;
	if(ncin > 0){
		pein = zeros(ncin);
		pein=convert2Double(pein);
	}
	var ncout = model[findModel("evtout")].length;
	if(ncout > 0){
		peout = zeros(ncout);
		peout=convert2Double(peout);
	}

	gr_i = list(gr_i,new ScilabDouble(new data(8,0,0)));
	if(gr_i[1]== []){
		gr_i[1]=new ScilabDouble(new data(8,0,0));
	}
	if(gr_i[1] == 0){
		gr_i[1]=new ScilabDouble();
	}

	var graphics_options = {
	  sz: sz,
	  pin: pin,
	  pout: pout,
	  pein: pein,
	  peout: peout,
	  gr_i: gr_i,
	  exprs: label
	};
	var graphics = new scicos_graphics(graphics_options);
	var block_options = {
	  graphics: graphics,
	  model: model,
	  gui: new ScilabString(new data(arguments.callee.caller.name,0,0))
	};
	return new scicos_block(block_options);
}

function convert2Double()
{
	var port=new ScilabDouble();
	var i=0;

	for(i=0;i<arguments[0].length;i++)
		port.list.push(new data(arguments[0][i],i,0));

	return port;
}

function ScilabString()
{
	var i=0;

	for(i=0;i<arguments.length;i++)
		this['data'+i]=arguments[i];


	this.height=1;

	this.width=arguments.length;

}

function ScilabBoolean()
{
	var i=0;

	for(i=0;i<arguments.length;i++)
		this['data'+i]=arguments[i];

	this.height=1;

	this.width=arguments.length;

}

function ScilabDouble()
{
	var i=0;

	for(i=0;i<arguments.length;i++)
		this['data'+i]=arguments[i]

	this.height=1;;

	this.width=arguments.length;

}

function isNumber(obj) { return !isNaN(parseFloat(obj)) }

function data(){

	if(isNumber(arguments[0]))
	{
		this.column=arguments[1];
		this.line=arguments[2];
		this.realPart=arguments[0];

	}

	else
	{
	
		this.column=arguments[1];
		this.line=arguments[2];
		this.value=arguments[0];
		
	}
	
}

function list()
{
	this.ScilabList=[];
	var i=0;

	for(i=0;i<arguments.length;i++)
		this.ScilabList.push(arguments[i]);

	this.ScilabList.scilabClass="ScilabList";

	return this.ScilabList;

}

function mlist()
{
	this.ScilabMList=[];
	var i=0;

	for(i=0;i<arguments.length;i++)
		this.ScilabMList.push(arguments[i]);

	this.ScilabMList.scilabClass="ScilabMList";

	return this.ScilabMList;

}

function scicos_model() {
	var options = arguments[0] || new Object();
	var i=0;
	var l=0

	this.type=new ScilabString(new data("model",i++,l),new data("sim",i++,l),new data("in",i++,l),new data("in2",i++,l),new data("intyp",i++,l),new data("out",i++,l),new data("out2",i++,l),new data("outtyp",i++,l),new data("evtin",i++,l),new data("evtout",i++,l),new data("state",i++,l),new data("dstate",i++,l),new data("odstate",i++,l),new data("rpar",i++,l),new data("ipar",i++,l),new data("opar",i++,l),new data("blocktype",i++,l),new data("firing",i++,l),new data("dep_ut",i++,l),new data("label",i++,l),new data("nzcross",i++,l),new data("nmode",i++,l),new data("equations",i++,l),new data("uid",i++,l));
	this.sim = options.sim || new ScilabString();
	this.in = options.in || new ScilabDouble();
	this.in2 = options.in2 || new ScilabDouble();
	this.intyp = options.intyp || new ScilabDouble(new data(1,0,0));
	this.out = options.out || new ScilabDouble();
	this.out2 = options.out2 || new ScilabDouble();
	this.outtyp = options.outtyp || new ScilabDouble(new data(1,0,0));
	this.evtin = options.evtin || new ScilabDouble();
	this.evtout = options.evtout || new ScilabDouble();
	this.state = options.state || new ScilabDouble();
	this.dstate = options.dstate || new ScilabDouble();
	this.odstate = options.odstate ||list();
	this.ipar = options.ipar || new ScilabDouble();
	this.rpar = options.rpar || new ScilabDouble();
	this.opar = options.opar || new ScilabDouble();
	this.blocktype = options.blocktype || new ScilabString(new data('c',0,0));
	this.firing = options.firing || new ScilabDouble();
	this.dep_ut = options.dep_ut || new ScilabBoolean(new data('false',0,0),new data('false',1,0));
	this.label = options.label || new ScilabString(); // If label not available, use image
	this.nzcross = options.nzcross || new ScilabDouble(new data(0,0,0));
	this.nmode = options.nmode || new ScilabDouble(new data(0,0,0));;
	this.equations = options.equations || list();
	this.uid = options.uid || new ScilabString();	

	return mlist(this.type,this.sim,this.in,this.in2,this.intyp,this.out,this.out2,this.outtyp,this.evtin,this.evtout,this.state,this.dstate,this.odstate,this.ipar,this.rpar,this.opar,this.blocktype,this.firing,this.dep_ut,this.label,this.nzcross,this.nmode,this.equations,this.uid);
}

// This might also have to be overloaded
function scicos_diagram() {
	this.props = new scicos_params();
	this.objs = [];
	this.version = '';
	this.contrib = [];
}

// This might also have to be overloaded
function scicos_params() {
	this.wpar = [600, 450, 0, 0, 600, 450];
	this.titlex = 'Untitled';
	this.tf = 100000;
	this.tol = [Math.pow(10, -6), Math.pow(10, -6), Math.pow(10, -10), this.tf+1, 0, 1, 0];
	this.context = [];
	this.void1 = [];
	this.options = new default_options();
	this.void2 = [];
	this.void3 = [];
	this.doc = [];
}

// This might also have to be overloaded
function default_options() {
	var options = new Object();
    var col3d = [0.8, 0.8, 0.8];
    options['3D'] = [true, 33];
    options['Background'] = [8, 1]; // white,black
    options['Link'] = [1, 5]; // black,red
    options['ID'] = [[4, 1, 10, 1], [4, 1, 2, 1]];
    options['Cmap'] = col3d;
    return options;
}

function zeros(n){
	return new Array(n+1).join('0').split('').map(parseFloat);
}


function scicos_link (){
	this.xx = [];
	this.yy = [];
	this.id = '';
	this.thick = [0, 0];
	this.ct = [1, 1];
	this.from = [];
	this.to = [];
}

function findModel()
{
	var model=["model","sim","in","in2","intyp","out","out2","outtyp","evtin","evtout","state","dstate","odstate","rpar","ipar","opar","blocktype","firing","dep_ut","label","nzcross","nmode","equations","uid"];
	return model.indexOf(arguments[0]);
}

function findBlock()
{
	var block=["Block","graphics","model","gui","doc"];
	return block.indexOf(arguments[0]);

}

function findGraphics()
{
	var graphics=["graphics","orig","sz","flip","theta","exprs","pin","pout","pein","peout","gr_i","id","in_implicit","out_implicit","in_style","out_style","in_label","out_label","style"];
	return graphics.indexOf(arguments[0]);
}

function ANDLOG_f(){
    var model = scicos_model();
    
    model[findModel("sim")]=new ScilabString(new data('andlog',0,0));
    model[findModel("out")] = new ScilabDouble(new data(1,0,0));
    model[findModel("out2")] = new ScilabDouble(new data(1,0,0)); // null -> 1
    model[findModel("evtin")] = new ScilabDouble(new data(-1,0,0),new data(-1,1,0)) // 1, 1 -> -1, -1
    model[findModel("blocktype")] = new ScilabString(new data('d',0,0));
    model[findModel("firing")] = new ScilabDouble();
    model[findModel("dep_ut")] = new ScilabBoolean(new data('false',0,0),new data('false',1,0));

    var gr_i = new ScilabString(new data("xstringb(orig(1),orig(2),\"ANDLOG_f\",sz(1),sz(2));",0,0));
    var block = new standard_define(new ScilabDouble(new data(80,0,0),new data(80,1,0)), model,new ScilabDouble(), gr_i); // 3 -> 80
    /*
    // Style
    block.graphics.out_implicit = "E";
    //block.graphics.out_style = "ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0";*/
    block[findBlock("graphics")][findGraphics("style")] = new ScilabString(new data("ANDLOG_f",0,0));
    return block;
}
























