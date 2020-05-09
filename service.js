module.exports =(req)=>{
	var url=req.url

	var patt=/git-(.*)$/
	let service=url.match(patt)[1]
	return service;

}
