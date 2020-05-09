var spawn=require('child_process').spawn

module.exports=class {

	constructor(){}

	static exec(service,dir,from){
		var cmd = [ ...this._platformCmd(service), ...this._cmdArgs(service,from) ,dir];
		return spawn(cmd[0], cmd.slice(1) );
	}

	static _cmdArgs(service,from){
		switch (from) {
			case "push":
				return ['--stateless-rpc']
				break;
			case 'fetch':
				return ['--stateless-rpc','--advertise-refs']
				break;
			default:
				return null
		}
	}

	static _platformCmd(service){
		switch (service) {
			case 'win':
				return ["git",service]
			default:
				return ["git",service]
		}
	}

}
