/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext, useEffect } from "react"
import { StoreContext } from "./context"
import { KAKAO_MAP_APP_KEY, KAKAO_SDK_JS_KEY } from "../../env"

const baseUrl = import.meta.env.BASE_URL

// 카카오 지도 및 카카오 SDK를 로드하기 위한 외부 스크립트 URL
const KAKAO_MAP_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&autoload=false`
const KAKAO_SDK_URL = `${baseUrl}/kakao_js_sdk/2.7.1/kakao.min.js`

/**
 * 카카오 지도 SDK를 로드하고 사용할 수 있게 해주는 Hook입니다.
 *
 * @returns {any} 카카오 지도 SDK 객체 (로딩 전에는 null)
 */
export const useKakaoMap = () => {
  const {
    kakaoMap,
    setKakaoMap,
    kakaoMapLoadFailed,
    setKakaoMapLoadFailed,
  } = useContext(StoreContext)
  useEffect(() => {
    // SDK 키가 없으면 중단
    if (!KAKAO_MAP_APP_KEY) {
      return
    }

    const setLoadedMap = () => {
      setKakaoMapLoadFailed(false)
      setKakaoMap((window as any).kakao)
    }

    const loadMap = () => {
      const kakaoMapSdk = (window as any).kakao
      if (!kakaoMapSdk?.maps?.load) {
        setKakaoMapLoadFailed(true)
        return
      }

      kakaoMapSdk.maps.load(setLoadedMap)
    }

    if ((window as any).kakao?.maps) {
      loadMap()
      return
    }

    // 스크립트가 아직 로드되지 않았으면 동적으로 추가
    if (!document.querySelector(`script[src="${KAKAO_MAP_URL}"]`)) {
      const script = document.createElement("script")
      script.src = KAKAO_MAP_URL
      script.addEventListener("load", loadMap)
      script.addEventListener("error", () => {
        setKakaoMapLoadFailed(true)
      })
      document.head.appendChild(script)
    }
  }, [setKakaoMap, setKakaoMapLoadFailed])

  return { kakaoMap, kakaoMapLoadFailed }
}

/**
 * 카카오 SDK를 로드하고 사용할 수 있게 해주는 Hook입니다.
 *
 * @returns {any} 카카오 SDK 객체 (로딩 전에는 null)
 */
export const useKakao = () => {
  const { kakao, setKakao } = useContext(StoreContext)
  useEffect(() => {
    // SDK 키가 없으면 중단
    if (!KAKAO_SDK_JS_KEY) {
      return
    }

    // 스크립트가 아직 로드되지 않았으면 동적으로 추가
    if (!document.querySelector(`script[src="${KAKAO_SDK_URL}"]`)) {
      const script = document.createElement("script")
      script.addEventListener("load", () => {
        // 카카오 SDK 초기화
        if (!(window as any).Kakao.isInitialized()) {
          ;(window as any).Kakao.init(KAKAO_SDK_JS_KEY)
        }
        setKakao((window as any).Kakao)
      })
      script.src = KAKAO_SDK_URL
      document.head.appendChild(script)
    }
  }, [setKakao])

  return kakao
}
