import './SettingsPanels.sass';
import {Button, Avatar, Badge, Container, Image, rem} from "@mantine/core";
import body_full_blue from '@/assets/LLAMA-cool-blue.png';
import {VERSION_NUMBER} from "@/main";
import {Link} from "react-router-dom";
import {List} from "@mantine/core";
import react_icon from '@/assets/icons/icons8-react-30.png';
import {BsGithub, DiReact, FaReact} from "react-icons/all";
import {Spacer} from "@nextui-org/react";
import {IconBrandGithub} from "@tabler/icons-react";

interface TechBadgeProps {
    label: string,
    avatar: JSX.Element
}

const TechBadge = ({label, avatar}: TechBadgeProps) => {
    return <Badge pl={0} size="lg" radius="xl" leftSection={avatar}>
        <span style={{fontFamily: "DM Sans", fontWeight: '600', letterSpacing: '.7px'}}>{label}</span>
    </Badge>
}

export const AboutSettings = () => {
    return (
        <div className="settings-about">
            <div className="top-row">
                <div className="header">
                    <Image src={body_full_blue} width={120} height={180} withPlaceholder
                    />
                    <span className="title">LiMa {VERSION_NUMBER}</span>
                    <span className="authors">by <Link target="_blank" to={"https://github.com/wowvain-dev"}>wowvain-dev</Link> & ismokepie</span>
                    {/*<span className="version">{VERSION_NUMBER}</span>*/}
                </div>
            </div>
            <div className="settings-about-content">
                <span className="subtitle">Construită în:</span>
                <div className="tech-stack">
                    <img alt="react" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
                    <img alt="electron" src="https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9"/>
                    <img alt="typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
                    <img alt="sass" src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/>
                    <img alt="vite" src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E"/>
                </div>
                <Spacer y={1}/>
                <span className="subtitle">folosind librăriile de design:</span>
                <div className="design-stack">
                    <img alt="antd" src="https://img.shields.io/badge/Ant%20Design-1890FF?style=for-the-badge&logo=antdesign&logoColor=white"/>
                    <img alt="nextui" src="https://img.shields.io/badge/next%20ui-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
                </div>
                <Spacer y={2} />
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <span>Pentru contact, vă rog să îmi dați mesaj pe discord: </span>
                    <Spacer x={1}/>
                    <img alt="!wowvain#3859" src="https://img.shields.io/badge/!wowvain_%233859-5865F2?style=for-the-badge&logo=discord&logoColor=white"/>
                </div>
                <Spacer y={2} />
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <span>Pentru a vedea codul sursă intrați pe repository-ul proiectului:</span>
                    <Spacer x={1}/>
                    <Button component="a" target="_blank" href="https://github.com/wowvain-dev/lima-electron"
                        styles={
                            (theme) => ({
                                root: {
                                    borderRadius: rem(0),
                                    background: "black",
                                    paddingLeft: rem(10),
                                    paddingRight: rem(10),
                                    paddingTop: rem(7),
                                    paddingBottom: rem(7),
                                    '&:not([data-disabled])': theme.fn.hover({
                                        backgroundColor: theme.fn.lighten('#000', 0.15),
                                    }),
                                }
                            })
                        }
                    >
                        <IconBrandGithub size={rem(20)}/>
                    </Button>
                </div>
            </div>
        </div>
    );
};
