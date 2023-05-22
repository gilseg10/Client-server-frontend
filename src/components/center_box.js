import React, { useState } from 'react';
import '../styles/login_box_style.css';
import TextBox from "./textBox";

const ExpandingBox = () => {
    const [activeSection, setActiveSection] = useState('section1');


    // this handles the click on a section and prevents closing all tabs leaving one open constantly
    const handleSectionClick = (section) => {
        if (activeSection === section)
            return;
        setActiveSection(section);
    };

    const isSectionActive = (section) => {
        return activeSection === section;
    };

    return (
        <div className="main_box">
            <div
                className={`section ${isSectionActive('section1') ? 'active' : ''}`}
                onClick={() => handleSectionClick('section1')}
            >
                <p>Login</p>
                    {isSectionActive('section1') && (
                        <>
                            <a>Username</a>
                            <TextBox type="username" placeholder="Username"/>
                            <a>Password</a>
                            <TextBox type="password" placeholder="Password"/>

                            <button onClick={(e) => e.stopPropagation()}>Login</button>
                        </>
                    )}
            </div>

            <div
                className={`section ${isSectionActive('section2') ? 'active' : ''}`}
                onClick={() => handleSectionClick('section2')}
            >
                <p>sign-up</p>
                {isSectionActive('section2') && (
                    <>
                        <a>Username</a>
                        <TextBox type="username" placeholder="Username"/>
                        <a>Password</a>
                        <TextBox type="password" placeholder="Password"/>
                        <a>Confirm password</a>
                        <TextBox type="password" placeholder="Confirm password"/>
                        <a>E-mail</a>
                        <TextBox type="email" placeholder="E-mail"/>
                        <a>Phone-number</a>
                        <TextBox type="phone" placeholder="Phone number"/>
                        <button onClick={(e) => e.stopPropagation()}>Sign-up</button>
                    </>
                )}
            </div>

            <div
                className={`section ${isSectionActive('section3') ? 'active' : ''}`}
                onClick={() => handleSectionClick('section3')}
            >
                <p>forgot password</p>
                {isSectionActive('section3') && (
                    <>
                        <TextBox type="phone"/>
                        <button onClick={(e) => e.stopPropagation()}>Reset my password</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ExpandingBox;





















// working backup with smewhat animation in css
// import React, { useState } from 'react';
// import '../styles/login_box_style.css'; // Import the CSS file for styling
//
// const ExpandingBox = () => {
//     const [activeSection, setActiveSection] = useState('section1');
//
//     const handleSectionClick = (section) => {
//         if (activeSection === section) {
//             // Prevent closing the last open section
//             return;
//         }
//         setActiveSection(section);
//     };
//
//     const sectionColors = {
//         section1: '#FFA07A', // Color for Section 1
//         section2: '#90EE90', // Color for Section 2
//         section3: '#87CEEB', // Color for Section 3
//     };
//
//     const isSectionActive = (section) => {
//         return activeSection === section;
//     };
//
//     return (
//         <div className="main_box">
//             <div
//                 className={`section ${isSectionActive('section1') ? 'active' : ''}`}
//                 style={{ backgroundColor: sectionColors.section1 }}
//                 onClick={() => handleSectionClick('section1')}
//             >
//                 <p>Section 1</p>
//                 {isSectionActive('section1') && (
//                     <>
//                         <input type="text" placeholder="Enter text..." onClick={(e) => e.stopPropagation()} />
//                         <button onClick={(e) => e.stopPropagation()}>Click me</button>
//                     </>
//                 )}
//             </div>
//             <div
//                 className={`section ${isSectionActive('section2') ? 'active' : ''}`}
//                 style={{ backgroundColor: sectionColors.section2 }}
//                 onClick={() => handleSectionClick('section2')}
//             >
//                 <p>Section 2</p>
//                 {isSectionActive('section2') && (
//                     <>
//                         <textarea placeholder="Enter text..." onClick={(e) => e.stopPropagation()}></textarea>
//                         <button onClick={(e) => e.stopPropagation()}>Submit</button>
//                     </>
//                 )}
//             </div>
//             <div
//                 className={`section ${isSectionActive('section3') ? 'active' : ''}`}
//                 style={{ backgroundColor: sectionColors.section3 }}
//                 onClick={() => handleSectionClick('section3')}
//             >
//                 <p>Section 3</p>
//                 {isSectionActive('section3') && (
//                     <>
//                         <p>Some content here...</p>
//                         <button onClick={(e) => e.stopPropagation()}>Go</button>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default ExpandingBox;