import * as React from "react";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";

import {makeStyles, useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import SelectDialog from "./SelectDialog";

import * as settings from "../settings";

const useStyles = makeStyles({
	content: {
		margin: 24, // TODO avoid magic number
	},
});

const itemsPerPageOptions = [10, 20, 50, 100];

const Settings: React.FunctionComponent = () => {
	const classes = useStyles();

	const [openDialog, setOpenDialog] = React.useState(-1);

	const handleClose = () => {
		setOpenDialog(-1);
	};

	const handleDialogConfirm = (_e: React.FormEvent<{}>, selectedIndex: number) => {
		switch (openDialog) {
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
		handleClose();
	};

	const currentSettings = settings.getSettings();
	const imageTypeStrings = {
		[settings.ImageType.NONE]: "表示しない",
		[settings.ImageType.PNG50]: "PNG (50px)",
		[settings.ImageType.SVG]: "SVG",
	};

	const lists = [
		<List>
			<ListSubheader>全般</ListSubheader>
			<ListItem button onClick={() => {setOpenDialog(0);}}>
				<ListItemText
					primary="画像の形式"
					secondary={imageTypeStrings[currentSettings.imageType]}
				/>
			</ListItem>
			<ListItem button onClick={() => {setOpenDialog(1);}}>
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
			open={openDialog === 0}
			onClose={handleClose}
			key={0}
			selectedIndex={currentSettings.imageType}
			options={[
				imageTypeStrings[settings.ImageType.NONE],
				imageTypeStrings[settings.ImageType.PNG50],
				imageTypeStrings[settings.ImageType.SVG],
			]}
			onConfirmValue={handleDialogConfirm}
		/>,
		<SelectDialog
			dialogTitle="ページあたりの行数"
			open={openDialog === 1}
			onClose={handleClose}
			key={1}
			selectedIndex={itemsPerPageOptions.indexOf(currentSettings.itemsPerPage)}
			options={itemsPerPageOptions.map((n) => `${n}`)}
			onConfirmValue={handleDialogConfirm}
		/>,
	];

	if (useMediaQuery(useTheme().breakpoints.down("xs"))) {
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
		<div className={classes.content}>
			{lists.map((l, i) => <Paper key={i}>{l}</Paper>)}
			{dialogs}
		</div>
	);
};

export default Settings;
