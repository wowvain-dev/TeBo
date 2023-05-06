import './SettingsPanels.sass';
import {Avatar, Badge, Container, Image, rem} from "@mantine/core";
import body_full_blue from '@/assets/LLAMA-cool-blue.png';
import {VERSION_NUMBER} from "@/main";
import {Link} from "react-router-dom";
import {List} from "@mantine/core";
import react_icon from '@/assets/icons/icons8-react-30.png';
import {BsGithub, DiReact, FaReact} from "react-icons/all";
import {Spacer, Button} from "@nextui-org/react";
import {IconBrandGithub} from "@tabler/icons-react";

interface TechBadgeProps {
    label: string,
    avatar: JSX.Element
}

export const AboutSettings = () => {
    return (
        <div className="settings-about">
            <div className="top-row">
                <div className="header">
                    <Image src={body_full_blue} width={120} height={180} withPlaceholder
                    />
                    <span className="title">LiMa {VERSION_NUMBER}</span>
                    <span className="authors">by <Link target="_blank"
                                                       to={"https://github.com/wowvain-dev"}>wowvain-dev</Link> & ismokepie</span>
                    {/*<span className="version">{VERSION_NUMBER}</span>*/}
                </div>
            </div>
            <div className="settings-about-content">
                <span className="subtitle">Construită în:</span>
                <div className="tech-stack">
                    <img alt="react"
                         style={{borderBottomLeftRadius: 14, borderTopLeftRadius: 14}}
                        // src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
                         src="https://img.shields.io/badge/React-000000?style=for-the-badge&logo=react&logoColor=61DAFB"/>
                    {/*<Spacer x={1}/>*/}
                    <img alt="electron"
                        // src="https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9"/>
                         src="https://img.shields.io/badge/Electron-000000?style=for-the-badge&logo=electron&logoColor=9FEAF9"/>
                    {/*<Spacer x={1}/>*/}
                    <img alt="typescript"
                        // src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
                         src="https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=007ACC"/>
                    {/*<Spacer x={1}/>*/}
                    <img alt="sass"
                        // src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/>
                         src="https://img.shields.io/badge/Sass-000000?style=for-the-badge&logo=sass&logoColor=CC6699"/>
                    {/*<Spacer x={1}/>*/}
                    <img alt="vite"
                         style={{borderBottomRightRadius: 14, borderTopRightRadius: 14}}
                        // src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E"/>
                         src="https://img.shields.io/badge/Vite-000000?style=for-the-badge&logo=vite&logoColor=FFD62E"/>
                </div>
                <Spacer y={1}/>
                <span className="subtitle">folosind librăriile de design:</span>
                <div className="design-stack">
                    <img alt="antd"
                         style={{borderBottomLeftRadius: 14, borderTopLeftRadius: 14}}
                        // src="https://img.shields.io/badge/Ant%20Design-1890FF?style=for-the-badge&logo=antdesign&logoColor=white"/>
                         src="https://img.shields.io/badge/Ant%20Design-000000?style=for-the-badge&logo=antdesign&logoColor=1890FF"/>
                    {/*<Spacer x={1}/>*/}
                    <img alt="nextui"
                         style={{borderBottomRightRadius: 14, borderTopRightRadius: 14}}
                        // src="https://img.shields.io/badge/next%20ui-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
                         src="https://img.shields.io/badge/next%20ui-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
                </div>
                <Spacer y={2}/>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <span>Pentru a vedea codul sursă intrați pe repository-ul proiectului:</span>
                    <Spacer x={1}/>
                    <a href="https://github.com/wowvain-dev/lima-electron" target="_blank">
                        <img alt="GitHub"
                             style={{borderRadius: 14}}
                             src="https://img.shields.io/badge/github-000000?style=for-the-badge&logo=github&logoColor=white"/>
                    </a>
                </div>
                <Spacer y={2}/>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <span>Pentru contact, vă rog să îmi dați mesaj pe discord: </span>
                    <Spacer x={1}/>
                    <img alt="!wowvain#3859"
                         style={{borderRadius: 14}}
                         src="https://img.shields.io/badge/!wowvain_%233859-000000?style=for-the-badge&logo=discord&logoColor=5865F2"/>
                </div>
            </div>
        </div>
    );
};
