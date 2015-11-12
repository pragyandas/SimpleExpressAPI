function getCategory(){
	return JSON.parse(global.MF).map(function(category){
		return category.category;
	});
}

function getCompany(categoryName){
	return JSON.parse(global.MF).filter(function(category){
		return category.category===categoryName;
	})[0].companies.map(function(company){
		return company.company;
	});
}

function getFunds(categoryName,companyName){
	return JSON.parse(global.MF).filter(function(category){
		return category.category===categoryName;
	})[0].companies.filter(function(company){
		return company.company===companyName;
	})[0].funds;
}

module.exports=function(queryObj,cb){
	var result='';
	if(queryObj===null){
		result=getCategory();
	}
	else if(queryObj.category && !queryObj.company){
		result=getCompany(queryObj.category,cb);
	}
	else if(queryObj.category && queryObj.company){
		result=getFunds(queryObj.category,queryObj.company,cb);
	}

	if(result && result!==null && result!=='')
		cb(null,result);
	else{
		cb({message:'Error getting result'},null);
	}	
}