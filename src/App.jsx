import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import catscan2x from './assets/catscan2x.png'
import styled from '@emotion/styled'
import { Outlet, NavLink } from 'react-router'
import * as mobilenet from "@tensorflow-models/mobilenet"
import * as cocossd from "@tensorflow-models/coco-ssd"
import InsertPhoto from './components/insertPhoto'
import * as tf from "@tensorflow/tfjs"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useSelector, useDispatch } from 'react-redux'
import { selectLoadedModels } from './redux.js/loadedModelsSlice'
import { setAnimalsModel, setMyModel, setCocossdModel } from './redux.js/loadedModelsSlice'

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 98vh;
  footer {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    margin-top: auto;
    color: #cb997e;
  }

  footer > p {
    font-family: "Roboto Mono", monospace;
    font-size: 16px;
    font-weight: bold;
  }

  .about-btn {
    color: #666D5A;
    font-weight: bold;
    text-decoration: 'none';
  }
  .about-btn:hover {
    cursor: pointer;
    color: #4a4e42;
  }
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .loading img {
    width: auto;
    height: auto;
    max-width: 100%; /* Ensures image doesn't grow */
  }
  .loading-icon {
    margin-top: 5vh;
    color: #cb997e;
    font-size: 1.5rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  NavLink {
    text-decoration: none;
  }
`

function App({ children }) {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [cocossdModel, setCocossdModel] = useState(null)
  const [myModel, setMyModel] = useState(null)
  const [animalsModel, setAnimalsModel] = useState(null)
  const loadedModels = useSelector(selectLoadedModels)

  const loadModel = async () => {
    setIsLoading(true)
    try {
      // COMMENTED OUT FOR TESTING
      
      const loadedCocossdModel = await cocossd.load()
      setCocossdModel(loadedCocossdModel)
      // dispatch(setCocossdModel(loadedCocossdModel))

      const loadedMyModel = await tf.loadLayersModel('https://teachablemachine.withgoogle.com/models/kl_Xo84Ur/model.json')
      setMyModel(loadedMyModel)
      // dispatch(setMyModel(loadedMyModel))

      const loadedAnimalsModel = await tf.loadLayersModel('https://teachablemachine.withgoogle.com/models/BimX15jti/model.json')
      setAnimalsModel(loadedAnimalsModel)
      // dispatch(setAnimalsModel(loadedAnimalsModel))

      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadModel()
  }, [])

  return (
    <>
      <AppContainer>
        { isLoading ?
          <>
            <div className='loading'>
              <img src={catscan2x} alt='catscan-logo'/>
              <AiOutlineLoading3Quarters className='loading-icon'/>
            </div>
          </> :
          <>
            {children || <Outlet context={{ cocossdModel, myModel, animalsModel }}/>}
            <footer>
              <p>Created by Cao Duy Nguyen</p>
              <NavLink to='/about' className='about-btn' style={{ textDecoration: 'none' }}>About</NavLink>
            </footer>
          </>
        }
      </AppContainer>
    </>
  )
}

export default App
