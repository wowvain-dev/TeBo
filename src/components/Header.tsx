import './Header.scss';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {Progress, Text, Button, Dropdown} from '@nextui-org/react';
import {BiHomeAlt2} from 'react-icons/bi';
import {useLocation, useNavigate, Link} from 'react-router-dom';
import {ReactElement} from 'react';
import AnimatedPage from '@/components/AnimatedPage';
import {Book1, Medal, ShoppingBag} from 'iconsax-react';
import {useProgressContext, useSettingsContext} from '@/services/context';
import {HomeOutlined} from '@ant-design/icons';
import {RxSlash} from 'react-icons/rx';
import {Breadcrumb, Image} from 'antd';
import type {ItemType} from 'antd/es/breadcrumb/Breadcrumb';
import type {BreadcrumbItemProps} from 'antd/es/breadcrumb';
import logo from '../assets/HEAD-LLAMA-cool-blue.png';
import {Avatar} from "@/services/SettingsManager";

export type CrumbPath = {
    name: string,
    icon?: JSX.Element | undefined,
    progress?: { current: number, total: number } | null
};


let PathNames: Map<string, CrumbPath> = new Map<string, CrumbPath>([
    // ["/levels/1", {name: "Învăţăcel", icon: <ShoppingBag size={15} style={{marginRight: "5px"}}/>}],
    ["/", {name: "Meniu"}],
    ["/aritmetica", {name: "Aritmetică"}],
    ["/geometrie", {name: "Geometrie"}],
    ["/romana", {name: "Română"}],
    ["/aritmetica/operatii", {name: "Operaţii"}],
    ["/aritmetica/fractii", {name: "Fracţii"}],
    ["/aritmetica/formare", {name: "Formarea Numerelor"}],
    ["/aritmetica/ordine", {name: "Ordine de Şiruri"}],
    ["/aritmetica/comparatii", {name: "Comparaţii de Expresii"}],
    ["/romana/vocale", {name: "Vocale şi Consoane"}],
    ["/romana/litere", {name: "Recunoaştere Litere"}],
    ["/geometrie/culori", {name: "Recunoaştere Culori"}],
    ["/geometrie/regula_sirului", {name: "Regula Şirului"}],
    ["/geometrie/comparare", {name: "Comparare de Forme"}],
    ["/geometrie/desenare_figuri", {name: "Tablă"}],
]);

function Header() {
    const breadcrumbs = useBreadcrumbs();
    const location = useLocation();
    const navigate = useNavigate();
    const progress = useProgressContext();

    PathNames.get('/')!.progress = {
        current: progress.value.level1.current(),
        total: progress.value.level1.total()
    }
    PathNames.get('/aritmetica')!.progress = {
        current: progress.value.level1.matematica.parts.get('aritmetica')?.current() ?? 0,
        total: progress.value.level1.matematica.parts.get('aritmetica')?.total() ?? 0,
    };
    PathNames.get('/romana')!.progress = {
        current: progress.value.level1.comunicare.parts.get('romana')?.current() ?? 0,
        total: progress.value.level1.comunicare.parts.get('romana')?.total() ?? 0,
    };
    PathNames.get('/geometrie')!.progress = {
        current: progress.value.level1.matematica.parts.get('geometrie')?.current() ?? 0,
        total: progress.value.level1.matematica.parts.get('geometrie')?.total() ?? 0,
    };
    PathNames.get('/geometrie/culori')!.progress = {
        current: progress.value.level1.matematica.parts.get('geometrie')?.parts.get('culori')?.current ?? 0,
        total: progress.value.level1.matematica.parts.get('geometrie')?.parts.get('culori')?.total ?? 0,
    };
    PathNames.get('/geometrie/regula_sirului')!.progress = {
        current: progress.value.level1.matematica.parts.get('geometrie')?.parts.get('regula_sirului')?.current ?? 0,
        total: progress.value.level1.matematica.parts.get('geometrie')?.parts.get('regula_sirului')?.total ?? 0,
    };
    PathNames.get('/geometrie/comparare')!.progress = {
        current: progress.value.level1.matematica.parts.get('geometrie')?.parts.get('comparare')?.current ?? 0,
        total: progress.value.level1.matematica.parts.get('geometrie')?.parts.get('comparare')?.total ?? 0,
    };
    PathNames.get('/aritmetica/operatii')!.progress = {
        current: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('operatii')?.current ?? 0,
        total: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('operatii')?.total ?? 0,
    };
    PathNames.get('/aritmetica/ordine')!.progress = {
        current: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('ordine')?.current ?? 0,
        total: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('ordine')?.total ?? 0,
    };
    PathNames.get('/aritmetica/fractii')!.progress = {
        current: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('fractii')?.current ?? 0,
        total: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('fractii')?.total ?? 0,
    };
    PathNames.get('/aritmetica/formare')!.progress = {
        current: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('formare')?.current ?? 0,
        total: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('formare')?.total ?? 0,
    };
    PathNames.get('/aritmetica/comparatii')!.progress = {
        current: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('comparatii')?.current ?? 0,
        total: progress.value.level1.matematica.parts.get('aritmetica')?.parts.get('comparatii')?.total ?? 0,
    }
    PathNames.get('/romana/litere')!.progress = {
        current: progress.value.level1.comunicare.parts.get('romana')?.parts.get('litere')?.current ?? 0,
        total: progress.value.level1.comunicare.parts.get('romana')?.parts.get('litere')?.total ?? 0,
    }
    PathNames.get('/romana/vocale')!.progress = {
        current: progress.value.level1.comunicare.parts.get('romana')?.parts.get('vocale')?.current ?? 0,
        total: progress.value.level1.comunicare.parts.get('romana')?.parts.get('vocale')?.total ?? 0,
    }

    const Breadcrumbs = () => {
        let crumbs: Array<ItemType> = new Array<ItemType>;
        for (let i = 0; i < breadcrumbs.length; i++) {
            if (breadcrumbs[i].match.pathname === '/') {
                crumbs.push({
                    title: <Link to='/'><HomeOutlined/></Link>,
                    href: undefined,
                });
                continue;
            } else {
                var currentPath = breadcrumbs[i].match.pathname;
                var countSlashes = (currentPath.match(/\//g) || []).length;
                var matchyPath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
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
                        // menu: {
                        //     items: menuItems
                        // }
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

        return (
            <Breadcrumb items={crumbs}
                        style={{
                            marginTop: 'auto', marginBottom: 'auto',
                            maxWidth: "100%", whiteSpace: "nowrap",
                        }}
            />);
    };

    const settings = useSettingsContext();
    const avatar: Avatar = settings.value.settings.avatar;

    return (
        // <AnimatedPage>
        <div className="header-container">
            <div className="header-breadcrumbs">
                <Breadcrumbs/>
            </div>

            <div className="header-level">
                <div style={{
                    fontFamily: 'DM Sans', fontSize: '30px', display: 'flex',
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <Image
                        preview={false}
                        src={
                            avatar.getHead()
                        } height={50} width={50}/>
                    {/*LiMa*/}
                </div>
            </div>

            <div className="header-progress">
                <Progress value=
                              {(PathNames.get(location.pathname)?.progress?.current ?? 0) * 100 / (PathNames.get(location.pathname)?.progress?.total ?? 1)}
                          color={
                              (PathNames.get(location.pathname)?.progress?.current ?? 0) === (PathNames.get(location.pathname)?.progress?.total ?? 0) ? "success" : "gradient"
                          }/>
            </div>
        </div>
        // </AnimatedPage>
    );
}

export default Header;