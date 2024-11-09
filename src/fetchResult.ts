const jsonUrl =
	"https://gist.githubusercontent.com/kurgm/cef8cd1cc8de3484739839816a165e20/raw/gwv_result.json";

export const fetchResultJson = async (): Promise<GWVJSON> => {
	const response = await fetch(jsonUrl);
	const data = (await response.json()) as GWVJSON;
	return data;
};
