import React, {useEffect, useState, useRef} from 'react';
import { gsap } from "gsap";

interface Note {
    id: string,
    note: string,
}
export default function SendNote() {
    const [note, setNote] = useState("");
    const [message, setMessage] = useState("");
    const myButton = useRef(null);

    useEffect(() => {
        gsap.to(myButton.current, {
            keyframes: [{
                '--left-wing-first-x': 50,
                '--left-wing-first-y': 100,
                '--right-wing-second-x': 50,
                '--right-wing-second-y': 100,
                duration: .2,
                onComplete() {
                    gsap.set(myButton.current, {
                        '--left-wing-first-y': 0,
                        '--left-wing-second-x': 40,
                        '--left-wing-second-y': 100,
                        '--left-wing-third-x': 0,
                        '--left-wing-third-y': 100,
                        '--left-body-third-x': 40,
                        '--right-wing-first-x': 50,
                        '--right-wing-first-y': 0,
                        '--right-wing-second-x': 60,
                        '--right-wing-second-y': 100,
                        '--right-wing-third-x': 100,
                        '--right-wing-third-y': 100,
                        '--right-body-third-x': 60
                    })
                }
            }, {
                '--left-wing-third-x': 20,
                '--left-wing-third-y': 90,
                '--left-wing-second-y': 90,
                '--left-body-third-y': 90,
                '--right-wing-third-x': 80,
                '--right-wing-third-y': 90,
                '--right-body-third-y': 90,
                '--right-wing-second-y': 90,
                duration: .2
            }, {
                '--rotate': 50,
                '--left-wing-third-y': 95,
                '--left-wing-third-x': 27,
                '--right-body-third-x': 45,
                '--right-wing-second-x': 45,
                '--right-wing-third-x': 60,
                '--right-wing-third-y': 83,
                duration: .25
            }, {
                '--rotate': 55,
                '--plane-x': -8,
                '--plane-y': 24,
                duration: .2
            }, {
                '--rotate': 40,
                '--plane-x': 45,
                '--plane-y': -180,
                '--plane-opacity': 0,
                duration: .3,
                onComplete() {
                    setTimeout(() => {
                        gsap.fromTo(myButton.current, {
                            opacity: 0,
                            y: -8
                        }, {
                            opacity: 1,
                            y: 0,
                            clearProps: true,
                            duration: .3,
                            onComplete() {
                            }
                        })
                    }, 2000)
                }
            }]
        })
        gsap.to(myButton.current, {
            keyframes: [{
                '--text-opacity': 0,
                '--border-radius': 0,
                duration: .1
            }, {
                '--success-opacity': 1,
                '--success-scale': 1,
                duration: .25,
                delay: .25
            }]
        })},
    []);
      
    const sendNote = () => {
        const noteEntry = {
            message: note
        }
        fetch("/.netlify/functions/addNote",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(noteEntry)
            })
            .then(function(res){
                setMessage(`SEND: ${note}`);
            })
            .catch(function(res){
                setMessage(`Unable to send note :(`);
            })
    }
    const HandleClick =()=> {
       sendNote();
    };
    return <>
        <section className="about full-screen d-lg-flex justify-content-center align-items-center">
            <div className="about-text">
                {/* <h2><small className="small-text">Live<span className="mobile-block"> Demo</span></small></h2> */}
                <h3 className="animated animated-text">
                    <div className="mr-5">
                        <div className="animated-info">
                            <span className="animated-item">Release your <span style={{color: '#b491c8'}}>thoughts</span></span>
                            <span className="animated-item">Share your <span style={{color: '#b491c8'}}>sadness</span></span>
                            <span className="animated-item">Pain, pain <span style={{color: '#b491c8'}}>fly away</span></span>
                        </div>
                    </div>
                </h3>
                <br></br><br></br><br></br><br></br>
                <div className="mb-3">
                    <form onSubmit={sendNote}>
                        <textarea
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        minLength={1}
                        maxLength={300}
                        placeholder="share your message"
                        className="form-control"
                        cols={40}
                        />
                        <br></br>
                        <div className="custom-btn-group mt-4">
                            <button className="button" onClick={() => HandleClick()} ref = {myButton}>
                                <span className="default">Send</span>
                                <span className="success">Sent!</span>
                                <div className="left"></div>
                                <div className="right"></div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>
}