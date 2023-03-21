import { Outlet } from 'react-router-dom';
import './layout.scss';
import background from "../assets/background-2.jpg";
import Header from "../components/Header";

function Footer() {
    return <div>
        <p>FOOTER</p>
    </div>
}

export function PageLayout() {
    return(
        <div className="page-layout"
            style={{
                backgroundImage: background
            }}
        >
            <Header />
            <Outlet />
            {/* <Footer /> */}
        </div>
    );
}

export function OverallLayout() {
    return(
        <div className="overall-layout"
        >
            <Outlet /> 
        </div>
    );
}