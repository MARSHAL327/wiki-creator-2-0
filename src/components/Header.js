import logo from './../assets/molotok_logo.svg'
import ReactTooltip from "react-tooltip";
import {useState} from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './../styles/header.css'

import guide1 from "../assets/Инструкция 1.jpg"
import guide2 from "../assets/Инструкция 2.jpg"
import guide3 from "../assets/Инструкция 3.jpg"

export default function Header({deleteAll}) {
    let classes = ["guide-modal"]
    let [guideModalIsOpen, setGuideModalIsOpen] = useState(false)

    function toggleGuideModal() {
        setGuideModalIsOpen(guideModalIsOpen => !guideModalIsOpen)
    }

    if (guideModalIsOpen)
        classes.push("guide-modal_active")

    return (
        <header>
            <div className="container">
                <a target="_blank"
                   rel="noreferrer"
                   href={"https://molotok-studio.ru/"}
                   className="logo">
                    <img src={logo} alt=""/>
                </a>
                <div className="header__left">
                    <div className="project-title">
                        Инструмент для создания Wiki 2.0
                    </div>

                    <i className="fi fi-rr-question grey-hover"
                       data-for={"question"}
                       data-tip="Инструкция"
                       data-iscapture="true"
                       onClick={toggleGuideModal}
                    >
                        <a target="_blank"
                           rel="noreferrer"
                           href="https://alive-hour-cbe.notion.site/wiki-creator-d185a3d8cf8e4a55ab2f4ca604748e92"
                        >
                        </a>
                    </i>

                    <i className="fi fi-rr-trash grey-hover"
                       data-for={"delete-all"}
                       data-tip="Удалить всё"
                       data-iscapture="true"
                       onClick={deleteAll}
                    ></i>
                </div>
            </div>


            <div className={classes.join(" ")}>
                <Swiper
                    pagination={{
                        type: "progressbar",
                    }}
                    modules={[Navigation, Pagination]}
                    navigation={true}
                    className={"guide-modal__swiper"}
                >
                    <SwiperSlide>
                        <img src={guide1} alt=""/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={guide2} alt=""/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={guide3} alt=""/>
                    </SwiperSlide>
                </Swiper>
                <div className="guide-modal__close grey-hover modal__close" onClick={toggleGuideModal}>
                    <i className="fi fi-rr-cross-small"></i>
                </div>
            </div>


            <ReactTooltip
                id={"question"}
                place={"bottom"}
                effect={"solid"}
                multiline={true}
                className={"main-tooltip"}
            />
            <ReactTooltip
                id={"delete-all"}
                place={"bottom"}
                effect={"solid"}
                multiline={true}
                className={"main-tooltip"}
            />
        </header>
    )
}