import '../styles/textareaModal.css'
import {useState} from "react";

export default function TextareaModal({modalIsOpen, setModalIsOpen, insertSectionText}) {
    let [modalText, setModalText] = useState("")

    return modalIsOpen && (
        <div className="modal">
            <div className="modal__body">
                <div className="modal__close grey-hover" onClick={setModalIsOpen.bind(null, false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink"
                         width="512" height="512" x="0" y="0"
                         viewBox="0 0 329.26933 329" style={{enableBackground: "new 0 0 512 512"}} xmlSpace="preserve"
                         className="">
                        <g>
                            <path xmlns="http://www.w3.org/2000/svg"
                                  d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"
                                  fill="#ffffff" data-original="#000000" className=""></path>
                        </g>
                    </svg>
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
    )
}