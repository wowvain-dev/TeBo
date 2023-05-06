import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/dm-sans";
import "./samples/node-api";
import "./index.scss";
import {BrowserRouter, HashRouter} from "react-router-dom";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "@/dev";

export const VERSION_NUMBER = 'v2.1.1';
export const OPENAI_KEY = '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';

require('dotenv').config();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<DevSupport ComponentPreviews={ComponentPreviews}
		            useInitialHook={useInitial}
		>
			<App/>
		</DevSupport>
	</React.StrictMode>,
);

postMessage({payload: "removeLoading"}, "*");
