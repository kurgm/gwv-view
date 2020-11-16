import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Title } from "react-admin";

const Dashboard = () => (
	<Card>
		<Title title="GlyphWiki dump 検証" />
		<CardContent>
			<p>
				このページでは、
				<a href="https://glyphwiki.org/wiki/GlyphWiki:%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%9A%E3%83%BC%E3%82%B8">
					グリフウィキ
				</a>
				のグリフで気になるグリフを一覧にしています。
			</p>
			<p>
				公開されている dump から
				<a href="https://github.com/kurgm/gwv">プログラム</a>
				で生成しています。毎日午前 2〜3 時 (JST) に更新されます。
				ご意見、バグ報告等あれば GitHub の Issues（
				<a href="https://github.com/kurgm/gwv/issues">検証プログラムについてはこちら</a>
				、
				<a href="https://github.com/kurgm/gwv-view/issues">このページについてはこちら</a>
				）または&nbsp;
				<a href="https://glyphwiki.org/wiki/User-talk:twe">利用者-会話:twe</a>
				&nbsp;または&nbsp;
				<a href="https://twitter.com/kurgm">@kurgm</a>
				&nbsp;へお願いします。
			</p>
			<p>
				なお「怪しいものはとりあえずすべて並べてみよう」という方針のため、大多数が誤検出という項目もあります……。
			</p>
		</CardContent>
	</Card>
);

export default Dashboard;
