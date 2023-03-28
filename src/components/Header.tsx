import './Header.scss';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Progress, Text, Button, Dropdown } from '@nextui-org/react';
import { BiHomeAlt2 } from 'react-icons/bi';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ReactElement } from 'react';
import AnimatedPage from '@/components/AnimatedPage';
import { Book1, Medal, ShoppingBag } from 'iconsax-react';
import { useProgressContext } from '../services/context';
import { HomeOutlined } from '@ant-design/icons';
import { RxSlash } from 'react-icons/rx';
import { Breadcrumb } from 'antd';
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import type { BreadcrumbItemProps } from 'antd/es/breadcrumb';

export type CrumbPath = {
    name: string,
    icon?: JSX.Element | undefined,
    progress?: {current: number, total: number} | null
};


let PathNames: Map<string, CrumbPath> = new Map<string, CrumbPath>([
    // ["/levels/1", {name: "Învăţăcel", icon: <ShoppingBag size={15} style={{marginRight: "5px"}}/>}],
    ["/levels/1", { name: "Învăţăcel" }],
    ["/levels/2", { name: "Cunoscător" }],
    ["/levels/3", { name: "Expert" }],
    ["/levels/1/aritmetica", { name: "Aritmetică" }],
    ["/levels/1/geometrie", { name: "Geometrie" }],
    ["/levels/1/romana", { name: "Română" }],
    ["/levels/1/aritmetica/operatii", { name: "Operaţii" }],
    ["/levels/1/aritmetica/fractii", { name: "Fracţii" }],
    ["/levels/1/aritmetica/formare", { name: "Formarea Numerelor" }],
    ["/levels/1/aritmetica/ordine", { name: "Ordine de Şiruri" }],
    ["/levels/1/aritmetica/comparatii", { name: "Comparaţii de Expresii" }],
]);

function Header() {
    const breadcrumbs = useBreadcrumbs();
    const location = useLocation();
    const navigate = useNavigate();
    const progress = useProgressContext();

    PathNames.get('/levels/1')!.progress = {
        current: progress.value.level1.current(),
        total: progress.value.level1.total()
    }
    PathNames.get('/levels/1/aritmetica')!.progress = {
        current: progress.value.level1.matematica.parts.get('aritmetica')?.current() ?? 0,
        total: progress.value.level1.matematica.parts.get('aritmetica')?.total() ?? 0,
    };
    PathNames.get('/levels/1/aritmetica/operatii')!.progress = {
        current: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('operatii')?.current ?? 0,
        total: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('operatii')?.total ?? 0,
    };
    PathNames.get('/levels/1/aritmetica/ordine')!.progress = {
        current: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('siruri')?.current ?? 0,
        total: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('siruri')?.total ?? 0,
    };
    PathNames.get('/levels/1/aritmetica/fractii')!.progress = {
        current: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('fractii')?.current ?? 0,
        total: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('fractii')?.total ?? 0,
    };
    PathNames.get('/levels/1/aritmetica/formare')!.progress = {
        current: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('formare')?.current ?? 0,
        total: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('formare')?.total ?? 0,
    };
    PathNames.get('/levels/1/aritmetica/comparatii')!.progress = {
        current: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('comparatii')?.current ?? 0,
        total: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('comparatii')?.total ?? 0,
    }

    console.log(location.pathname);

    const Breadcrumbs = () => {
        let crumbs: Array<ItemType> = new Array<ItemType>;
        for (let i = 0; i < breadcrumbs.length; i++) {
            if (breadcrumbs[i].match.pathname === '/') {
                crumbs.push({
                    title: <Link to='/'><HomeOutlined /></Link>,
                    href: undefined,

                });
            } else if (breadcrumbs[i].match.pathname === '/levels') { continue; }
            else {
                var currentPath = breadcrumbs[i].match.pathname;
                var countSlashes = (currentPath.match(/\//g) || []).length;
                var matchyPath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
                console.log(`${countSlashes} in ${currentPath}, with a matchy of: ${matchyPath}`);
                var menuItems = new Array;
                PathNames.forEach((val, key) => {
                    if ((key.match(/\//g) || []).length == countSlashes) {
                        menuItems.push({
                            key: `breadcrumb_dropdown_${key}`,
                            label: <Link to={key}>
                                <span>{val.name}</span>
                            </Link>
                        });
                    }
                });
                if (i === breadcrumbs.length - 1) {
                    crumbs.push({
                        title: <div style={{display: 'inline-block'}}>
                            {PathNames.get(breadcrumbs[i].match.pathname)?.icon}
                            <span>{PathNames.get(breadcrumbs[i].match.pathname)?.name}</span>
                        </div>,
                        menu: {
                            items: menuItems
                        }
                    })
                    break;
                }
                crumbs.push(
                    {
                        title: <Link to={breadcrumbs[i].match.pathname}>
                            <div>
                                {PathNames.get(breadcrumbs[i].match.pathname)?.icon}
                                <span>{PathNames.get(breadcrumbs[i].match.pathname)?.name}</span>
                            </div>
                        </Link>,
                        menu: {
                            items: menuItems
                        }
                    }
                );
            }
        }
        console.log(breadcrumbs[breadcrumbs.length - 1].match.params)
        return (
            <Breadcrumb items={crumbs} 
                style={{marginTop: 'auto', marginBottom: 'auto',
                    maxWidth: "100%", whiteSpace: "nowrap",
                }}
            />);
    };


    return (
        // <AnimatedPage>
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
                    <Breadcrumbs />
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
                            css={{ fontFamily: "DM Sans", fontSize: '20px' }}
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
                            css={{ fontFamily: "DM Sans" }}
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
                        {(PathNames.get(location.pathname)?.progress?.current ?? 0) * 100 / (PathNames.get(location.pathname)?.progress?.total ?? 1)} color="gradient" />
                </div>
            </div>
        // </AnimatedPage>
    );
}

export default Header;