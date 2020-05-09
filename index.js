var fetch=require('./fetch')
var push=require('./push')

module.exports=(git_project_root,actionHandler)=>{
	return (req,res)=>{
		try{
			x=[req,res,git_project_root,actionHandler]
			gitpoint.apply(undefined,x)
		}catch(e){
			throw e;
		}
	}
}

const gitpoint=(req,res,rootLocation,eventHandler)=>{
	return new Promise((reject,resolve)=>{
		const method=req.method;
		if (method == 'GET') {
			var f= new fetch(req,res,rootLocation).response()

		}else if(method == "POST"){
			var p=new push(req,res,rootLocation,eventHandler).response()
			typeof eventHandler == 'function' ?
				eventHandler(p) :
				null

		}else{
	        res.statusCode = 405;
	        res.end('method not supported');
		}
	})
}
