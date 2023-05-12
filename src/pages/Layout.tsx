import './Layout.scss';
import {Outlet} from 'react-router-dom';
import Header from "../components/Header";
import {Modal} from "@nextui-org/react";
import {ArrowRight, Candle2, MessageQuestion, ArrowLeft, Setting} from "iconsax-react";
// @ts-ignore
import {motion} from 'framer-motion';
import {Divider, Menu, MenuProps, Tour, TourProps, Button, Modal as AModal} from "antd";
import {useState, useRef, ReactNode, Key, SetStateAction, Dispatch, useEffect} from "react";
import {
    BiMath, BsBook, GoListOrdered, HiOutlineInformationCircle,
    HiOutlineSpeakerWave, IoIosInformationCircleOutline,
    SiLevelsdotfyi, SlWrench, TbCircuitChangeover, TbGeometry, TbMathEqualLower,
    TbMathXDivideY,
    TbMathXPlusX,
    TbMathXPlusY
} from "react-icons/all";
import stick_llama from '@/assets/stick-LLAMA-nerd-purple.png';
import {VERSION_NUMBER} from "@/main";
import {OperatiiSettings} from "@/pages/settings/OperatiiSettings";
import {ComparareSettings} from "@/pages/settings/ComparareSettings";
import {FractiiSettings} from "@/pages/settings/FractiiSettings";
import {FormareSettings} from "@/pages/settings/FormareSettings";
import {OrdineSettings} from "@/pages/settings/OrdineSettings";
import {CuloriSettings} from "@/pages/settings/CuloriSettings";
import {FormeSettings} from "@/pages/settings/FormeSettings";
import {CompFiguriSettings} from "@/pages/settings/CompFiguriSettings";
import {VocaleSettings} from "@/pages/settings/VocaleSettings";
import {LitereSettings} from "@/pages/settings/LitereSettings";
import {AboutSettings} from "@/pages/settings/AboutSettings";
import {NotFoundSettings} from "@/pages/settings/NotFoundSettings";
import {PreferencesSettings} from "@/pages/settings/PreferencesSettings";
import {useDifficultyContext, useProgressContext, useSettingsContext} from "@/services/context";
import {DifficultyManager} from "@/services/DifficultyManager";
import {ProgressManager} from "@/services/ProgressManager";
import {SettingsManager} from "@/services/SettingsManager";

