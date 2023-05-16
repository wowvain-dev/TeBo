import './SettingsPanels.sass';
import {Avatar, Badge, Container, Image, rem} from "@mantine/core";
import body_full_blue from '@/assets/LLAMA-cool-blue.png';
import {VERSION_NUMBER} from "@/main";
import {Link} from "react-router-dom";
import {List} from "@mantine/core";
import react_icon from '@/assets/icons/icons8-react-30.png';
import {BsGithub, DiReact, FaReact, IoLogoElectron, SiAntdesign, SiElectron} from "react-icons/all";
import {Spacer, Button} from "@nextui-org/react";
import {
    IconBrandDiscord, IconBrandDiscordFilled,
    IconBrandGithub,
    IconBrandNextjs,
    IconBrandReact,
    IconBrandSass,
    IconBrandTypescript,
    IconBrandVite
} from "@tabler/icons-react";
import {useSettingsContext} from "@/services/context";

interface TechBadgeProps {
    label: string,
    avatar: JSX.Element,
    radiusBottomLeft?: string,
    radiusBottomRight?: string,
    radiusTopLeft?: string,
    radiusTopRight?: string,
    right: boolean,
    left: boolean,
    href: string
}

const TechBadge = ({
                       label,
                       avatar,
                       radiusBottomLeft,
                       radiusBottomRight,
                       radiusTopLeft,
                       radiusTopRight,
                       right, left, href
                   }: TechBadgeProps) => {
    return <a className="shield-badge" style={{
        borderBottomLeftRadius: radiusBottomLeft ?? "0",
        borderBottomRightRadius: radiusBottomRight ?? "0",
        borderTopLeftRadius: radiusTopLeft ?? "0",
        borderTopRightRadius: radiusTopRight ?? "0",
        borderRight: right ? "1px solid black" : "none",
        borderLeft: left ? "1px solid black" : "none",
    }}
              href={href} target="_blank"
    >
        {avatar}
        <span className="shield-badge-label">{label}</span>
    </a>
}


export const AboutSettings = () => {
    const settings = useSettingsContext();
    return (
        <div className="settings-about">
            <div className="top-row">
                <div className="header">
                    <Image src={settings.value.settings.avatar.getBody()} width={120} height={180} withPlaceholder
                    />
                    <span className="title">LiMa {VERSION_NUMBER}</span>
                    <span className="authors">by <Link target="_blank"
                                                       to={"https://github.com/wowvain-dev"}>wowvain-dev</Link> & <Link
                        target="_blank" to="https://www.behance.net/ismokepie">ismokepie</Link></span>
                </div>
            </div>
            <div className="settings-about-content">
                <span className="subtitle">Tech Stack:</span>
                <div className="tech-stack">
                    <TechBadge href="https://react.dev"
                               avatar={<IconBrandReact color="#61dafb"/>} label={"React"}
                               radiusBottomLeft="14px" radiusTopLeft="14px" right={true} left={true}
                    />
                    <TechBadge href="https://www.electronjs.org/"
                               avatar={<SiElectron size={24} color="#9feaf9"/>} label={"Electron"}
                               right={true} left={false}
                    />
                    <TechBadge href="https://www.typescriptlang.org/"
                               avatar={<IconBrandTypescript color="#007acc"/>} label={"Typescript"}
                               right={true} left={false}
                    />
                    <TechBadge href="https://sass-lang.com/"
                               avatar={<IconBrandSass color="#cc6699"/>} label={"Sass"}
                               right={true} left={false}
                    />
                    <TechBadge href="https://vitejs.dev/"
                               avatar={<IconBrandVite color="#ffd62e"/>} label={"Vite"}
                               radiusBottomRight="14px" radiusTopRight="14px"
                               right={true} left={false}
                    />
                </div>
                <Spacer y={1}/>
                <span className="subtitle">Design Stack:</span>
                <div className="design-stack">
                    <TechBadge href="https://ant.design"
                               avatar={<SiAntdesign color="#1890ff"/>} label={"Ant Design"}
                               radiusBottomLeft="14px" radiusTopLeft="14px" right={true}
                               left={true}
                    />
                    <TechBadge href="https://nextui.org"
                               avatar={<IconBrandNextjs color="#000000"/>} label={"Next UI"}
                               radiusBottomRight="14px" radiusTopRight="14px"
                               right={true} left={false}
                    />

                </div>
                <Spacer y={2}/>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <span>Pentru a vedea codul sursă intrați pe repository-ul proiectului:</span>
                    <Spacer x={1}/>
                    <TechBadge href="https://github.com/wowvain-dev/lima-electron"
                               avatar={<IconBrandGithub color="#000"/>} label={"GitHub"}
                               right={true} left={true}
                               radiusBottomRight="14px" radiusBottomLeft="14px"
                               radiusTopRight="14px" radiusTopLeft="14px"
                    />
                </div>
                <Spacer y={2}/>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <span>Pentru contact, vă rog să îmi dați mesaj pe discord: </span>
                    <Spacer x={1}/>
                    <TechBadge href="https://github.com/wowvain-dev/lima-electron"
                               avatar={<IconBrandDiscord color="#5865f2"/>} label={"!wowvain#3859"}
                               right={true} left={true}
                               radiusBottomRight="14px" radiusBottomLeft="14px"
                               radiusTopRight="14px" radiusTopLeft="14px"
                    />
                </div>
            </div>
        </div>
    );
};
