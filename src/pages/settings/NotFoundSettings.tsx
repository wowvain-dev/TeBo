import {Warning2} from "iconsax-react";
import {Spacer} from "@nextui-org/react";

export const NotFoundSettings = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            flexDirection: 'column'
        }}>
            <Warning2 size={100} color="#FD7E14"/>
            <Spacer y={2}/>
            <span style={{
                fontFamily: "DM Sans",
                fontSize: '2.1rem',
                color: '#FD7E14'
            }}>Acest exercițiu nu are setări.</span>
        </div>
    );
};