var fs = require('fs');

const EMPTYLINE = ' ',
	NEWLINE = '\r\n';
const SEP = ';'

var keys = [];

function parseArray(arr) {
	var struct = [];

	//Adding category, company and data to the struct object
	var categoryIndex = -1,
		companyIndex = -1;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].indexOf(SEP) === -1 && (arr[i + 1] && arr[i + 1].indexOf(SEP) === -1)) {
			var category = arr[i];
			categoryIndex++;
			companyIndex = -1;
			struct.push({
				category: category,
				companies: []
			});
		} else if (arr[i].indexOf(SEP) === -1 && (arr[i + 1] && arr[i + 1].indexOf(SEP) > -1)) {
			var company = arr[i];
			companyIndex++;
			struct[categoryIndex].companies.push({
				company: company,
				funds: []
			})
		} else if (arr[i].indexOf(SEP) > -1) {
			var data = arr[i].split(SEP);
			var dataObj = {};
			keys.forEach(function(d, i) {
				dataObj[d] = data[i];
			})
			struct[categoryIndex].companies[companyIndex].funds
				.push(dataObj);
		}
	}

	return struct
}

function parseFile(filename,cb) {
	fs.readFile('mutualfund.txt', 'utf8', function(err, data) {
		if (err)
			console.log(err);

		//Putting everything in an array splitting on newline
		var arr = data.split(NEWLINE);

		//Removing all the empty lines
		arr.forEach(function(d, i) {
			if (d === EMPTYLINE)
				arr.splice(i, 1);
		});

		//Spliting the first line for the array of keys
		keys = arr[0].split(SEP);

		global.keys=keys;

		//Removing the first element from the array
		arr = arr.slice(1, arr.length);

		global.MF = JSON.stringify(parseArray(arr));
		// fs.writeFile('data.json', stringifiedJson, 'utf8', function(err) {
		// 	if (err) {
		// 		console.error(' #@^$ !! Not Again.... !! ');
		// 		return;
		// 	}
		// 	console.log('data.json file generated');
		// 	cb();
		// });
		console.log('GLOBAL.MF CREATED.');
		cb();
	});
}

module.exports = parseFile;