import React, {useState, useEffect, useRef} from 'react';
import '../styles/App.css';
import '../styles/Home_screen_style.css'
import Clock from "../components/clock";
import {useNavigate} from "react-router-dom";
import Table from "../components/table";
import Dropdown from "../components/dropown";
import Loader from "../components/loader";

function Home_screen(){
    const [start_time, set_start_time] = useState('');
    const [end_time, set_end_time] = useState('');
    const navigator = useNavigate ();
    const [tableVisible, setTableVisible] = useState(false);
    const [showTableOnMobile, setShowTableOnMobile] = useState(false);

    const settings_modal = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);

    const comment_modal = useRef(null);
    const [commentModalOpen, setCommentModalOpen] = useState(false);

    const [absenceModalOpen, setAbsenceModalOpen] = useState(false);
    const absenceModalRef = useRef(null);

    const [reportModalOpen, setreportModalOpen] = useState(false);
    const reportModalRef = useRef(null);


    const [comment, setComment] = useState("");


    const shift = {
        start: {start_time},
        end: {end_time},
        comment: {comment},
        absence: "TODO"
    };

    // TODO: also add logout cookie delete!!!!!!!!!!!!!!!!
    const log_out = () => {
        document.cookie = `Clock_sign_in_valid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

        navigator("/")
    }


    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    const openCommentModal = () => {
        setCommentModalOpen(true);
    };

    const closeCommentModal = () => {
        setCommentModalOpen(false);
    };

    const openAbsenceModal = () => {
        setAbsenceModalOpen(true);
    };

    const closeAbsenceModal = () => {
        setAbsenceModalOpen(false);
    };

    const openReportModal = () => {
        setreportModalOpen(true);
    };

    const closeReportModal = () => {
        setreportModalOpen(false);
    };

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }


    useEffect(() => {
        const handleWindowResize = () => {
            if (window.innerWidth <= 1100) {
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
            if (settings_modal.current && !settings_modal.current.contains(event.target)) {
                closeModal();
            }
        };

        const handleClickOutsideCommentModal = (event) => {
            if (comment_modal.current && !comment_modal.current.contains(event.target)) {
                closeCommentModal();
            }
        };

        const handleClickOutsideReportModal = (event) => {
            if (reportModalRef.current && !reportModalRef.current.contains(event.target)) {
                closeReportModal();
            }
        };

        const handleClickOutsideAbsenceModal = (event) => {
            if (absenceModalRef.current && !absenceModalRef.current.contains(event.target)) {
                closeAbsenceModal();
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === "Escape") {
                closeModal();
                closeCommentModal();
                closeAbsenceModal();
                // closeReportModal();
            }
        };


        // document.addEventListener('mousedown', handleClickOutsideReportModal);
        // document.addEventListener('keydown', handleEscapeKey);

        document.addEventListener('mousedown', handleClickOutsideCommentModal);
        document.addEventListener('keydown', handleEscapeKey);

        document.addEventListener('mousedown', handleClickOutsideModal);
        document.addEventListener('keydown', handleEscapeKey);

        document.addEventListener('mousedown', handleClickOutsideAbsenceModal);
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideModal);
            document.removeEventListener('mousedown', handleClickOutsideCommentModal);
            document.removeEventListener('mousedown', handleClickOutsideAbsenceModal);

            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);


    async function generate_report(){
        openReportModal()
        await sleep(3000);
        closeReportModal()
    }

    const workAbsenceReasons = [
        { reason: 'Sick Leave' },
        { reason: 'Personal Leave' },
        { reason: 'Vacation' },
    ];

    const reason_list = workAbsenceReasons.map((reasons) => reasons.reason);



    return(
        <div className="background">

            {((showTableOnMobile && !tableVisible) || (!showTableOnMobile)) && ( <h1 id="header">
                Welcome back $$name$$
            </h1>)}

            {modalOpen && (
                <div className="modal">
                    <div className="modal-content" ref={settings_modal}>
                        <div className="close" onClick={closeModal}>&times;</div>
                        <h2>User settings:</h2>
                    </div>
                </div>
            )}
            {commentModalOpen && (
                <div className="modal">
                    <div className="modal-content" ref={comment_modal}>
                        <div className="close" onClick={closeCommentModal}>&times;</div>
                        <h2>Comment on today</h2>
                        <textarea value={comment} onChange={e => setComment(e.target.value)}></textarea>
                    </div>
                </div>
            )}

            {absenceModalOpen && (
                <div className="modal">
                    <div className="modal-content" ref={absenceModalRef}>
                        <div className="close" onClick={closeAbsenceModal}>&times;</div>
                        <h2>Add absence reason</h2>
                        <Dropdown options={reason_list}/>
                    </div>
                </div>
            )}

            {reportModalOpen && (
                <div className="modal">
                    <div className="modal-content" ref={reportModalRef}>
                        {/*<span className="close" onClick={closeReportModal}>&times;</span>*/}
                        <h2>generating PDF report</h2>
                        <Loader/>
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
                                <button className="middle_buttons" id="comment" onClick={openCommentModal}></button>
                                <div>Add comment</div>
                            </div>

                            <div className="middle_buttons_inner">
                                <button className="middle_buttons" id="absence" onClick={openAbsenceModal}></button>
                                <div>Absence</div>
                            </div>
                        </div>

                        <div className="bottom_buttons_div">
                            <div className="bottom_buttons_div_inner">
                                <button className="bottom_buttons" id="report" onClick={generate_report}></button>
                                <div>Report</div>
                            </div>

                            <div className="bottom_buttons_div_inner">
                                <button className="bottom_buttons" id="view_table" onClick={() => setTableVisible(!tableVisible)}></button>
                                <div>Attendance table</div>
                            </div>
                        </div>
                    </div>
                )}

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