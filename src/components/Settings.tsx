import * as React from "react";

import Divider from "material-ui/Divider";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import ListItemText from "material-ui/List/ListItemText";
import ListSubheader from "material-ui/List/ListSubheader";
import Paper from "material-ui/Paper";

import withStyles, { WithStyles } from "material-ui/styles/withStyles";
import withWidth, { isWidthDown, WithWidthProps } from "material-ui/utils/withWidth";

import SelectDialog from "./SelectDialog";

import * as settings from "../settings";

interface ISettingsState {
	openDialog: number;
}

const styles = {
	content: {
		margin: 24, // TODO avoid magic number
	},
};

const itemsPerPageOptions = [10, 20, 50, 100];

class Settings extends React.Component<WithStyles<keyof typeof styles> & WithWidthProps, ISettingsState> {
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
		const currentSettings = settings.getSettings();
		const imageTypeStrings = {
			[settings.ImageType.NONE]: "表示しない",
			[settings.ImageType.PNG50]: "PNG (50px)",
			[settings.ImageType.SVG]: "SVG",
		};
		const lists = [
			<List>
				<ListSubheader>全般</ListSubheader>
				<ListItem button onClick={this.openHandlers[0]}>
					<ListItemText
						primary="画像の形式"
						secondary={imageTypeStrings[currentSettings.imageType]}
					/>
				</ListItem>
				<ListItem button onClick={this.openHandlers[1]}>
					<ListItemText
						primary="ページあたりの行数"
						secondary={currentSettings.itemsPerPage}
					/>
				</ListItem>
			</List>,
		];
		const dialogs = [
			<SelectDialog
				dialogTitle="画像の形式"
				open={this.state.openDialog === 0}
				onClose={this.handleClose}
				key={0}
				selectedIndex={currentSettings.imageType}
				options={[
					imageTypeStrings[settings.ImageType.NONE],
					imageTypeStrings[settings.ImageType.PNG50],
					imageTypeStrings[settings.ImageType.SVG],
				]}
				onConfirmValue={this.handleDialogConfirm}
			/>,
			<SelectDialog
				dialogTitle="ページあたりの行数"
				open={this.state.openDialog === 1}
				onClose={this.handleClose}
				key={1}
				selectedIndex={itemsPerPageOptions.indexOf(currentSettings.itemsPerPage)}
				options={itemsPerPageOptions.map((n) => `${n}`)}
				onConfirmValue={this.handleDialogConfirm}
			/>,
		];
		if (isWidthDown("xs", this.props.width)) {
			return (
				<div>
					{lists.map((l, i) => (
						<div key={i}>
							{l}
							<Divider />
						</div>
					))}
					{dialogs}
				</div>
			);
		}
		return (
			<div className={this.props.classes.content}>
				{lists.map((l, i) => <Paper key={i}>{l}</Paper>)}
				{dialogs}
			</div>
		);
	}

	private handleDialogConfirm = (_e: React.FormEvent<{}>, selectedIndex: number) => {
		switch (this.state.openDialog) {
			case 0: {
				settings.updateSettings({
					imageType: selectedIndex,
				});
				break;
			}
			case 1: {
				settings.updateSettings({
					itemsPerPage: itemsPerPageOptions[selectedIndex],
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

export default withWidth()(withStyles(styles)(Settings));
