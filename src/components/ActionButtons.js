import "../styles/fileUpload.css"
import TextareaModal from "./TextareaModal";
import {useState} from "react";

export default function ActionButtons({setSectionsDataFromJson}){
    let [modalIsOpen, setModalIsOpen] = useState(false)

    function insertSectionText(modalText) {
        try {
            setSectionsDataFromJson(modalText)
            setModalIsOpen(false)
        } catch (e) {
            alert("Произошла ошибка!")
        }
    }

    function handleFileUpload(input) {
        let file = input.target.files[0];
        let reader = new FileReader();

        reader.readAsText(file);
        reader.onload = e => {
            setSectionsDataFromJson(e.target.result)
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