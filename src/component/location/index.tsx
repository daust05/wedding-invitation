import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

/**
 * 오시는 길 정보를 표시하는 컴포넌트입니다.
 * 지도와 대중교통, 자가용 이용 방법을 안내합니다.
 *
 * @returns {JSX.Element} 오시는 길 섹션
 */
export const Location = () => {
  return (
    <>
      {/* 지도 및 주소 섹션 */}
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>

      {/* 대중교통 및 자가용 안내 섹션 */}
      <LazyDiv className="card location">
        {/* 대중교통 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
            * 지하철 및 셔틀버스 이용 시
            <br />
            인천 2호선 <b>아시아드경기장역 3번 출구</b>
            <br />
            → 아시아드경기장역 3번 출구 앞 셔틀버스 승차
            <br />
            → 셔틀버스 운행: 정각 / 20분 / 40분
            <br />
            → 인천아시아드웨딩컨벤션 하차
            <br />
            공항철도 이용 시 검암역에서 인천 2호선 환승 후
            <br />
            아시아드경기장역 3번 출구를 이용해 주세요.
          </div>
          <div />
          <div className="content">
            * 버스 이용 시
            <br />
            <b>우성아파트</b> 또는 <b>인천아시아드주경기장 동문</b>
            <br />
            정류장에서 하차 후
            <br />
            인천아시아드주경기장 <b>3번 게이트</b> 방향으로
            <br />
            이동해 주세요.
            <br />
            주요 노선: 24-1, 70, 111, 111B, 302, 310,
            <br />
            3-2, 71, 인천e음86
          </div>
        </div>

        {/* 자가용 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            네이버 지도, 카카오 네비, 티맵 등 이용
            <br />
            <b>인천아시아드웨딩컨벤션</b> 검색
            <br />
            <br />
            - 주차 요금은 무료입니다.
            <br />
          </div>
          <div />
          <div className="content">
            <b>
            </b>
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
