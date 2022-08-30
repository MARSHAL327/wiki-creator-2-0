import logo from './../assets/molotok_logo.svg'
import './../styles/header.css'

export default function Header() {
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

                    <a target="_blank"
                       rel="noreferrer"
                       href="https://alive-hour-cbe.notion.site/wiki-creator-d185a3d8cf8e4a55ab2f4ca604748e92"
                       className="grey-hover">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink"
                             width="512" height="512" x="0" y="0"
                             viewBox="0 0 512 512" style={{enableBackground: "new 0 0 512 512"}} xmlSpace="preserve"
                             className="">
                            <g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path
                                            d="M256,0C114.509,0,0,114.496,0,256c0,141.489,114.496,256,256,256c141.491,0,256-114.496,256-256    C512,114.509,397.504,0,256,0z M256,476.279c-121.462,0-220.279-98.816-220.279-220.279S134.538,35.721,256,35.721    c121.463,0,220.279,98.816,220.279,220.279S377.463,476.279,256,476.279z"
                                            fill="#ffffff" data-original="#000000" className=""></path>
                                    </g>
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path
                                            d="M248.425,323.924c-14.153,0-25.61,11.794-25.61,25.946c0,13.817,11.12,25.948,25.61,25.948    c14.49,0,25.946-12.131,25.946-25.948C274.371,335.718,262.577,323.924,248.425,323.924z"
                                            fill="#ffffff" data-original="#000000" className=""></path>
                                    </g>
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path
                                            d="M252.805,127.469c-45.492,0-66.384,26.959-66.384,45.155c0,13.142,11.12,19.208,20.218,19.208    c18.197,0,10.784-25.948,45.155-25.948c16.848,0,30.328,7.414,30.328,22.915c0,18.196-18.871,28.642-29.991,38.077    c-9.773,8.423-22.577,22.24-22.577,51.22c0,17.522,4.718,22.577,18.533,22.577c16.511,0,19.881-7.413,19.881-13.817    c0-17.522,0.337-27.631,18.871-42.121c9.098-7.076,37.74-29.991,37.74-61.666S295.937,127.469,252.805,127.469z"
                                            fill="#ffffff" data-original="#000000" className=""></path>
                                    </g>
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                            </g>
                        </svg>
                    </a>

                    <div className="grey-hover">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink"
                             width="512" height="512" x="0" y="0"
                             viewBox="0 0 512 512" style={{enableBackground: "new 0 0 512 512"}} xmlSpace="preserve"
                             className="">
                            <g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path
                                            d="M436,60h-75V45c0-24.813-20.187-45-45-45H196c-24.813,0-45,20.187-45,45v15H76c-24.813,0-45,20.187-45,45    c0,19.928,13.025,36.861,31.005,42.761L88.76,470.736C90.687,493.875,110.385,512,133.604,512h244.792    c23.22,0,42.918-18.125,44.846-41.271l26.753-322.969C467.975,141.861,481,124.928,481,105C481,80.187,460.813,60,436,60z M181,45    c0-8.271,6.729-15,15-15h120c8.271,0,15,6.729,15,15v15H181V45z M393.344,468.246c-0.643,7.712-7.208,13.754-14.948,13.754    H133.604c-7.739,0-14.305-6.042-14.946-13.747L92.294,150h327.412L393.344,468.246z M436,120H76c-8.271,0-15-6.729-15-15    s6.729-15,15-15h360c8.271,0,15,6.729,15,15S444.271,120,436,120z"
                                            fill="#ffffff" data-original="#000000" className=""></path>
                                    </g>
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path
                                            d="M195.971,436.071l-15-242c-0.513-8.269-7.67-14.558-15.899-14.043c-8.269,0.513-14.556,7.631-14.044,15.899l15,242.001    c0.493,7.953,7.097,14.072,14.957,14.072C189.672,452,196.504,444.684,195.971,436.071z"
                                            fill="#ffffff" data-original="#000000" className=""></path>
                                    </g>
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path
                                            d="M256,180c-8.284,0-15,6.716-15,15v242c0,8.284,6.716,15,15,15s15-6.716,15-15V195C271,186.716,264.284,180,256,180z"
                                            fill="#ffffff" data-original="#000000" className=""></path>
                                    </g>
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path
                                            d="M346.927,180.029c-8.25-0.513-15.387,5.774-15.899,14.043l-15,242c-0.511,8.268,5.776,15.386,14.044,15.899    c8.273,0.512,15.387-5.778,15.899-14.043l15-242C361.483,187.659,355.196,180.541,346.927,180.029z"
                                            fill="#ffffff" data-original="#000000" className=""></path>
                                    </g>
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                                <g xmlns="http://www.w3.org/2000/svg">
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>

            </div>
        </header>
    )
}