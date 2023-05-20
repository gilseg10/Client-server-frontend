import React, { useState } from 'react';
import '../styles/login_box_style.css';

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
                            <input type="text" placeholder="Username" onClick={(e) => e.stopPropagation()} />
                            <a>Password</a>
                            <input type="password" placeholder="Password" onClick={(e) => e.stopPropagation()} />

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
                        <input type="text" placeholder="Username" onClick={(e) => e.stopPropagation()} />
                        <a>Password</a>
                        <input type="password" placeholder="password" onClick={(e) => e.stopPropagation()} />
                        <a>Confirm password</a>
                        <input type="password" placeholder="confirm password" onClick={(e) => e.stopPropagation()} />
                        <a>E-mail</a>
                        <input type="email" placeholder="Your E-mail" onClick={(e) => e.stopPropagation()} />
                        <a>Phone-number</a>
                        <input type="text" placeholder="phone number" onClick={(e) => e.stopPropagation()} />


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
                        <input type="text" placeholder="your E-mail" onClick={(e) => e.stopPropagation()} />
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