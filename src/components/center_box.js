import React, { useState } from 'react';
import '../styles/login_box_style.css';

const ExpandingBox = () => {
    const [activeSection, setActiveSection] = useState('section1');

    const handleSectionClick = (section) => {
        // this prevents closing all tabs and leaves one open constantly
        if (activeSection === section) {
            return;
        }
        setActiveSection(section);
    };

    const sectionColors = {
        section1: 'rgba(255,160,122,0.57)',
        section2: 'rgba(144,238,144,0.51)',
        section3: 'rgba(135,206,235,0.6)',
    };

    const isSectionActive = (section) => {
        return activeSection === section;
    };

    return (
        <div className="main_box">
            <div
                className={`section ${isSectionActive('section1') ? 'active' : ''}`}
                style={{ backgroundColor: sectionColors.section1 }}
                onClick={() => handleSectionClick('section1')}
            >
                <p>Login</p>
                {isSectionActive('section1') && (
                    <>
                        <input type="text" placeholder="Username" onClick={(e) => e.stopPropagation()} />
                        <button onClick={(e) => e.stopPropagation()}>Login</button>
                    </>
                )}
            </div>

            <div
                className={`section ${isSectionActive('section2') ? 'active' : ''}`}
                style={{ backgroundColor: sectionColors.section2 }}
                onClick={() => handleSectionClick('section2')}
            >
                <p>sign-up</p>
                {isSectionActive('section2') && (
                    <>
                        <input type="text" placeholder="Your E-mail" onClick={(e) => e.stopPropagation()} />
                        <button onClick={(e) => e.stopPropagation()}>Sign-up</button>
                    </>
                )}
            </div>

            <div
                className={`section ${isSectionActive('section3') ? 'active' : ''}`}
                style={{ backgroundColor: sectionColors.section3 }}
                onClick={() => handleSectionClick('section3')}
            >
                <p>forgot password</p>
                {isSectionActive('section3') && (
                    <>
                        <input type="text" placeholder="your E-mail" onClick={(e) => e.stopPropagation()} />
                        <button onClick={(e) => e.stopPropagation()}>reset password</button>
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