export function PageLayout() {
    const [showTour, setShowTour] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    let headerRef = useRef(null);
    let mainContentRef = useRef(null);
    let settingsRef = useRef(null);

    const settings = useSettingsContext();

    const tourSteps: TourProps['steps'] = [
        {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Header-ul Aplicaţiei
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'spaceBetween',
                        alignItems: 'center'
                    }}>
                    </div>
                </div>
            ),
            description: (<div style={{display: 'flex'}}>
                <div>
                    În stânga puteţi găsi o detaliere clară a meniului în care vă aflaţi.
                    În dreapta puteţi observa progresul făcut relativ cu ecranul în care vă aflaţi.
                </div>
                <Divider type={"vertical"} style={{height: '100px'}}/>
                <img style={{scale: '100%', height: '100px', marginRight: '20px', zIndex: '0'}}
                     src={settings.value.settings.avatar.getStick()} alt='Llama ajutatoare'/>
            </div>),
            target: () => headerRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25}/>
            },
        },
        {
            title: (<div style={{display: 'flex', flexDirection: 'column'}}>
                    Meniul de setări al aplicaţiei
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'spaceBetween',
                        alignItems: 'center'
                    }}>
                    </div>
                </div>
            ),
            description: (
                <div style={{display: 'flex'}}>
                    <div>
                        De aici puteți accesa setările pentru configurarea dificultății și a aspectului aplicației.
                    </div>
                    <Divider type={"vertical"} style={{height: '100px'}}/>
                    <img style={{scale: '100%', height: '100px', marginRight: '20px', zIndex: '0'}}
                         src={settings.value.settings.avatar.getStick()} alt='Llama ajutatoare'/>
                </div>
            ),
            target: () => settingsRef.current,
            nextButtonProps: {
                children: <ArrowRight size={25}/>
            },
            prevButtonProps: {
                children: <ArrowLeft size={25}/>
            }
        },
    ];

    interface SettingsModalProps {
        visible: boolean,
        setVisible: Dispatch<SetStateAction<boolean>>
    }

    const SettingsModal = ({visible, setVisible}: SettingsModalProps) => {

        type MenuItem = Required<MenuProps>['items'][number];

        function getItem(
            label: ReactNode,
            key: Key,
            icon?: ReactNode,
            children?: MenuItem[],
            type?: 'group',
            danger: boolean = false,
            disabled: boolean = false
        ): MenuItem {
            return {key, icon, children, label, type, danger, disabled} as MenuItem;
        }

        const items: MenuProps['items'] = [
            getItem('Despre', 'about', <IoIosInformationCircleOutline size={20}/>),
            getItem('Preferinţe', 'preferences', <SlWrench size={20}/>, undefined, undefined, false, false),
            {type: 'divider'},
            getItem('Dificultate', 'sub1', <TbCircuitChangeover size={20}/>, [
                getItem('Aritmetică', 'aritmetica', <BiMath size={20}/>, [
                    getItem('Operaţii', 'operatii', null),
                    getItem('Fracţii', 'fractii', null),
                    getItem('Ordini de Şiruri', 'ordine', null),
                    getItem('Comparaţii', 'comparatii', null),
                    getItem('Formarea Numerelor', 'formare', null),
                ]),
                getItem('Geometrie', 'geometrie', <TbGeometry size={20}/>, [
                    getItem('Recunoasterea Culorilor', 'culori', null),
                    getItem('Sir de Forme', 'forme', null),
                    getItem('Comparare de Figuri', 'comparare_figuri', null),
                ]),
                getItem('Limbă şi Comunicare', 'comunicare', <BsBook size={20}/>, [
                    getItem('Vocale şi Consoane', 'vocale', null),
                    getItem('Recunoaşterea Literelor', 'litere', null),
                    // getItem('Vocale şi Consoane', 'vocale', null),
                ])
            ]),
        ]


        const [selectedKey, selectKey] = useState<string | null>(null);

        useEffect(() => {
            selectKey('about')
        }, []);

        const onClick: MenuProps['onClick'] = (e) => {
            selectKey(e.key);
        }

        const SettingsContent = () => {
            switch (selectedKey) {
                case "about":
                    return <AboutSettings/>
                case "operatii":
                    return <OperatiiSettings/>
                case "fractii":
                    return <FractiiSettings/>
                case "formare":
                    return <FormareSettings/>
                case "comparatii":
                    return <ComparareSettings/>
                case "ordine":
                    return <OrdineSettings/>
                case "preferences":
                    return <PreferencesSettings/>
                default:
                    return <NotFoundSettings/>
            }

            return <div></div>

        }

        const [totalModal, setTotalModal]
            = useState<boolean>(false);
        const [progressModal, setProgressModal]
            = useState<boolean>(false);
        const [preferencesModal, setPreferencesModal]
            = useState<boolean>(false);

        const difficulty = useDifficultyContext();
        const progress = useProgressContext();
        const preferences = useSettingsContext();

        useEffect(() => {
            setTotalModal(false);
            setProgressModal(false);
            setPreferencesModal(false);
        }, []);

        const totalReset = () => {
            difficulty.value.stergere();
            progress.value.stergere();
            preferences.value.stergere();
            difficulty.setValue(new DifficultyManager());
            progress.setValue(new ProgressManager());
            preferences.setValue(new SettingsManager());
        }

        const progressReset = () => {
            progress.value.stergere();
            progress.setValue(new ProgressManager());
        }

        const preferencesReset = () => {
            settings.value.stergere();
            settings.setValue(new SettingsManager());
        }

        return <div className="settings-modal"><Modal
            className="settings-modal"
            // preventClose
            closeButton
            blur
            aria-labelledby="modal-title"
            open={visible}
            onClose={() => setVisible(false)}
            style={{height: '85vh'}}
        >
            <AModal
                style={{zIndex: '99999'}}
                centered
                title={<span style={{fontFamily: 'DM Sans', fontSize: '1.2rem'}}>Resetare Totală</span>}
                open={totalModal} onCancel={() => setTotalModal(false)}
                onOk={() => totalReset()}
                okText={<span style={{fontFamily: "DM Sans"}}>DA</span>}
                cancelText={<span style={{fontFamily: "DM Sans"}}>Anulează</span>}
                cancelButtonProps={{}}
                okButtonProps={{
                    danger: true,
                }}
            >
                <span style={{
                    fontFamily: 'DM Sans',
                    fontSize: '1.1rem'
                }}>
                Ești sigur că vrei sa resetezi tot? Asta include:
                </span>
                <ul style={{fontFamily: 'DM Sans'}}>
                    <li>&bull; progresul</li>
                    <li>&bull; preferințele</li>
                    <li>&bull; dificultățile</li>
                </ul>
            </AModal>
            <AModal
                style={{zIndex: '99999'}}
                centered
                title={<span style={{fontFamily: 'DM Sans', fontSize: '1.2rem'}}>Resetare Progres</span>}
                open={progressModal} onCancel={() => setProgressModal(false)}
                onOk={() => progressReset()}
                okText={<span style={{fontFamily: "DM Sans"}}>DA</span>}
                cancelText={<span style={{fontFamily: "DM Sans"}}>Anulează</span>}
                okButtonProps={{danger: true}}
            >
                <span style={{
                    fontFamily: 'DM Sans',
                    fontSize: '1.025rem'
                }}>
                    Ești sigur că vrei sa resetezi progresul?
                </span>
            </AModal>
            <AModal
                style={{zIndex: '99999'}}
                centered
                title={<span style={{fontFamily: 'DM Sans', fontSize: '1.2rem'}}>Resetare Preferințe</span>}
                open={preferencesModal} onCancel={() => setPreferencesModal(false)}
                onOk={() => preferencesReset()}
                okText={<span style={{fontFamily: "DM Sans"}}>DA</span>}
                cancelText={<span style={{fontFamily: "DM Sans"}}>Anulează</span>}
                okButtonProps={{danger: true}}
            >
                <span style={{
                    fontFamily: 'DM Sans',
                    fontSize: '1.025rem'
                }}>
                    Ești sigur că vrei să resetezi preferințele?
                </span>
            </AModal>
            <Modal.Header style={{borderBottom: '1px solid #eee'}}>
                <h1 style={{fontFamily: "DM Sans", fontSize: '2rem', textAlign: 'start'}}>Setări</h1>
            </Modal.Header>
            <Modal.Body css={{p: 0, display: 'flex', flexDirection: 'row'}} style={{paddingLeft: 0}}>
                <div className="side-menu-wrapper">
                    <Menu defaultSelectedKeys={["about"]} onClick={onClick}
                          style={{width: 300, fontFamily: "DM Sans", flex: '1'}} mode="inline" items={items}/>
                </div>
                <div className="settings-content modern-scroll" style={{overflow: 'auto'}}>
                    <SettingsContent/>
                </div>
            </Modal.Body>
            <Modal.Footer style={{borderTop: '1px solid #eee', display: 'flex'}}>
                <Button danger type="primary" onClick={() => setTotalModal(true)}
                        style={{
                            fontFamily: 'DM Sans',
                            marginLeft: '5px', marginRight: '5px'
                        }}>Resetare Totală</Button>
                <Button danger onClick={() => setProgressModal(true)}
                        style={{
                            fontFamily: 'DM Sans',
                            marginLeft: '5px', marginRight: '5px'
                        }}>Resetare Progres</Button>
                <Button danger onClick={() => setPreferencesModal(true)}
                        style={{
                            fontFamily: 'DM Sans',
                            marginLeft: '5px', marginRight: '5px'
                        }}>Resetare Preferințe</Button>
                <div style={{flex: '1'}}/>
                <span style={{fontFamily: 'DM Sans'}}>
                    {VERSION_NUMBER}, developed by <a target="_blank"
                                                      href="https://github.com/wowvain-dev"><i>wowvain-dev</i></a>, designed by ismokepie, &copy; MIT License
                </span>
            </Modal.Footer>
        </Modal></div>
    }

    return (
        <div className="page-layout"
        >
            <SettingsModal visible={showSettings} setVisible={setShowSettings}/>
            <Tour steps={tourSteps} open={showTour} onClose={() => setShowTour(false)}/>
            <div ref={headerRef}>
                <Header/>
            </div>
            <div ref={mainContentRef}>
                <Outlet/>
            </div>
            <motion.div
                whileHover={{
                    scale: 1.1
                }}
                style={{
                    position: 'absolute',
                    left: '15px',
                    bottom: '15px'
                }}>
                {/* SETTINGS BUTTON */}
                <Button ref={settingsRef}
                        onClick={() => setShowSettings(true)}
                        color="primary"
                        style={{
                            width: '40px', height: '40px',
                            padding: 0,
                            display: 'flex', justifyContent: 'center', alignItems: 'center'
                        }}
                >
                    <Candle2 size="25" color="#2a2b2a"/>
                </Button>
            </motion.div>
            <motion.div
                whileHover={{
                    scale: 1.1
                }}
                style={{
                    position: 'absolute',
                    right: '15px',
                    bottom: '15px'
                }}>
                {/* HELP BUTTON */}
                <Button
                    color="primary"
                    onClick={() => setShowTour(true)}
                    style={{
                        width: '40px', height: '40px',
                        padding: 0,
                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                    }}>
                    <MessageQuestion size="25" color="#2a2b2a"/>
                </Button>
            </motion.div>
            {/* <Footer /> */}
        </div>
    );


}

export function OverallLayout() {
    const settings = useSettingsContext();

    return (
        <div className="overall-layout" style={{
            background: `url(${settings.value.settings.background})`,
            // backgroundSize: `100vw 100vh`
        }}>
            <PageLayout/>
        </div>
    );
}
