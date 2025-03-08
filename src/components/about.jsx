import catscan1x from '../assets/catscan1x.png'
import styled from "@emotion/styled"
import { FiArrowLeft } from "react-icons/fi"
import { NavLink } from 'react-router'

const AboutContainer = styled.div`
    text-align: center;
    justify-content: center;
    .back-btn {
        height: 64px;
        width: 64px;
        border-radius: 64px;
        margin-top: 52px;
        padding-top: 5px;
    }
    button {
        border: none;
        color: white;
    }
    p {
        max-width: 900px;
        margin: auto;
        margin-top: 16px;
    }
`

export default function About() {
    return(
        <AboutContainer>
            <img src={catscan1x} alt="catscan-logo" className="catscan-logo"/>
            <p>Welcome to CatScan, the ultimate app for cat lovers and the curious alike! Ever wondered if that furry creature in your photo is truly a cat? With CatScan, you can snap a picture or upload an image, and our AI model will analyze it to determine if it’s a feline or not. Using cutting-edge machine learning, CatScan provides fast and accurate results, making it a fun and useful tool for pet owners, animal enthusiasts, and anyone who loves a bit of tech-driven curiosity. Try CatScan today and put our AI to the test... Because sometimes, you just need to be sure!</p>
            <NavLink to='/insert-photo' className='back-btn' style={{ textDecoration: 'none' }}>
                <button className="back-btn">
                        <FiArrowLeft size={36}/>
                </button>
            </NavLink>
        </AboutContainer>
    )
}