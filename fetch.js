const EventEmitter = require('events');
const HeaderSetter=require('./headers')
const utils=require('./responseUtils')
const _service=require('./service')
const _cmd=require('./cmd')

module.exports=class fetch extends HeaderSetter {
	constructor(req,res,rootLocation) {
		super(req,res)
		this.service=_service(req)
		this.rootLocation=rootLocation

	}

	response(){
		this._writeHeaders()
		var repoPath=utils.dirmap(this.req.url,this.rootLocation)
		var cmd=_cmd.exec(this.service,repoPath,'fetch')
		cmd.stdout.pipe(this.res)
	}

	_writeHeaders(){
		this.noCache()
		this.serviceHeaders(this.service)
      	this.res.write(utils.pack('# service=git-' + this.service + '\n'));
      	this.res.write('0000');
	}
}
