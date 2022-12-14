import "../styles/fileUpload.css"
import TextareaModal from "./TextareaModal";
import {useContext, useState} from "react";
import AddSection from "./AddSection";
import Context from "../context";

export default function ActionButtons({setSectionsDataFromJson, sections}) {
    const {visibleSectionsCount} = useContext(Context)
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
            <div className={"data-title"}>Входные данные</div>
            <div className="btn-dotted btn-dotted_default" onClick={() => {
                setModalIsOpen(modalIsOpen => !modalIsOpen)
            }}>
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

            <AddSection
                sections={sections}
                isVisible={visibleSectionsCount > 0 && visibleSectionsCount < Object.keys(sections).length}
            />

        </div>
    )
}