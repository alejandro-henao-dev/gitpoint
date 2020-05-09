module.exports= class HeaderSetter {
	constructor(req,res) {
		this.req=req
		this.res=res
	}

	noCache(){
       	this.res.setHeader('expires', 'Fri, 01 Jan 1980 00:00:00 GMT');
       	this.res.setHeader('pragma', 'no-cache');
       	this.res.setHeader('cache-control', 'no-cache, max-age=0, must-revalidate');
		return this
	}

	serviceHeaders(service){
		if (this.req.method=='GET') {
	       this.res.setHeader(
	            'Content-Type',
	            'application/x-git-' + service + '-advertisement'
	        );
		}if(this.req.method == "POST"){
	        this.res.setHeader(
	            'Content-Type',
	            'application/x-git-' + service + '-result'
	        );
		}
		return this
	}

}
