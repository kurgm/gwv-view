import * as React from "react";

import { RouteComponentProps } from "react-router";

// import spacing from "material-ui/styles/spacing";

// import Divider from "material-ui/Divider";
import List, { ListItem, ListItemText, ListSubheader } from "material-ui/List";
import Paper from "material-ui/Paper";
// import Typography from "material-ui/Typography"

import { StyledComponentProps } from "material-ui";
import withStyles from "material-ui/styles/withStyles";

// import withWidth, { IProps as WithWidthProps, SMALL } from "material-ui/utils/withWidth";

import SelectDialog from "./SelectDialog";

import * as settings from "../settings";

interface ISettingsState {
	openDialog: number;
}

const styles = {
	content: {
		// margin: spacing.desktopGutter,
		margin: 24, // TODO avoid magic number
	},
};

const itemsPerPageOptions = [10, 20, 50, 100];

class Settings extends React.Component<
	RouteComponentProps<any> & StyledComponentProps<keyof typeof styles>/* & WithWidthProps*/,
	ISettingsState> {
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
				onRequestClose={this.handleClose}
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
				onRequestClose={this.handleClose}
				key={1}
				selectedIndex={itemsPerPageOptions.indexOf(currentSettings.itemsPerPage)}
				options={itemsPerPageOptions.map((n) => `${n}`)}
				onConfirmValue={this.handleDialogConfirm}
			/>,
		];
		// if (this.props.width === SMALL) {
		// 	return (
		// 		<div>
		// 			{lists.map((l) => [
		// 				l,
		// 				<Divider />,
		// 			])}
		// 			{dialogs}
		// 		</div>
		// 	);
		// }
		return (
			<div className={this.props.classes!.content}>
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

export default withStyles(styles)(Settings);
