var path=require('path')

module.exports= class {
	constructor() {}


	static pack(string){
	    var n = (4 + string.length).toString(16);
		return Array(4 - n.length + 1).join('0') + n + string;
	}

	static dirmap(url,rootLocation){
		var repo=this.getRepoName(url)
		rootLocation=rootLocation.replace(/[\/\\]/g,'/').split('/')
		return path.join(...rootLocation,repo)
	}

	static getRepoName(url){
		return url.match(/^\/*(.*\.git)/)[1]
	}
}
