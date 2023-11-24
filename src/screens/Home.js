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
    const [offset_from_start, set_circle_offset] = useState(0);


    const navigator = useNavigate ();
    const [tableVisible, setTableVisible] = useState(false);
    const [showTableOnMobile, setShowTableOnMobile] = useState(false);

    const settings_modal = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);

    const comment_modal = useRef(null);
    const [commentModalOpen, setCommentModalOpen] = useState(false);

    const [WorkingFromModalOpen, setWorkingFromModalOpen] = useState(false);
    const WorkingFromModalRef = useRef(null);

    const [reportModalOpen, setreportModalOpen] = useState(false);
    const reportModalRef = useRef(null);

    const [workSessions, setWorkSessions] = useState([]);


    const [comment, setComment] = useState("");

    // const shift = {
    //     start: {start_time},
    //     end: {end_time},
    //     comment: {comment},
    //     absence: "TODO"
    // };

    const log_out = () => {
        var cookie = find_cookie("user_id=")
        document.cookie = cookie + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigator("/")
    }



    function find_cookie(cookie_header){
        var cookies = document.cookie.split(';');

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.startsWith(cookie_header))
                return cookie
        }
        return ""
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
        add_comment()
        setCommentModalOpen(false);
    };

    const openWorkinkFromModal = () => {
        setWorkingFromModalOpen(true);
    };

    const closeWorkingFromModal = () => {
        setWorkingFromModalOpen(false);
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
            if (window.innerWidth <= 1024)
                setShowTableOnMobile(true);
            else
                setShowTableOnMobile(false);
        };

        window.addEventListener('resize', handleWindowResize);

        handleWindowResize();

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        const handleClickOutsideModal = (event) => {
            if (settings_modal.current && !settings_modal.current.contains(event.target))
                closeModal();

        };

        const handleClickOutsideCommentModal = (event) => {
            if (comment_modal.current && !comment_modal.current.contains(event.target))
                closeCommentModal();
        };

        const handleClickOutsideReportModal = (event) => {
            if (reportModalRef.current && !reportModalRef.current.contains(event.target))
                closeReportModal();
        };

        const handleClickOutsideAbsenceModal = (event) => {
            if (WorkingFromModalRef.current && !WorkingFromModalRef.current.contains(event.target))
                closeWorkingFromModal();
        };

        const handleEscapeKey = (event) => {
            if (event.key === "Escape") {
                closeModal();
                closeCommentModal();
                closeWorkingFromModal();
                // closeReportModal();
            }
        };

        fetch_work_sessions()

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


    const currentDate = new Date();
    const yearMonth = currentDate.toISOString().slice(0, 7);
    async function generate_report(){
        openReportModal()

        let user_id = find_cookie("user_id=").split("=")[1];
        try {
            const response = await fetch(`https://solid-clock-api.onrender.com/api/home_screen/${user_id}?generatePdfReport=true`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.blob();
            if (response.ok){
                const url = URL.createObjectURL(data);
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.download = `${yearMonth}-report.pdf`; // Set the desired file name here
                link.click();
            }
            else
                console.log(data.error);
        } catch (error) {
            console.log('Error occurred:', error);
        }
        closeReportModal()
    }

    const workingFrom = [
        { reason: 'not set' },
        { reason: 'office' },
        { reason: 'home' },
        { reason: 'Vacation' },
    ];

    const reason_list = workingFrom.map((reasons) => reasons.reason);


    const add_comment = async ()=> {
        let session_id = find_cookie("session_id=").split("=")[1];

        if ( !session_id)
            return

        try {
            const payload = {session_id: session_id, user_note: comment};
            const response = await fetch(`https://solid-clock-api.onrender.com/api/home_screen/${session_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok)
                console.log(data)
            else
                console.log(data.error)
        } catch (error) {
            console.log('Error occurred:', error);
        }
    }

    async function fetch_work_sessions() {
        let user_id = find_cookie("user_id=").split("=")[1];
        try {
            const response = await fetch(`https://solid-clock-api.onrender.com/api/home_screen/${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();
            if (response.ok)
                setWorkSessions(data.workSessions);
            else
                console.log(data.error);
        } catch (error) {
            console.log('Error occurred:', error);
        }
    }


    return(
        <div className="background">
            {((showTableOnMobile && !tableVisible) || (!showTableOnMobile)) && ( <h1 id="header_home">
                Welcome back {find_cookie("user_name=").split("=")[1]}
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
                        {/*<div className="close" onClick={closeCommentModal}>&times;</div>*/}
                        <h2>Comment on today</h2>
                        <textarea value={comment} onChange={e => setComment(e.target.value)}></textarea>
                        <button onClick={closeCommentModal}>apply</button>
                    </div>
                </div>
            )}

            {WorkingFromModalOpen && (
                <div className="modal">
                    <div className="modal-content" ref={WorkingFromModalRef}>
                        {/*<div className="close" onClick={closeAbsenceModal}>&times;</div>*/}
                        <h2>Add absence reason</h2>
                        <Dropdown options={reason_list} find_cookie={find_cookie} selection="user"/>
                        <button onClick={closeWorkingFromModal}>apply</button>
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
                        {/*<button className="util" id="settings" onClick={openModal}></button>*/}

                        <div className="time_labels_div">
                            { start_time && <a id="start_time" className="time_labels" >{start_time}  </a> }
                            { end_time   && <a id="end_time"   className="time_labels" >{end_time}    </a> }
                        </div>

                        <Clock start_time={start_time}
                               set_start_time={set_start_time}
                               end_time={end_time}
                               set_end_time={set_end_time}
                               offset_from_start={offset_from_start}
                               set_circle_offset={set_circle_offset}
                        />

                        <div className="middle_buttons_div">
                            <div className="middle_buttons_inner">
                                <button className="middle_buttons" id="comment" onClick={openCommentModal}></button>
                                <div>Add comment</div>
                            </div>

                            <div className="middle_buttons_inner">
                                <button className="middle_buttons" id="absence" onClick={openWorkinkFromModal}></button>
                                <div>work from</div>
                            </div>
                        </div>

                        <div className="bottom_buttons_div">
                            <div className="bottom_buttons_div_inner">
                                <button className="bottom_buttons" id="report" onClick={generate_report}></button>
                                <div>Report</div>
                            </div>

                            <div className="bottom_buttons_div_inner">
                                <button className="bottom_buttons" id="view_table" onClick={() => setTableVisible(!tableVisible)}></button>
                                <div>Attendance</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* On mobile */}
                {showTableOnMobile && (
                    <Table tableVisible={tableVisible} setTableVisible={setTableVisible} showTableOnMobile={showTableOnMobile} setShowTableOnMobile={setShowTableOnMobile} find_cookie={find_cookie} workSessions={workSessions}/>
                )}

                {/* On PC */}
                {!showTableOnMobile && (
                    <Table tableVisible={tableVisible} setTableVisible={setTableVisible} find_cookie={find_cookie} workSessions={workSessions}/>
                )}
            </div>
        </div>
    );

}

export default Home_screen;