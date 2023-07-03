import { Card, Button } from '@nextui-org/react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/all';
import AnimatedPage from './AnimatedPage';
import './FunFactCard.scss';
import facts from '../assets/json/stiati_ca.json';
import {useEffect, useState} from 'react';

const arrayRange = (start: number, stop: number, step: number) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
);

interface CardGeneratorProps {
    index: number,
    message: string
}

    function CardGenerator({index, message}: CardGeneratorProps) {
        return (
                <Card>
                    <Card.Header css={{ fontFamily: 'DM Sans', fontWeight: 'bold' }}>
                        Ştiaţi Că ( {index} / {100} )
                    </Card.Header>
                    <Card.Body css={{ fontFamily: 'DM Sans' }}>
                        {/* {facts.stiati_ca[factOrder[currentIndex]].string} */}
                        {message}
                    </Card.Body>
                </Card>
        );
    }

export function FunFactCard() {
    const [factOrder, setFactOrder] = useState(arrayRange(0, facts.stiati_ca.length - 1, 1));
    const [currentFact, setCurrentFact] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        setFactOrder(factOrder
                        .map(value => ({ value, sort: Math.random()}))
                        .sort((a,b) => a.sort - b.sort)
                        .map(({value}) => value));
        setCurrentFact(factOrder[0]);
        setCurrentIndex(0);
    }, []) ;

    const previousFact = () => {
        if (currentIndex === 0) return;
        setCurrentIndex(currentIndex - 1);
    }

    const nextFact = () => {
        if (currentIndex === facts.stiati_ca.length - 1) return;
        setCurrentIndex(currentIndex + 1);
    }


    return (
        <div className="factsbg-card">
            <div style={{ marginRight: "15px" }}>
                <Button light 
                disabled={currentIndex === 0}
                auto size='xs'
                    onPress={previousFact} 
                >
                    <SlArrowLeft />
                </Button>
            </div>
            { currentIndex % 2 == 0 &&
            (<AnimatedPage>
                <CardGenerator index={currentIndex+1} 
                message={facts.stiati_ca[factOrder[currentIndex]].string}/>
            </AnimatedPage>)}
            { currentIndex % 2 == 1 && 
            (<AnimatedPage>
                <CardGenerator index={currentIndex+1} 
                message={facts.stiati_ca[factOrder[currentIndex]].string}/>
            </AnimatedPage>)}

            <div style={{ marginLeft: "15px" }}>
                <Button light auto size='xs'
                    disabled={currentIndex === facts.stiati_ca.length - 1}
                    onPress={nextFact}
                >
                    <SlArrowRight />
                </Button>
            </div>
        </div>
    );
}


