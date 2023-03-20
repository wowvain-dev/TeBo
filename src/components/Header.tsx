import './Header.scss';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link, Progress, Text } from '@nextui-org/react';
import { BiHomeAlt2 } from 'react-icons/bi';

function Header() {
    const breadcrumbs = useBreadcrumbs();

    return (
        <div className="header-container">
            <div className="header-breadcrumbs">
               {breadcrumbs.map(({match, breadcrumb}, index) => 
                   <div key={match.pathname}>
                   <Link 
                   className="link" 
                   href={match.pathname === '/levels' ? '/' : match.pathname}>
                        {breadcrumb === "Home" ? <BiHomeAlt2 /> : breadcrumb}
                    </Link>
                    {index !== breadcrumbs.length - 1 ? '/' : ''}
                    </div>
               )} 
            </div>

            <div className="header-level">
                <p>Învăţăcel</p>
            </div>

            <div className="header-progress">
                <Progress value={90} color="gradient" />
            </div>
        </div>
    );    
}

export default Header;