export interface NumberCell {
	type: "number";
	options?: Intl.NumberFormatOptions;
}

export type TabularCellType = "glyphname" | "glyphnames" | "kageline" | "quotedpart" | "text" | "number" | NumberCell | "ignore";

export interface TabularColumn {
	type: TabularCellType;
	label?: string;
}

export interface TabularRowEntry {
	type: "tabular";
	columns: TabularColumn[];
}

export interface HeadTailEntry {
	type: "headtail";
	headLabel: string;
	headType: TabularCellType;
	tailLabel: string;
	tailType: "glyphname";
}

export interface MustrenewEntry {
	type: "mustrenew";
}

export type ValidateItemEntryType = TabularRowEntry | HeadTailEntry | MustrenewEntry;

export interface ValidateItem {
	validatorName: string;
	errorCode: string;
	title: string;
	entryType: ValidateItemEntryType;
}

export const validateItems: ValidateItem[] = [

	...(() => {
		const cornerTypes = [
			"左上カド",
			"左下カド",
			"右上カド",
			"右下カド",
			"左下zh用旧カド",
			"擬似右下H/Tカド",
			"左下zh用新カド",
			"接続(横)",
			"開放",
			"接続(縦)",
			"右下H/Tカド",
		];
		return cornerTypes.map((guessedName, guessedIndex) => cornerTypes.map((usedName, usedIndex): ValidateItem => {
			const errorCode = guessedIndex.toString(16) + usedIndex.toString(16);
			const title = (guessedIndex === usedIndex)
				? `${usedName}が離れている`
				: `${guessedName}に${usedName}形状を使用している`;

			return {
				validatorName: "corner",
				errorCode,
				title,
				entryType: {
					type: "tabular",
					columns: [
						{ type: "glyphname", label: "グリフ名" },
						{ type: "kageline", label: "縦画" },
						{ type: "kageline", label: "横画" },
					],
				},
			};
		})).reduce((a, b) => a.concat(b), []);
	})(),

	{
		validatorName: "delquote",
		errorCode: "0",
		title: "最新版が存在しない部品を引用している",
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "glyphname", label: "引用されている部品" },
			],
		},
	},

	{
		validatorName: "donotuse",
		errorCode: "0",
		title: "「最新版がdo-not-useを引用するグリフ」を引用している",
		entryType: {
			type: "headtail",
			headLabel: "グリフ名",
			headType: "glyphname",
			tailLabel: "引用されているグリフ",
			tailType: "glyphname",
		},
	},

	...[
		{ errorCode: "10", itemName: "横画" },
		{ errorCode: "11", itemName: "縦画" },
		{ errorCode: "2", itemName: "曲線" },
		{ errorCode: "3", itemName: "複曲線" },
		{ errorCode: "9", itemName: "部品位置" },
		{ errorCode: "99", itemName: "部品" },
	].map(({ errorCode, itemName }): ValidateItem => {
		const columns: TabularColumn[] = [
			{ type: "glyphname", label: "グリフ名" },
			{ type: "kageline", label: "行1" },
			{ type: "kageline", label: "行2" },
		];
		if (["10", "11"].includes(errorCode)) {
			columns.push({ type: "number", label: "重複" });
		}
		return {
			validatorName: "dup",
			errorCode,
			title: `${itemName}の重複`,
			entryType: {
				type: "tabular",
				columns,
			},
		};
	}),

	...[
		{ errorCode: "1", title: "左右型のIDSだが、上下結合の部品を引用している" },
		{ errorCode: "2", title: "-02の部品を最初に引用している" },
		{ errorCode: "10", title: "上下型のIDSだが、左右結合の部品を引用している" },
		{ errorCode: "12", title: "下側にくる部品を最初に引用している" },
		{ errorCode: "22", title: "囲い型のIDSだが、内側にくる部品を最初に引用している" },
	].map(({ errorCode, title }): ValidateItem => ({
		validatorName: "ids",
		errorCode,
		title,
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "glyphname", label: "引用されているグリフ" },
			],
		},
	})),
	...[
		{ errorCode: "6", title: "左右型のIDSだが、最初の部品が横長" },
		{ errorCode: "15", title: "上下型のIDSだが、最初の部品が縦長" },
	].map(({ errorCode, title }): ValidateItem => ({
		validatorName: "ids",
		errorCode,
		title,
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "quotedpart", label: "最初の部品" },
			],
		},
	})),
	...[
		{ errorCode: "3", title: "左右型のIDSの左の字を最初に引用していない" },
		{ errorCode: "13", title: "上下型のIDSの上の字を最初に引用していない" },
		{ errorCode: "23", title: "囲い型のIDSの外側の字を最初に引用していない" },
		{ errorCode: "33", title: "重ね型のIDSの1番目の字を最初に引用していない" },
	].map(({ errorCode, title }): ValidateItem => ({
		validatorName: "ids",
		errorCode,
		title,
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "kageline", label: "最初に引用している行" },
			],
		},
	})),

	...[
		{ errorCode: "0", title: "未定義の筆画の種類" },
		{ errorCode: "1", title: "列数が不足" },
		{ errorCode: "2", title: "列数が超過(非ゼロ値)" },
		{ errorCode: "3", title: "列数が超過(ゼロ値)" },
		{ errorCode: "4", title: "不正な列数" },
		{ errorCode: "5", title: "不正なデータ" },
		{ errorCode: "6", title: "ありえない形状の組み合わせ" },
		{ errorCode: "7", title: "不正なエイリアス書式" },
		{ errorCode: "9", title: "部品位置の指定がある" },
		{ errorCode: "10", title: "横画に縦画用の接続形状を使用" },
		{ errorCode: "11", title: "縦画に接続(横)を使用" },
		{ errorCode: "30", title: "折れの前半が横" },
		{ errorCode: "31", title: "折れの後半が縦" },
		{ errorCode: "40", title: "乙線の前半が横" },
		{ errorCode: "41", title: "乙線の後半が左向き" },
	].map(({ errorCode, title }): ValidateItem => ({
		validatorName: "illegal",
		errorCode,
		title,
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "ignore" },
				{ type: "kageline", label: "データ" },
			],
		},
	})),

	...[
		{ errorCode: "0", title: "-{j,ja,jv}グリフと無印グリフで実体が異なる" },
		{ errorCode: "40", title: "存在しない地域ソース" },
		{ errorCode: "41", title: "存在しない地域ソース(偏化変形)" },
		{ errorCode: "5", title: "原規格分離漢字-jvが作成されている" },
	].map(({ errorCode, title }): ValidateItem => ({
		validatorName: "j",
		errorCode,
		title,
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
			],
		},
	})),
	{
		validatorName: "j",
		errorCode: "1",
		title: "-jvと-{j,ja}が両方存在",
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "-jvグリフ名" },
				{ type: "text", label: "-jまたは-ja" },
			],
		},
	},
	{
		validatorName: "j",
		errorCode: "2",
		title: "-jvが仮想J字形に使わない字形の部品を使用している",
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "glyphname", label: "使わない部品" },
				{ type: "glyphname", label: "使う部品" },
			],
		},
	},
	...["J", "K"].map((source, index): ValidateItem => ({
		validatorName: "j",
		errorCode: `3${index}`,
		title: `${source}ソースが存在するが-${source.toLowerCase()}vが存在`,
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "text", label: "ソース" },
			],
		},
	})),

	{
		validatorName: "kosekitoki",
		errorCode: "0",
		title: "エイリアスでない",
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
			],
		},
	},
	{
		validatorName: "kosekitoki",
		errorCode: "1",
		title: "koseki-のエイリアスでない",
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "glyphname", label: "実体" },
			],
		},
	},
	{
		validatorName: "kosekitoki",
		errorCode: "2",
		title: "koseki-と実体が異なる",
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "glyphname", label: "実体" },
				{ type: "glyphname", label: "koseki-の実体" },
			],
		},
	},

	...[
		{ errorCode: "0", title: "実体が間違っている" },
		{ errorCode: "1", title: "関連字が間違っている" },
		{ errorCode: "2", title: "関連字が未設定" },
	].map(({ errorCode, title }): ValidateItem => ({
		validatorName: "mj",
		errorCode,
		title,
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{
					type: errorCode === "2" ? "ignore" : "glyphname",
					label: errorCode === "0" ? "現在の実体" : "現在の関連字",
				},
				{ type: "glyphnames", label: "提案" },
			],
		},
	})),

	...[
		{ errorCode: "0", title: "「最新版が旧部品を引用していない部品」の旧版を引用" },
		{ errorCode: "@", title: "「最新版が旧部品を引用している部品」の旧版を引用" },
	].map(({ errorCode, title }): ValidateItem => ({
		validatorName: "mustrenew",
		errorCode,
		title,
		entryType: { type: "mustrenew" },
	})),

	...[
		{ errorCode: "0", title: "規則に無いグリフ名" },
		{ errorCode: "1", title: "不正なIDS" },
		{ errorCode: "2", title: "許可されていないグリフ名(欠番など)" },
		{ errorCode: "4", title: "廃止予定の命名規則" },
	].map(({ errorCode, title }): ValidateItem => ({
		validatorName: "naming",
		errorCode,
		title,
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
			],
		},
	})),
	{
		validatorName: "naming",
		errorCode: "3",
		title: "IDS文字名にUCSで符号化されたCDP外字が含まれている",
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "glyphname", label: "CDP外字" },
				{ type: "glyphname", label: "UCS" },
			],
		},
	},

	...[
		{ errorCode: "0", title: "空行がある" },
		{ errorCode: "1", title: "不正な文字" },
		{ errorCode: "2", title: "10進数の整数として解釈できない値" },
		{ errorCode: "3", title: "標準的でない数値の表記" },
	].map(({ errorCode, title }): ValidateItem => ({
		validatorName: "numexp",
		errorCode,
		title,
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "kageline", label: "データ" },
			],
		},
	})),

	...[
		{ errorCode: "2", title: "右にくる部品が最初に引用されている" },
		{ errorCode: "4", title: "下にくる部品が最初に引用されている" },
		{ errorCode: "6", title: "囲い結合の中にくる部品が最初に引用されている" },
		{ errorCode: "11", title: "左にくる部品が最後に引用されている" },
		{ errorCode: "13", title: "上にくる部品が最後に引用されている" },
		{ errorCode: "15", title: "囲い結合の外にくる部品が最後に引用されている" },
	].map(({ errorCode, title }): ValidateItem => ({
		validatorName: "order",
		errorCode,
		title,
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "glyphname", label: "引用されている部品" },
			],
		},
	})),

	{
		validatorName: "related",
		errorCode: "0",
		title: "関連字が間違っている",
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "glyphname", label: "現在の関連字" },
				{ type: "glyphname", label: "正しい関連字" },
			],
		},
	},
	{
		validatorName: "related",
		errorCode: "1",
		title: "関連字が未設定",
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "glyphname", label: "正しい関連字" },
			],
		},
	},
	{
		validatorName: "related",
		errorCode: "2",
		title: "実体が存在しない",
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "glyphname", label: "存在しない実体" },
			],
		},
	},
	{
		validatorName: "related",
		errorCode: "10",
		title: "実体の関連字が間違っている",
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "glyphname", label: "実体" },
				{ type: "glyphname", label: "現在の関連字" },
				{ type: "glyphname", label: "正しい関連字" },
			],
		},
	},
	{
		validatorName: "related",
		errorCode: "11",
		title: "実体の関連字が未設定",
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "glyphname", label: "実体" },
				{ type: "glyphname", label: "正しい関連字" },
			],
		},
	},

	...[
		{ errorCode: "10", title: "横画が歪んでいる" },
		{ errorCode: "11", title: "縦画が歪んでいる" },
		{ errorCode: "30", title: "折れの後半が歪んでいる" },
		{ errorCode: "31", title: "折れの前半が歪んでいる" },
		{ errorCode: "40", title: "乙線の後半が歪んでいる" },
		{ errorCode: "71", title: "縦払いの直線部分と曲線部分の間で折れ曲がっている" },
		{ errorCode: "72", title: "縦払いの直線部分が歪んでいる" },
	].map(({ errorCode, title }): ValidateItem => ({
		validatorName: "skew",
		errorCode,
		title,
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "kageline", label: "データ" },
				{
					type: {
						type: "number",
						options: { style: "unit", unit: "degree" } as Intl.NumberFormatOptions, // FIXME: ts does not know "unit" property?
					},
					label: "角度",
				},
			],
		},
	})),
	{
		validatorName: "skew",
		errorCode: "70",
		title: "縦払いの前半（直線部分）が横になっている",
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
				{ type: "kageline", label: "データ" },
			],
		},
	},

	...[
		{ errorCode: "0", title: "UCS無印グリフがUCS関連グリフ以外のエイリアスである" },
		{ errorCode: "1", title: "UCS地域指定グリフがその無印グリフのエイリアスである" },
		{ errorCode: "10", title: "UCS-var-グリフがその無印グリフと実体が同じである" },
		{ errorCode: "11", title: "UCS無印グリフがその-var-グリフのエイリアスである" },
		{ errorCode: "20", title: "UCS-itaiji-グリフがその無印グリフと実体が同じである" },
		{ errorCode: "21", title: "UCS無印グリフがその-itaiji-グリフのエイリアスである" },
	].map(({ errorCode, title }): ValidateItem => {
		const columns: TabularColumn[] = [
			{ type: "glyphname", label: "グリフ名" },
		];
		if (errorCode !== "1") {
			columns.push({ type: "glyphname", label: "実体" });
		}
		return ({
			validatorName: "ucsalias",
			errorCode,
			title,
			entryType: {
				type: "tabular",
				columns,
			},
		});
	}),

	...[
		{ errorCode: "0", title: "グループ:NonSpacingGlyphs-Halfwidthに含まれているが全角" },
		{ errorCode: "1", title: "グループ:HalfwidthGlyphs-*に含まれているが全角" },
		{ errorCode: "2", title: "半角だがグループ:HalfwidthGlyphs-*に含まれていない" },
	].map(({ errorCode, title }): ValidateItem => ({
		validatorName: "width",
		errorCode,
		title,
		entryType: {
			type: "tabular",
			columns: [
				{ type: "glyphname", label: "グリフ名" },
			],
		},
	})),

];

export interface ValidatorDesc {
	name: string;
	title: string;
}

export const validators: ValidatorDesc[] = [
	{ name: "corner", title: "カド形状・接続" },
	{ name: "related", title: "関連字" },
	{ name: "illegal", title: "不正なデータ" },
	{ name: "skew", title: "歪んだ筆画" },
	{ name: "donotuse", title: "Do not use" },
	{ name: "kosekitoki", title: "kosekiとtoki-00" },
	{ name: "mj", title: "MJ文字情報一覧表" },
	{ name: "ucsalias", title: "UCSと別名" },
	{ name: "dup", title: "重複" },
	{ name: "naming", title: "命名" },
	{ name: "ids", title: "IDSとの不一致" },
	{ name: "order", title: "部品の順序" },
	{ name: "delquote", title: "削除された部品" },
	{ name: "delvar", title: "無の派生" },
	{ name: "numexp", title: "数値の表現" },
	{ name: "mustrenew", title: "旧部品の更新" },
	{ name: "j", title: "地域字形" },
	{ name: "width", title: "全角・半角" },
];
