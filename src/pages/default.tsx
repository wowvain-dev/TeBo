import { Button, Text } from '@nextui-org/react';
import './default.scss';
import { GiSchoolBag } from 'react-icons/all';
import { Book1, ShoppingBag, Medal } from 'iconsax-react';
import AnimatedPage from '../components/AnimatedPage';
import { useNavigate } from 'react-router-dom';

function DefaultPage() {
    const navigate = useNavigate();

    return (
        <AnimatedPage>
            <div className="grid-holder default">
            <div className="background-card">
                <div className="difficulty-header">
                    <Text h2 css={{ textAlign: 'center', fontFamily: "DM Sans" }}>
                        Alege de mai jos nivelul de dificultate
                    </Text>
                </div>
                <div className="difficulty-picker">
                    <Button
                        auto
                        color="success"
                        shadow
                        css={{
                            width: "175px", height: "175px", flexDirection: "column",
                            fontFamily: "DM Sans", fontSize: "$2xl", padding: "$10"
                        }}
                        className="difficulty-button"
                        icon={<ShoppingBag size="50" />}
                        onPress={() => {
                            navigate("/levels/1");
                            console.log("clicked");
                        }}
                    >
                        Începător
                    </Button>
                    <Button
                        auto
                        shadow
                        css={{
                            width: "175px", height: "175px", flexDirection: "column",
                            fontFamily: "DM Sans", fontSize: "$2xl", padding: "$10"
                        }}
                        className="difficulty-button"
                        icon={<Book1 size="50" />}
                        onPress={() => {
                            navigate("/levels/2");
                            console.log("clicked");
                        }}
                        >
                        Cunoscător
                    </Button>
                    <Button
                        auto
                        color="secondary"
                        shadow
                        css={{
                            width: "175px", height: "175px", flexDirection: "column",
                            fontFamily: "DM Sans", fontSize: "$2xl", padding: "$10"
                        }}
                        className="difficulty-button"
                        icon={<Medal size="50" />}
                        onPress={() => {
                            navigate("/levels/3");
                            console.log("clicked");
                        }}
                        >
                        Expert
                    </Button>
                </div>
            </div>
            </div>
        </AnimatedPage>
    );
}

export default DefaultPage;