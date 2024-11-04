import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import { Title } from "react-admin";

const Dashboard = () => (
	<Card>
		<Title title="GlyphWiki dump 検証" />
		<CardContent>
			<p>
				このページでは、
				<Link href="https://glyphwiki.org/wiki/GlyphWiki:%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%9A%E3%83%BC%E3%82%B8">
					グリフウィキ
				</Link>
				のグリフで気になるグリフを一覧にしています。
			</p>
			<p>
				公開されている dump から
				<Link href="https://github.com/kurgm/gwv">プログラム</Link>
				で生成しています。毎日午前 2〜3 時 (JST) に更新されます。
				ご意見、バグ報告等あれば GitHub の Issues（
				<Link href="https://github.com/kurgm/gwv/issues">
					検証プログラムについてはこちら
				</Link>
				、
				<Link href="https://github.com/kurgm/gwv-view/issues">
					このページについてはこちら
				</Link>
				）または{" "}
				<Link href="https://glyphwiki.org/wiki/User-talk:twe">
					利用者-会話:twe
				</Link>{" "}
				または <Link href="https://twitter.com/kurgm">@kurgm</Link>{" "}
				へお願いします。
			</p>
			<p>
				なお「怪しいものはとりあえずすべて並べてみよう」という方針のため、大多数が誤検出という項目もあります……。
			</p>
		</CardContent>
	</Card>
);

export default Dashboard;
