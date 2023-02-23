import styled from 'styled-components';
import { useRef, useState } from "react";

const DragAndDropContainer = styled.div`
    background-color: #F4F7FD;
    padding: 10px;
    border-radius: 10px;
    width: 400px;
    height: 300px;
    border: 2px dashed grey;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const DragAndDropText = styled.p`
    font-size: 1.5em;
    margin-block: 10px;
`;

const DragAndDropButton = styled.button`
    cursor: pointer;
    padding: 15px 30px;
    background-color: #4D5EFB;
    color: white;
    border-radius: 10px;
    border: none;
`

function DragAndDrop() {

    const refDragAndDrop = useRef();
    const [changeMessage, setChangeMessage] = useState(false);

    function dropHandler(ev) {
        ev.preventDefault();
        if( ev.dataTransfer.items ) {
            for (let i = 0; i < ev.dataTransfer.items.length; i++) {
                let item = ev.dataTransfer.items[i];
                if( item?.kind === 'file' ) {
                    processImages(item.getAsFile());
                }
            } 
        } else {
            for (let i = 0; i < ev.dataTransfer.files.length; i++) { 
                let file = ev.dataTransfer.files[i]; 
                processImages(file.getAsFile());
            } 
        }
        removeDragData(ev);
    }

    function dragOverHandler(ev) {
        ev.preventDefault();
        setChangeMessage(true);
    }

    function removeDragData(ev) {
        setChangeMessage(false);
        if (ev.dataTransfer.items) {
            ev.dataTransfer.items.clear();
        } else {
            ev.dataTransfer.clearData();
        }
    }

    function randomId(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
          counter += 1;
        }
        return result;
    }

    function processImages(file) {
        const docType = file.type;
        const acceptedImages = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
        if( acceptedImages.includes(docType) ) {
            const fileReader = new FileReader();
            const id = randomId(5);
            fileReader.readAsDataURL(file);
            console.log(fileReader);
        }
    }

    return (
        <DragAndDropContainer 
            ref={ refDragAndDrop } 
            onDrop={ dropHandler } 
            onDragOver={ dragOverHandler } 
            onDragLeave={ () => setChangeMessage(false) }>
            <DragAndDropText>{ changeMessage ? 'Suelta la imágen' : 'Arrastra y suelta la imágen'}</DragAndDropText>
            <DragAndDropText>ó</DragAndDropText>
            <DragAndDropButton>Selecciona tus archivos</DragAndDropButton>
        </DragAndDropContainer>
    )
}

export default DragAndDrop;