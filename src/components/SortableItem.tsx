import '../pages/exercises/matematica/aritmetica/Ordine.scss';
import {useSortable} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@nextui-org/react';

type SortableItemProps = {
    id: number
};

export function SortableItem(props: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        // <Card ref={setNodeRef} style={{...style, margin: '10px'}} {...attributes} {...listeners}
        //     css={{width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        // >
        //     <Card.Body css={{textAlign: 'center'}}>
        //     {props.id}
        //     </Card.Body>
        // </Card>
        <div ref={setNodeRef} style={{...style, margin: '10px'}} {...attributes} {...listeners}
            className="sortable-item"
        >
            {props.id}
        </div>
    );
}