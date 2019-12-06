import * as React from "react";

import Button from "@material-ui/core/Button/Button";
import Dialog, {DialogProps} from "@material-ui/core/Dialog/Dialog";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";

interface SelectDialogProps extends DialogProps {
	dialogTitle: React.ReactNode;
	options: string[];
	selectedIndex: number;
	onConfirmValue(event: React.SyntheticEvent<any>, index: number): void;
}

const SelectDialog: React.FunctionComponent<SelectDialogProps> = (props) => {
	const [selectedIndex, setSelectedIndex] = React.useState(0);

	React.useEffect(() => {
		setSelectedIndex(props.selectedIndex);
	}, [props.selectedIndex]);

	const handleCancel = (event: React.MouseEvent<any>) => {
		props.onConfirmValue(event, props.selectedIndex);
		if (props.onClose) {
			(props.onClose as React.EventHandler<any>)(event);
		}
	};
	const handleChange = (event: React.ChangeEvent<any>, value: string) => {
		setSelectedIndex(Number(value));
		props.onConfirmValue(event, Number(value));
	};

	const {
		selectedIndex: defaultSelectedIndex,
		onConfirmValue, options, dialogTitle,
		...rest
	} = props;
	return (
		<Dialog {...rest}>
			<DialogTitle>{dialogTitle}</DialogTitle>
			<DialogContent>
				<RadioGroup
					value={`${selectedIndex}`}
					onChange={handleChange}
				>
					{options.map((option, index) => (
						<FormControlLabel
							value={`${index}`}
							key={index}
							control={<Radio />}
							label={option}
						/>
					))}
				</RadioGroup>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCancel}>
					キャンセル
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default SelectDialog;
