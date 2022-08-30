import "../styles/fileUpload.css"
import TextareaModal from "./TextareaModal";
import {useState} from "react";

export default function ActionButtons({setSectionsData, sectionsData}){
    let [modalIsOpen, setModalIsOpen] = useState(false)

    function insertSectionText(modalText) {
        try {
            let json = JSON.parse(modalText)

            Object.assign(sectionsData, json)
            setModalIsOpen(false)
            setSectionsData({...sectionsData})
        } catch (e) {
            alert("Произошла ошибка!")
        }
    }

    function handleFileUpload(input) {
        let file = input.target.files[0];
        let reader = new FileReader();

        reader.readAsText(file);
        reader.onload = e => {
            Object.assign(sectionsData, JSON.parse(e.target.result))
            setSectionsData({...sectionsData})
        };

        reader.onerror = function () {
            alert(reader.error);
        };
    }

    return (
        <div>
            <div className="btn-dotted btn-dotted_default" onClick={() => {setModalIsOpen(modalIsOpen => !modalIsOpen)}}>
                Вставить как текст
            </div>
            <label className="text-reader btn-dotted btn-dotted_default">
                Загрузить из файла
                <input type="file" id="file" onChange={handleFileUpload}/>
            </label>
            <TextareaModal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                insertSectionText={insertSectionText}
            />
        </div>
    )
}