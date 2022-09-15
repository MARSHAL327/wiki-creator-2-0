import '../styles/textareaModal.css'
import {useState} from "react";
import CSSTransition from "react-transition-group/CSSTransition";

export default function TextareaModal({modalIsOpen, setModalIsOpen, insertSectionText}) {
    let [modalText, setModalText] = useState("")

    return (
        <>
            <CSSTransition
                in={modalIsOpen}
                timeout={600}
                classNames={"scale-animation"}
                mountOnEnter
                unmountOnExit
            >
                <div className="modal">
                    <div className="modal__body">
                        <div className="modal__close modal__close_main grey-hover"
                             onClick={setModalIsOpen.bind(null, false)}>
                            <i className="fi fi-rr-cross-small"></i>
                        </div>

                        <textarea id={"modal-textarea"} className="modal__text" onChange={(e) => {
                            setModalText(e.target.value)
                        }}></textarea>
                        <div
                            className="modal__btn btn-dotted btn-dotted_default"
                            onClick={insertSectionText.bind(null, modalText)}
                        >
                            Подтвердить
                        </div>
                    </div>
                </div>
            </CSSTransition>
            <CSSTransition
                in={modalIsOpen}
                timeout={600}
                classNames={"fade"}
                mountOnEnter
                unmountOnExit
            >
                <div className="modal__background" onClick={() => {
                    console.log("test") }}></div>
            </CSSTransition>
        </>
    )
}