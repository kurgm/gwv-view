import * as React from "react";

import List, { ListItem, ListItemProps, ListProps } from "material-ui/List";

export interface ISelectableListItemProps<T> extends ListItemProps {
	selectValue: T;
}

export interface ISelectableListProps<T> extends ListProps {
	children: React.ReactElement<ISelectableListItemProps<T>>
	| boolean | null | undefined
	| Array<React.ReactElement<ISelectableListItemProps<T>> | boolean | null | undefined>;
	selectedItemStyle?: React.CSSProperties;
	value?: T;
	onChangeSelectable?(e: React.MouseEvent<any>, value: T): void;
}

export default class SelectableList<T> extends React.Component<ISelectableListProps<T>> {
	protected keyIndex: number;

	public render() {
		const {
			children,
			selectedItemStyle, value, onChangeSelectable,
			...rest,
		} = this.props;

		this.keyIndex = 0;
		const styles: React.CSSProperties = {};

		if (!selectedItemStyle) {
			styles.backgroundColor = "rgba(0, 0, 0, 0.2)"; // ????
		}

		return (
			<List {...rest}>
				{React.Children.map(children, (child) => (
					this.extendChild(child, styles, selectedItemStyle)
				))}
			</List>
		);
	}

	protected extendChild(
		child: React.ReactChild,
		styles: React.CSSProperties,
		selectedItemStyle?: React.CSSProperties) {
		if (child && this.isListItem(child)) {
			const selected = this.isChildSelected(child, this.props);
			let selectedChildrenStyles;
			if (selected) {
				selectedChildrenStyles = { ...styles, ...selectedItemStyle };
			}

			const mergedChildrenStyles = { ...child.props.style, ...selectedChildrenStyles };

			this.keyIndex += 1;

			return React.cloneElement<ISelectableListItemProps<T>, Partial<ISelectableListItemProps<T>>>(child, {
				// key: this.keyIndex,
				onClick: (event: React.MouseEvent<HTMLLIElement>) => {
					this.handleItemClick(event, child);
					if (child.props.onClick) {
						(child.props.onClick as React.EventHandler<React.MouseEvent<any>>)(event);
					}
				},
				style: mergedChildrenStyles,
			});
		}
		return child;
	}

	protected isListItem(el: React.ReactChild): el is React.ReactElement<ISelectableListItemProps<T>> {
		return (el as React.ReactElement<any>).type === SelectableListItem;
	}

	protected isChildSelected(child: React.ReactElement<ISelectableListItemProps<T>>, props: ISelectableListProps<T>) {
		return props.value === child.props.selectValue;
	}

	protected handleItemClick(event: React.MouseEvent<any>, item: React.ReactElement<ISelectableListItemProps<T>>) {
		const itemValue = item.props.selectValue;

		if (itemValue !== this.props.value) {
			if (this.props.onChangeSelectable) {
				this.props.onChangeSelectable(event, itemValue);
			}
		}
	}
}

export class SelectableListItem<T> extends React.Component<ISelectableListItemProps<T>> {
	public render() {
		const { selectValue, ...rest } = this.props;
		return <ListItem {...rest} />;
	}
}
