import React, {useState, useEffect, useRef} from 'react';
import '../styles/App.css';
import '../styles/Home_screen_style.css'
import Clock from "../components/clock";
import {useNavigate} from "react-router-dom";
import Table from "../components/table";

function Home_screen(){
    const [start_time, set_start_time] = useState('');
    const [end_time, set_end_time] = useState('');
    const navigator = useNavigate ();
    const [tableVisible, setTableVisible] = useState(false);
    const [showTableOnMobile, setShowTableOnMobile] = useState(false);
    const modalRef = useRef(null);

    const log_out = () => {
        navigator("/")
    }

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        const handleWindowResize = () => {
            if (window.innerWidth <= 768) {
                // Mobile
                setShowTableOnMobile(true);
                console.log("mobile")
            } else {
                // Desktop
                setShowTableOnMobile(false);
                console.log("desktop")
            }
        };

        window.addEventListener('resize', handleWindowResize);

        handleWindowResize();

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        const handleClickOutsideModal = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutsideModal);
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideModal);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);


    console.log("table on mobile: " + showTableOnMobile)
    console.log("table visible: " + tableVisible)
    return(
        <div className="background">

            <h1 id="header">
                Welcome back $$name$$
            </h1>
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content" ref={modalRef}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>User settings:</h2>
                    </div>
                </div>
            )}


            <div className="container">
                {((showTableOnMobile && !tableVisible) || (!showTableOnMobile)) && (
                    <div className="main_box" id="home_main_box">
                        <button className="util" id="log_out" onClick={log_out}></button>
                        <button className="util" id="settings" onClick={openModal}></button>

                        <div className="time_labels_div">
                            { start_time && <a id="start_time" className="time_labels" >{start_time}  </a> }
                            { end_time   && <a id="end_time"   className="time_labels" >{end_time}    </a> }
                        </div>

                        <Clock start_time={start_time} set_start_time={set_start_time} end_time={end_time} set_end_time={set_end_time}/>

                        <div className="middle_buttons_div">
                            <div className="middle_buttons_inner">
                                <button className="middle_buttons" id="comment"></button>
                                <div>Add comment</div>
                            </div>

                            <div className="middle_buttons_inner">
                                <button className="middle_buttons" id="absence"></button>
                                <div>Absence</div>
                            </div>
                        </div>

                        <div className="bottom_buttons_div">
                            <div className="bottom_buttons_div_inner">
                                <button className="bottom_buttons" id="report"></button>
                                <div>Report</div>
                            </div>

                            <div className="bottom_buttons_div_inner">
                                <button className="bottom_buttons" id="view_table" onClick={() => setTableVisible(!tableVisible)}></button>
                                <div>Attendance table</div>
                            </div>
                        </div>
                    </div>
                )}
                {/*{tableVisible && ( <Table tableVisible={tableVisible} setTableVisible={setTableVisible} /> )}*/}


                {/* On mobile */}
                {showTableOnMobile && (
                    <Table tableVisible={tableVisible} setTableVisible={setTableVisible} showTableOnMobile={showTableOnMobile} setShowTableOnMobile={setShowTableOnMobile}/>
                )}

                {/* On PC */}
                {!showTableOnMobile && (
                    <Table tableVisible={tableVisible} setTableVisible={setTableVisible} />
                )}
            </div>
        </div>
    );

}
// TODO: add table resize on mobile!!!!!

export default Home_screen;