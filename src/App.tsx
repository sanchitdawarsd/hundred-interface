import React, { useState, useEffect } from 'react'
import {lightTheme, darkTheme, Theme} from './theme'
import './App.css';
import { Network } from './networks'
import Spinner from './Components/Spinner/spinner';
import ReactToolTip from 'react-tooltip'
import 'react-toastify/dist/ReactToastify.css'
import { BigNumber } from './bigNumber';
import { AirdropType } from './Components/AirdropButton/airdropButton';
import Buffer from "buffer"
import { MyUiContext } from './Types/uiContext';
import { MyGlobalContext } from './Types/globalContext';
import { XFI } from './Connectors/xdefi-connector/declarations';
import useWindowSize from './hooks/useWindowSize';
import Hundred from './Hundred/Views/hundred';
import { toast } from 'react-toastify';

declare global {
  interface Window {
    ethereum: any
    xfi?: XFI
  }
}

global.Buffer = window.Buffer || Buffer.Buffer

const App: React.FC = () => {
  const [address, setAddress] = useState<string>("")
  const [hundredBalance, setHundredBalance] = useState<BigNumber | null>(null)
  const [hndBalance, setHndBalance] = useState<BigNumber | null>(null)
  const [hndEarned, setHndEarned] = useState<BigNumber |null>(null)
  const [vehndBalance, setVehndBalance] = useState<BigNumber | null>(null)
  const [hndRewards, setHndRewards] = useState<BigNumber | null>(null)
  const [gaugeAddresses, setGaugeAddresses] = useState<string[] | null>(null)
  const [network, setNetwork] = useState<Network | null>(null)
  const [hndPrice, setHndPrice] = useState<number>(0)
  const [hasClaimed, setHasClaimed] = useState<boolean>(false)
  const [airdrops, setAirdrops] = useState<AirdropType[]>([])
  const [updateEarned, setUpdateEarned] = useState<boolean>(false)

  const [sideMenu, setSideMenu] = useState<boolean>(false)
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [spinnerVisible, setSpinnerVisible] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [theme, setTheme] = useState<Theme>(lightTheme)
  const [openAddress, setOpenAddress] = useState<boolean>(false)
  const [openNetwork, setOpenNetwork] = useState<boolean>(false)
  const [openHundred, setOpenHundred] = useState<boolean>(false)
  const [openAirdrop, setOpenAirdrop] = useState<boolean>(false)
  const [airdropSpinner, setAirdropSpinner] = useState<boolean>(false)
  const [switchModal, setSwitchModal] = useState(false)
  const [scale, setScale] = useState(false)

  useWindowSize()
  
  useEffect(() => {
    setShow(true)

    const darkmode = window.localStorage.getItem("hundred-darkmode")

    if(darkmode && darkmode === "dark")
      setDarkMode(true)
    else
      setDarkMode(false)
  }, [])

  useEffect(() => {
    if(darkMode){
      window.localStorage.setItem("hundred-darkmode", "dark")
      setTheme(darkTheme)
    }
    else{
      window.localStorage.setItem("hundred-darkmode", "light")
      setTheme(lightTheme)
    }
  }, [darkMode])

  const toastError = (error: string, autoClose = true, closeDelay = 10000) => {
    toast.error(error, {
      position: "top-right",
      autoClose: autoClose ? closeDelay : false,
      hideProgressBar: autoClose ? false : true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: true
      });
  }

  const toastSuccess = (message: string, autoClose = true, closeDelay = 10000) => {
    toast.success(message, {
      position: "top-right",
      autoClose: autoClose ? closeDelay : false,
      hideProgressBar: autoClose ? false : true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: true
      });
  }

  return (
    theme ?
    <MyGlobalContext.Provider value={({network, setNetwork,
                                       address, setAddress,
                                       hndPrice, setHndPrice,
                                       hasClaimed, setHasClaimed,
                                       airdrops, setAirdrops,
                                       hndBalance, setHndBalance,
                                       hndEarned, setHndEarned,
                                       hundredBalance, setHundredBalance,
                                       vehndBalance, setVehndBalance,
                                       hndRewards, setHndRewards,
                                       updateEarned, setUpdateEarned,
                                       gaugeAddresses, setGaugeAddresses})}>
        <MyUiContext.Provider value={({sideMenu, setSideMenu,
                                    darkMode, setDarkMode,
                                    spinnerVisible, setSpinnerVisible,
                                    isMobile, setIsMobile,
                                    isTablet, setIsTablet,
                                    show, setShow,
                                    theme, setTheme,
                                    openAddress, setOpenAddress,
                                    openNetwork, setOpenNetwork,
                                    openHundred, setOpenHundred,
                                    openAirdrop, setOpenAirdrop,
                                    airdropSpinner, setAirdropSpinner,
                                    toastSuccessMessage: toastSuccess, toastErrorMessage: toastError,
                                    switchModal, setSwitchModal,
                                    scale, setScale})}>
          <div id="app" className={`App scroller ${darkMode ? "dark-theme" : ""}`}>
            <Hundred/>
            <ReactToolTip id="tooltip" effect="solid"/>
            <Spinner/>
          </div>
        </MyUiContext.Provider>
    </MyGlobalContext.Provider>
    : <div className="App">
      </div>
  )
}

export default App;
