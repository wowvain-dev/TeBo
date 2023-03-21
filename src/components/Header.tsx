import './Header.scss';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Progress, Text, Button, Dropdown } from '@nextui-org/react';
import { BiHomeAlt2 } from 'react-icons/bi';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ReactElement } from 'react';
import AnimatedPage from '@/components/AnimatedPage';
import { useProgressContext } from '../helpers/context';

function Header() {
    const breadcrumbs = useBreadcrumbs();
    const location = useLocation();
    const navigate = useNavigate();
    const progress = useProgressContext();

    const str = ">";

    const Breadcrumbs = () => {
        let crumbs: Array<ReactElement> = new Array<JSX.Element>;
        for (let i = 0; i < breadcrumbs.length; i++) {
            if (breadcrumbs[i].match.pathname === '/') {
                crumbs.push(
                <div>
                    <Button light auto 
                     
                    size="xs" css={{display: 'inline-block'}}
                        onPress={() => navigate('/')}
                    >
                    <BiHomeAlt2 />
                    </Button>
                    <span> {str} </span>
                </div>
                );
            } else if (breadcrumbs[i].match.pathname === '/levels/1') {
                crumbs.push (
                    <div>
                        <Button light auto css={{fontFamily: "DM Sans"}} size='sm'
                        >
                            Învăţăcel
                        </Button>
                    </div>
                );
                if (i !== breadcrumbs.length - 1) crumbs.push(<span>{str}</span>);
            } else if (breadcrumbs[i].match.pathname === '/levels/2') {
                crumbs.push (
                    <div>
                        <Button light auto css={{fontFamily: "DM Sans"}} size='sm'
                        >
                            Cunoscător
                        </Button>
                    </div>
                );
                if (i !== breadcrumbs.length - 1) crumbs.push(<span>{str}</span>);
            } else if (breadcrumbs[i].match.pathname === '/levels/3') {
                crumbs.push (
                    <div>
                        <Button light auto css={{fontFamily: "DM Sans"}} size='sm'
                        >
                            Expert
                        </Button>
                    </div>
                );
                if (i !== breadcrumbs.length - 1) crumbs.push(<span>{str}</span>);
            } 
        }
        return(crumbs);
    };


    return (
        <AnimatedPage>
        <div className="header-container">
            <div className="header-breadcrumbs">
               {/* {breadcrumbs.map(({match, breadcrumb}, index) => 
                   <div key={match.pathname}>
                   <Link 
                   className="link" 
                   href={match.pathname === '/levels' ? '/' : match.pathname}>
                        {breadcrumb === "Home" ? <BiHomeAlt2 /> : breadcrumb}
                    </Link>
                    {index !== breadcrumbs.length - 1 ? '/' : ''}
                    </div>
               )}  */}
               {/* @ts-ignore */}
               <Breadcrumbs/>
            </div>

            <div className="header-level">
                {/* <p>{location.pathname.includes('levels/1')
                    ? 'Învăţăcel'
                    : location.pathname.includes('levels/2')
                    ? 'Cunoscător'
                    : 'Expert'
                }</p> */}
                <Dropdown>
                    <Dropdown.Button light
                        css={{fontFamily: "DM Sans", fontSize: '20px'}}
                    >
                        {location.pathname.includes('levels/1')
                            ? 'Învăţăcel'
                            : location.pathname.includes('levels/2')
                            ? 'Cunoscător'
                            : 'Expert'
                        }
                    </Dropdown.Button>
                    <Dropdown.Menu
                        disabledKeys={
                            [location.pathname.includes('levels/1') ? "level1"
                            : location.pathname.includes('levels/2') ? "level2"
                            : "level3"]
                        }
                        css={{fontFamily: "DM Sans"}}
                    >
                        <Dropdown.Item key="level1">
                            <div className="dropdown-link" onClick={() => navigate('/levels/1')}>Învăţăcel</div></Dropdown.Item>
                        <Dropdown.Item key="level2">
                            <div className="dropdown-link" onClick={() => navigate('/levels/2')}>Cunoscător</div></Dropdown.Item>
                        <Dropdown.Item key="level3">
                            <div className="dropdown-link" onClick={() => navigate('/levels/3')}>Expert</div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="header-progress">
                <Progress value=
                {progress.value.level1.percentage()} color="gradient" />
            </div>
        </div>
        </AnimatedPage>
    );    
}

export default Header;