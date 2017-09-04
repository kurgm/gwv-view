import * as React from "react";

import { RouteComponentProps } from "react-router";

import spacing from "material-ui/styles/spacing";

import Dialog from "material-ui/Dialog";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";
import { List, ListItem } from "material-ui/List";
import Paper from "material-ui/Paper";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import Subheader from "material-ui/Subheader";

import withWidth, { IProps as WithWidthProps, SMALL } from "material-ui/utils/withWidth";

import * as settings from "../settings";

interface ISettingsState {
	openDialog: number;
}

class Settings extends React.Component<RouteComponentProps<any> & WithWidthProps, ISettingsState> {
	private static nDialogs = 2;

	public state: Readonly<ISettingsState> = {
		openDialog: -1,
	};
	private openHandlers = (() => {
		const handlers = [];
		for (let i = 0; i < Settings.nDialogs; i++) {
			handlers[i] = () => {
				this.setState({
					openDialog: i,
				});
			};
		}
		return handlers;
	})();

	public render() {
		const styles = this.getStyles();

		const currentSettings = settings.getSettings();
		const imageTypeStrings = {
			[settings.ImageType.NONE]: "表示しない",
			[settings.ImageType.PNG50]: "PNG (50px)",
			[settings.ImageType.SVG]: "SVG",
		};
		const lists = [
			<List>
				<Subheader>全般</Subheader>
				<ListItem
					primaryText="画像の形式"
					secondaryText={imageTypeStrings[currentSettings.imageType]}
					onClick={this.openHandlers[0]}
				/>
				<ListItem
					primaryText="ページあたりの行数"
					secondaryText={currentSettings.itemsPerPage}
					onClick={this.openHandlers[1]}
				/>
			</List>,
		];
		const dialogs = [
			<Dialog
				title="画像の形式"
				actions={[
					<FlatButton
						label="キャンセル"
						primary={true}
						onClick={this.handleClose}
					/>,
				]}
				modal={false}
				open={this.state.openDialog === 0}
				onRequestClose={this.handleClose}
				autoScrollBodyContent={true}
				key={0}
			>
				<RadioButtonGroup
					name="imageType"
					valueSelected={currentSettings.imageType}
					onChange={this.handleDialogConfirm}
				>
					<RadioButton
						value={settings.ImageType.NONE}
						label={imageTypeStrings[settings.ImageType.NONE]}
						style={styles.radioButton}
					/>
					<RadioButton
						value={settings.ImageType.PNG50}
						label={imageTypeStrings[settings.ImageType.PNG50]}
						style={styles.radioButton}
					/>
					<RadioButton
						value={settings.ImageType.SVG}
						label={imageTypeStrings[settings.ImageType.SVG]}
						style={styles.radioButton}
					/>
				</RadioButtonGroup>
			</Dialog>,
			<Dialog
				title="ページあたりの行数"
				actions={[
					<FlatButton
						label="キャンセル"
						primary={true}
						onClick={this.handleClose}
					/>,
				]}
				modal={false}
				open={this.state.openDialog === 1}
				onRequestClose={this.handleClose}
				autoScrollBodyContent={true}
				key={1}
			>
				<RadioButtonGroup
					name="itemsPerPage"
					valueSelected={currentSettings.itemsPerPage}
					onChange={this.handleDialogConfirm}
				>
					{[10, 20, 50, 100].map((n) => (
						<RadioButton
							value={n}
							label={`${n}`}
							style={styles.radioButton}
							key={n}
						/>
					))}
				</RadioButtonGroup>
			</Dialog>,
		];
		if (this.props.width === SMALL) {
			return (
				<div>
					{lists.map((l) => [
						l,
						<Divider />,
					])}
					{dialogs}
				</div>
			);
		}
		return (
			<div style={styles.content}>
				{lists.map((l, i) => <Paper key={i}>{l}</Paper>)}
				{dialogs}
			</div>
		);
	}

	private getStyles() {
		return {
			content: {
				margin: spacing.desktopGutter,
			} as React.CSSProperties,
			radioButton: {
				marginTop: 16,
			} as React.CSSProperties,
		};
	}

	private handleDialogConfirm = (_e: React.FormEvent<{}>, selected: any) => {
		switch (this.state.openDialog) {
			case 0: {
				settings.updateSettings({
					imageType: selected,
				});
				break;
			}
			case 1: {
				settings.updateSettings({
					itemsPerPage: selected,
				});
				break;
			}
		}
		this.handleClose();
	}

	private handleClose = () => {
		this.setState({
			openDialog: -1,
		});
	}
}

export default withWidth<RouteComponentProps<any>>()(Settings);
