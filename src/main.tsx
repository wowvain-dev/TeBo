import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/dm-sans";
import "./samples/node-api";
import "./index.scss";
import {BrowserRouter, HashRouter} from "react-router-dom";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "@/dev";
import {homedir} from "os";
import {existsSync, readFileSync} from "fs";
import {join} from "path";

export const VERSION_NUMBER = 'v2.3.0';

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
