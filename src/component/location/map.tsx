import { useEffect, useRef } from "react"
import { useKakao, useKakaoMap } from "../store"
import markerIcon from "../../icons/marker-icon.svg"
import knaviIcon from "../../icons/knavi-icon.png"
import tmapIcon from "../../icons/tmap-icon.png"
import {
  KMAP_PLACE_ID,
  LOCATION,
  NMAP_PLACE_ID,
  WEDDING_HALL_POSITION,
} from "../../const"
import { KAKAO_MAP_APP_KEY } from "../../env"

/**
 * 지도를 표시하고 길찾기 앱(카카오 지도, 카카오 내비, 티맵) 연동 기능을 제공하는 컴포넌트입니다.
 *
 * @returns {JSX.Element} 지도 컴포넌트
 */
export const Map = () => {
  // 카카오 지도 키가 설정되어 있을 때만 지도를 렌더링합니다.
  return KAKAO_MAP_APP_KEY ? <KakaoMap /> : <div>Map is not available</div>
}

/**
 * 카카오 지도를 실제로 렌더링하는 내부 컴포넌트입니다.
 */
const KakaoMap = () => {
  const { kakaoMap, kakaoMapLoadFailed } = useKakaoMap()
  const kakao = useKakao()
  const ref = useRef<HTMLDivElement>(null)

  /**
   * 사용자 기기 종류(iOS, Android 등)를 확인합니다.
   */
  const checkDevice = () => {
    const userAgent = window.navigator.userAgent
    if (userAgent.match(/(iPhone|iPod|iPad)/)) {
      return "ios"
    } else if (userAgent.match(/(Android)/)) {
      return "android"
    } else {
      return "other"
    }
  }

  useEffect(() => {
    // 카카오 지도 SDK가 로드되면 지도를 초기화합니다.
    if (kakaoMap && ref.current) {
      if (
        typeof kakaoMap.maps?.LatLng !== "function" ||
        typeof kakaoMap.maps?.Map !== "function" ||
        typeof kakaoMap.maps?.Marker !== "function"
      ) {
        return
      }

      const mapContainer = ref.current
      const center = new kakaoMap.maps.LatLng(
        WEDDING_HALL_POSITION[1],
        WEDDING_HALL_POSITION[0],
      )
      const map = new kakaoMap.maps.Map(mapContainer, {
        center,
        level: 3,
      })

      // 마커 추가
      new kakaoMap.maps.Marker({
        position: center,
        map,
      })

      return () => {
        mapContainer.replaceChildren()
      }
    }
  }, [kakaoMap])

  return (
    <>
      <div className="map-wrapper">
        {kakaoMapLoadFailed && (
          <button
            className="map-fallback"
            onClick={() => {
              window.open(
                `https://map.kakao.com/link/map/${KMAP_PLACE_ID}`,
                "_blank",
              )
            }}
          >
            카카오 지도에서 위치 보기
          </button>
        )}

        {/* 지도가 렌더링될 실제 요소 */}
        <div className="map-inner" ref={ref}></div>
      </div>

      {/* 내비게이션 앱 연결 버튼 모음 */}
      <div className="navigation">
        {/* 네이버 지도 웹 링크 연동 */}
        <button
          onClick={() => {
            window.open(
              `https://map.naver.com/p/entry/place/${NMAP_PLACE_ID}`,
              "_blank",
            )
          }}
        >
          <img src={markerIcon} alt="naver-map-icon" />
          네이버 지도
        </button>

        {/* 카카오 내비 연동 */}
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android":
                if (kakao)
                  kakao.Navi.start({
                    name: LOCATION,
                    x: WEDDING_HALL_POSITION[0],
                    y: WEDDING_HALL_POSITION[1],
                    coordType: "wgs84",
                  })
                break
              default:
                window.open(
                  `https://map.kakao.com/link/map/${KMAP_PLACE_ID}`,
                  "_blank",
                )
                break
            }
          }}
        >
          <img src={knaviIcon} alt="kakao-navi-icon" />
          카카오 내비
        </button>

        {/* 티맵 연동 */}
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android": {
                const params = new URLSearchParams({
                  goalx: WEDDING_HALL_POSITION[0].toString(),
                  goaly: WEDDING_HALL_POSITION[1].toString(),
                  goalName: LOCATION,
                })
                window.open(`tmap://route?${params.toString()}`, "_self")
                break
              }
              default: {
                alert("모바일에서 확인하실 수 있습니다.")
                break
              }
            }
          }}
        >
          <img src={tmapIcon} alt="t-map-icon" />
          티맵
        </button>
      </div>
    </>
  )
}
