import React from "react";
import { TabId, TabsType } from "../utils/utilities";
import Box from "./Box";

type ChangeTabFn = (id: TabId) => void;

interface Props {
	Tabs: TabsType[];
	tabId: TabId;
	handleSetActiveTab: ChangeTabFn;
}

const TabsComponent = (props: Props) => {
	const { Tabs, handleSetActiveTab, tabId } = props;
	return (
		<Box
			as={"nav"}
			className="w-full h-16 bg-slate-100 rounded-md  my-3 shadow-sm shadow-slate-500"
		>
			<ul className="w-8/12 h-full mx-auto flex items-center justify-around">
				{Tabs.map((tab, id) => {
					return (
						<button
							key={tab.id}
							className={`list-none h-full cursor-pointer flex items-center justify-center w-1/3 relative ${
								tabId == tab.id && "active-tab"
							}`}
							onClick={(e) => handleSetActiveTab(tab.id)}
						>
							<li>{tab.name}</li>
						</button>
					);
				})}
			</ul>
		</Box>
	);
};

export default TabsComponent;
