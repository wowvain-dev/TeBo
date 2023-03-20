import './Header.scss';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link, Text } from '@nextui-org/react';

function Header() {
    const breadcrumbs = useBreadcrumbs();

    return (
        <div className="header-container">
            <div className="header-breadcrumbs">
               {breadcrumbs.map(({match, breadcrumb}, index) => 
                   <div>
                   <Link 
                   key={match.pathname} className="link" 
                   href={match.pathname === '/levels' ? '/' : match.pathname}>
                        {breadcrumb}
                    </Link>
                    {index !== breadcrumbs.length - 1 ? '/' : ''}
                    </div>
               )} 
            </div>

            <div className="header-level">
            </div>

            <div className="header-progress">

            </div>
        </div>
    );    
}

export default Header;