import * as mobilenet from "@tensorflow-models/mobilenet"
import * as tf from "@tensorflow/tfjs"
import {loadGraphModel} from '@tensorflow/tfjs-converter'
import { useEffect, useRef, useState } from "react" 
import styled from "@emotion/styled"
import cat from "./cat.jpg"

const TestContainer = styled.div`
    
`

export default function Test() {
    const [isLoading, setIsLoading] = useState(false)
    const [model, setModel] = useState(null)
    const imageRef = useRef()

    const loadModel = async () => {
        setIsLoading(true)
        try {
            const loadedModel = await mobilenet.load()
            setModel(loadedModel)

            const myModel = await loadGraphModel("./model.json")

            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const identify = async () => {
        const results = await model.classify(imageRef.current)
        console.log(results)
    }

    useEffect(() => {
        loadModel()
    }, [])

    return(
        <>
        <TestContainer>
            <h1>Image Identification</h1>
            <div className="inputHolder">
                <img className="cat-img" src={cat} alt="cat-img" ref={imageRef}/>
            </div>
            <button type="button" onClick={identify}>Identify Image</button>
            {
                isLoading ? <h2>Model Loading...</h2> :
                <></>
            }
        </TestContainer>
        </>
    )
}