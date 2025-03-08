import styled from "@emotion/styled"
import catscan1x from '../assets/catscan1x.png'
import { useState, useRef, useEffect } from "react"
import { FiCamera } from "react-icons/fi"
import { FiUpload } from "react-icons/fi"
import { RxCross1 } from "react-icons/rx"
import { FiArrowLeft } from "react-icons/fi"
import * as tf from "@tensorflow/tfjs"
import { useOutletContext } from "react-router-dom"
import { IoWarningOutline } from "react-icons/io5"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { FiDownload } from "react-icons/fi"
import { toPng } from "html-to-image"
import CountUp from "react-countup"
import { IoMdCloseCircle } from "react-icons/io"

const InsertPhotoContainer = styled.div`
    background-color: #ffe8d6;
    text-align: center;
    align-items: center;
    .scanning-text {
        animation: fadeInOut 1.5s infinite;
        padding: 20px;
    }
    @keyframes fadeInOut {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
    .loading-cam {
        position: absolute;
        color: #cb997e;
        font-weight: bold;
    }
    .q, .a {
        margin: 0px;
        background-color: #ffe8d6;
        width: 500px;
        font-size: 12px;
    }
    .q {
        margin-top: 16px;
    }
    .a {
        padding-bottom: 24px;
    }
    .link {
        color: #666D5A;
        font-weight: bold;
    }
    .download-x {
        margin: 4px;
        margin-left: auto;
        color: #666D5A;
        cursor: pointer;
    }
    .download-x:hover {
        color: #4a4e42;
    }
    .dark {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background-color: rgb(0,0,0, 0.5);
        z-index: 999
    }
    .download-window {
        position: absolute;
        border: 5px solid #cb997e;
        border-radius: 15px;
        background-color: #ffe8d6;
        z-index: 990;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 480px;
        max-width: 80%;
    }
    .download-img {
        max-width: 100%;
    }
    .funny-sentence {
        max-width: 480px;
        opacity: 0%;
        animation-name: funnyFade;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 1s;
        animation-delay: 3s;
        animation-fill-mode: forwards;
    }
    @keyframes funnyFade {
        0% {
            opacity: 0%;
        }
        100% {
            opacity: 100%
        }
    }
    .percentage {
        opacity: 0%;
        font-family: "Roboto Mono", monospace;
        animation-name: percentageLoad;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 0.5s;
        animation-delay: 1s;
        animation-fill-mode: forwards;
        margin: 0px;
    }
    .perc-number {
        color: #666D5A;
        font-weight: bold;
    }
    @keyframes percentageLoad {
        0% {
            opacity: 0%;
        }
        100% {
            opacity: 100%;
        }
    }
    .loading-icon {
        margin-top: 46.5px;
        margin-bottom: 22.5px;
        color: #cb997e;
        font-size: 1.5rem;
        animation: spin 1s linear infinite;
    }
    .insert-box {
        border: 5px solid #cb997e;
        border-radius: 15px;
        height: 330px;
        width: 330px;
        display:flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        margin-bottom: 20px;
        margin-top: 20px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        overflow: hidden;
        align-items: center;
    }
    .insert-text {
        color: #cb997e;
        font-weight: bold;
        pointer-events: none;
        margin-top: 0px;
        margin-bottom: 6px;

    }
    .photo-btns > button {
        border: none;
        border-radius: 15px;
        color: white;
        width: 155px;
        height: 93px;
    }
    .photo-btns > .cam-on {
    }
    .photo-btns > .cam-off {
        background-color: rgb(107,112,92, 0.5);
    }
    .cam-off {
        cursor: default;
    }
    .take-btn {
        margin-right: 20px;
    }
    .btn-label {
        margin: 4px;
    }
    .img-container {
        height: 330px;
        width: 330px;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
    }
    .result-string {
        position: absolute;
        color: white;
        bottom: 0%;
        margin: 0px;
        transform: translateX(-50%);
        left: 50%;
        text-align: center;
        z-index: 900;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        height: 64px;
        border-radius: 0px 0px 10px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        animation-name: slideUp;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 1s;
    }
    @keyframes slideUp {
        0% {
            bottom: -20%;
        }
        100% {
            bottom: 0%;
        }
    }
    .warning {
        animation-name: warningFade;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 1s;
        animation-fill-mode: forwards;
    }
    @keyframes warningFade {
        0% {
            color: #4d2b19;
        }
        25% {
            color: #4d2b19;
        }
        100% {
            color: #cb997e;
        }
    }
    .selected-photo {
        width: 100%;
        object-fit: cover;
        object-position: center;
    }
    .scan-container > button {
        border: none;
        color: white;
    }
    .scan-btn {
        height: 93px;
        width: 215px;
        border-radius: 15px;
    }
    .download-btn {
        border: none;
        color: white;
        height: 80px;
        width: 160px;
        border-radius: 15px;
        font-weight: 400;
        margin-bottom: 12px;
    }
    .share-fade {
        height: 93px;
        width: 225px;
        border-radius: 15px;
        opacity: 0;
	    animation-name: fadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 0.5s;
        animation-delay: 4s;
        animation-fill-mode: forwards;
    }
    .share-btn {
        height: 93px;
        width: 225px;
        border-radius: 15px;
        opacity: 1;
    }
    @keyframes fadeInOpacity {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    .back-btn {
        height: 64px;
        width: 64px;
        border-radius: 64px;
        margin-top: 52px;
        padding-top: 5px;
        margin-bottom: 32px;
    }
    .scan-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .camera-container {
        height: 330px;
        width: 330px;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        position: relative;
    }
    .capture-btn {
        position: absolute;
        top: 90%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 32px;
        width: 32px;
        border-radius: 32px;
        border: none;
        background-color: #FFF;
        box-shadow: 0px 0px 2px 5px rgba(0, 0, 0, 0.25);
    }
`

