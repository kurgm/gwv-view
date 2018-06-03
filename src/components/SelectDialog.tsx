import * as React from "react";

import Button from "@material-ui/core/Button/Button";
import Dialog, {DialogProps} from "@material-ui/core/Dialog/Dialog";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";

interface ISelectDialogProps extends DialogProps {
	dialogTitle: React.ReactNode;
	options: string[];
	selectedIndex: number;
	onConfirmValue(event: React.SyntheticEvent<any>, index: number): void;
}
interface ISelectDialogState {
	selectedIndex: number;
}

class SelectDialog extends React.Component<ISelectDialogProps, ISelectDialogState> {
	public state = {
		selectedIndex: 0,
	};

	public componentWillMount() {
		this.setState({
			selectedIndex: this.props.selectedIndex,
		});
	}

	public componentWillUpdate(nextProps: Readonly<ISelectDialogProps>) {
		if (nextProps.selectedIndex !== this.props.selectedIndex) {
			this.setState({
				selectedIndex: nextProps.selectedIndex,
			});
		}
	}

	public render() {
		const { selectedIndex, onConfirmValue, options, dialogTitle, ...rest } = this.props;
		return (
			<Dialog {...rest}>
				<DialogTitle>{dialogTitle}</DialogTitle>
				<DialogContent>
					<RadioGroup
						value={"" + this.state.selectedIndex}
						onChange={this.handleChange}
					>
						{this.props.options.map((option, index) => (
							<FormControlLabel
								value={"" + index}
								key={index}
								control={<Radio />}
								label={option}
							/>
						))}
					</RadioGroup>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleCancel}>
						キャンセル
					</Button>
				</DialogActions>
			</Dialog>
		);
	}

	protected handleCancel = (event: React.MouseEvent<any>) => {
		this.props.onConfirmValue(event, this.props.selectedIndex);
		if (this.props.onClose) {
			(this.props.onClose as React.EventHandler<any>)(event);
		}
	}
	// protected handleOk = () => {
	// 	this.props.onConfirmValue(this.state.value!);
	// }
	protected handleChange = (event: React.ChangeEvent<any>, value: string) => {
		this.setState({
			selectedIndex: +value,
		});
		this.props.onConfirmValue(event, +value);
	}
}

export default SelectDialog;
