function getMatcher(query: string) {
	let re: RegExp;
	try {
		re = new RegExp(query);
	} catch (e) {
		return (value: string) => value.includes(query);
	}
	return (value: string) => re.test(value);
}

function findInObj(val: any, matcher: (value: string) => boolean): boolean {
	if (val === null) {
		return false;
	}
	switch (typeof val) {
		case "object":
			return Object.keys(val).some((key) => findInObj(val[key], matcher));
		case "undefined":
			return false;
		default:
			return matcher(`${val}`);
	}
}

function searchData(data: GWVJSON, query: string): GWVJSON {
	const matcher = getMatcher(query);
	const {lastModified, result} = data;
	const filteredResult: GWVJSON["result"] = {};
	for (const key of Object.keys(result)) {
		filteredResult[key] = {};
		for (const type of Object.keys(result[key])) {
			filteredResult[key][type] = result[key][type].filter((val) => findInObj(val, matcher));
		}
	}
	return {
		lastModified,
		result: filteredResult,
	};
}

export default searchData;
