var through=require('through')
const EventEmmitter = require('events');

const utils=require('./responseUtils')
const _service=require('./service')
const HeaderSetter=require('./headers')
const _cmd=require('./cmd')

module.exports=class push extends HeaderSetter {
	constructor(req,res,rootLocation,eventHandler) {
		super(req,res)

		this.events=new EventEmmitter()

		this.rootLocation=rootLocation
		this.req=req
		this.res=res
		this.service=_service(req)

		this.buffer=through().pause()
		this.streamResponse=through(function(c){return this.queue(c)})

		req.pipe(this.buffer)

	}

	response(){
		this.req.on('data',()=>{
			this._writeHeaders()

			var repoPath=utils.dirmap(this.req.url,this.rootLocation)
			var cmd=_cmd.exec(this.service,repoPath,'push')

			cmd.stdout.pipe(this.streamResponse).pipe(this.res)
			this.buffer.pipe(cmd.stdin)
			this.buffer.resume()

			cmd.on('exit',()=>{
				this.streamResponse.queue(Buffer.from('0000'))
				this.streamResponse.queue(null)

				this._emit()
			})

		})
		return this.events
	}

	_emit(){
		switch (this.service) {
			case 'upload-pack':
				this.events.emit("fetch")
				break;
			case 'receive-pack':
				this.events.emit("push")
				break;
			default:

		}
	}


	_writeHeaders(){
		super.noCache().serviceHeaders(this.service)
	}
}