export default function InsertPhoto() {
    const { cocossdModel, myModel, animalsModel } = useOutletContext()
    const [ photo, setPhoto ] = useState(null)
    const [ preview, setPreview ] = useState(null)
    const [ cameraMode, setCameraMode ] = useState(false)
    const fileInputRef = useRef()
    const imageRef = useRef()
    const videoRef = useRef()
    const [ scanning, setScanning ] = useState(false)
    const [ results, setResults ] = useState(null)
    const [ resultColor, setResultColor ] = useState(null)
    const [ warning, setWarning ] = useState(false)
    const imageContainerRef = useRef()
    const [ downloadLink, setDownloadLink ] = useState(null)
    const [ adjust, setAdjust ] = useState(false)
    const [ shareFade, setShareFade ] = useState(true)

    const handleDownload = () => {
        const link = document.createElement("a")
        link.href = downloadLink
        link.download = "cat-scan-result.png"
        link.click()
    }

    const handleShareClick = () => {
        setAdjust(true)
        setTimeout(() => {
            if (imageContainerRef.current) {
                toPng(imageContainerRef.current, { width: 500, height: 700 })
                    .then((dataUrl) => {
                        setDownloadLink(dataUrl)
                    })
                    .catch((err) => {
                        console.error("Error generating image", err)
                    })
                    .finally(() => {
                        setAdjust(false)
                    })
            }
            setAdjust(false)
        }, 0)
        setShareFade(false)
    }

    function handlePhotoSelected(e) {
        const file = e.target.files[0]
        const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/avif", "image/webp"]
        if (file.type && validTypes.includes(file.type)) {
            setWarning(false)
            setPhoto(file)
            return
        }
        setWarning(true)
    }

    const getVideo = async () => {
        setWarning(false)
        if (!cameraMode) {
            setCameraMode(true)
            navigator.mediaDevices
                .getUserMedia({
                    video: true
                })
                .then(stream => {
                    let video = videoRef.current
                    video.srcObject = stream
                    video.play()
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            setCameraMode(false)
            let video = videoRef.current
            if (video && video.srcObject) {
                setWarning(false)
                let stream = video.srcObject
                let tracks = stream.getTracks()
                tracks.forEach(track => track.stop())
                video.srcObject = null
            }
        }
    }

    function getScore(predictions) {
        let sum = 0.0;
        const predictionStrings = ["It's a Cat! (=^ u ^=)", "Probably a Cat (=O u O=)", "Probably not a Cat (=* n *=)", "Definitely Not a Cat (=T n T=)"]
        const sentences = [
            "It's a certified feline! This kitty is ready for its close up!",
            "It's a cat... or it's a very well disguised dog, but we'll lean towards kitty for now.",
            "It might be a cat in a parallel universe, but here, it's something else.",
            "It is definitely not a cat. Are you sure you didn't take a picture of a potato?"
        ]
        const colors = ["#0B3954", "#14ad59", "#EE7E0E", "#C1121F"]
        predictions.map(score => {
            sum += score
        })
        sum = sum / 3.0
        const result = [sum * 100.0]
        if (sum > .75) {
            result.push(predictionStrings[0])
            result.push(sentences[0])
            setResultColor(colors[0])
        } else if (sum > .5) {
            result.push(predictionStrings[1])
            result.push(sentences[1])
            setResultColor(colors[1])
        } else if (sum > .25) {
            result.push(predictionStrings[2])
            result.push(sentences[2])
            setResultColor(colors[2])
        } else {
            result.push(predictionStrings[3])
            result.push(sentences[3])
            setResultColor(colors[3])
        }
        return result
    }

    const identify = async () => {
        setScanning(true)
        await new Promise(resolve => setTimeout(resolve, 0))
    
        const image = imageRef.current
        let predictions = []
    
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0, image.width, image.height)
        const dataUrl = canvas.toDataURL("image/png")
    
        const tensor = tf.browser.fromPixels(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims(0)
            .toFloat()
            .div(255)
    
        const myModelResults = myModel.predict(tensor)
        const myModelPredictions = await myModelResults.array()
        predictions.push(myModelPredictions[0][0])
    
        const animalsModelResults = animalsModel.predict(tensor)
        const animalsModelPredictions = await animalsModelResults.array()
        predictions.push(animalsModelPredictions[0][9])
    
        const cocossdPredictions = await cocossdModel.detect(image)
    
        cocossdPredictions.forEach(prediction => {
            if (prediction.class === "cat") {
                predictions.push(prediction.score)
            }
        })
    
        const newResults = getScore(predictions)
        setResults({ results: newResults })
    
        setScanning(false)
    }

    const takePhoto = () => {
        setCameraMode(false)
        const video = videoRef.current;

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        canvas.toBlob((blob) => {
            const file = new File([blob], 'captured-photo.png', { type: 'image/png' });
            setPhoto(file)
        }, 'image/png')
    }

    useEffect(() => {
        if (photo) {
            const objectUrl = URL.createObjectURL(photo)
            setPreview(objectUrl)
            return () => URL.revokeObjectURL(objectUrl)
        } else {
            setPreview(null)
        }
    }, [photo])

    return (
        <>
            <InsertPhotoContainer ref={imageContainerRef} style={{ 
                width: adjust ? 500 : 'auto',
                transform: adjust ? 'translateY(-64px)' : 'none'
            }}>
                {
                    downloadLink ?
                    <div className="dark">
                        <div className="download-window">
                            <IoMdCloseCircle size={26} className="download-x" onClick={() => {setDownloadLink(null)}}/>
                            <img src={downloadLink} className="download-img"></img>
                            <button className="download-btn btn-label" onClick={handleDownload}>
                                <FiDownload size={32}/><br/>
                                Download
                            </button>
                        </div>
                    </div> :
                    <></>
                }
                <img src={catscan1x} alt="catscan-logo" className="catscan-logo"/>
                <div className="insert-box">
                    {
                        preview ?
                        <>
                            <div className="img-container">
                                <img className="selected-photo" src={preview} alt="file" ref={imageRef}/>
                                {
                                    results ?
                                    <>
                                        <p className="result-string" style={{background: `linear-gradient(to top, ${resultColor} 0%, transparent 100%)`}}>{results.results[1]}</p>
                                    </>
                                     :
                                    <></>
                                }
                            </div>
                        </> :
                        <>
                            {
                                cameraMode ?
                                <>
                                    <p className="loading-cam">Loading camera...</p>
                                    <div className="camera-container">
                                        <video className="camera" ref={videoRef}/>
                                        <button className="capture-btn" onClick={() => {takePhoto()}}></button>
                                    </div>
                                </> :
                                <>
                                    {
                                        warning ?
                                        <>
                                            <p className="insert-text warning"><IoWarningOutline size={42}/></p>
                                            <p className="insert-text warning">Invalid file type!</p>
                                            <p className="insert-text warning">Please upload a JPG, JPEG, PNG, AVIF, or WEBP file.</p>
                                        </> :
                                        <>
                                            <p className="insert-text">Take or Upload a photo to scan</p>
                                        </>
                                    }
                                </>
                            }
                        </>
                        
                    }
                </div>
                    {
                        !preview ?
                        <>
                            <div className="photo-btns">
                                <button className={"take-btn " + (cameraMode ? "cam-on" : "")} onClick={getVideo}>
                                    {cameraMode ? <RxCross1 size={36}/> : <FiCamera size={36}/> }
                                    {cameraMode ? <p className="btn-label">Cancel</p> : <p className="btn-label">Take Photo</p>}
                                </button>
                                <button className={"upload-btn " + (cameraMode ? "cam-off" : "")} onClick={() => {if (!cameraMode) {fileInputRef.current.click()}}}>
                                    <FiUpload size={36}/>
                                    <p className="btn-label">Upload Photo</p>
                                </button>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        handlePhotoSelected(e)
                                        fileInputRef.current.value = ''
                                    }}
                                    multiple = {false}
                                    ref = {fileInputRef}
                                    hidden
                                />
                            </div>
                        </> :
                        <div className="scan-container">
                            {
                                scanning ? 
                                <>
                                    <p className="scanning-text">Scanning...</p>
                                </>
                                : 
                                <>
                                    {
                                        !results ?
                                        <>
                                            <button className="scan-btn"  onClick={identify}>Scan for Cat</button>
                                        </> :
                                        <>
                                            <p className="percentage">This is <CountUp end={results.results[0]} duration={2} decimals={2} delay={1} suffix="%" className="percentage perc-number"/> Cat!</p>
                                            <p className="funny-sentence">{results.results[2]}</p>
                                            {
                                                adjust ?
                                                <>
                                                    <p className="q">Is what's in front of you a cat?</p>
                                                    <p className="a">Find out at <span className="link">catscan.onrender.com</span></p>
                                                </>:
                                                <>
                                                    <button className={shareFade ? "share-fade" : "share-btn"}  onClick={handleShareClick}>Share your discovery!<br></br>:3</button>
                                                </>

                                            }
                                        </>
                                    }
                                </>
                            }
                            <button className="back-btn" onClick={() => {
                                setPhoto(null)
                                setResults(null)
                                setShareFade(true)
                                }}>
                                <FiArrowLeft size={28} />
                            </button>
                        </div>
                    }
            </InsertPhotoContainer>
        </>
    )
}