/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext } from "react"

/**
 * 카카오 SDK 객체를 전역적으로 공유하기 위한 Context입니다.
 */
export const StoreContext = createContext({
  /** 카카오 지도 SDK 객체 */
  kakaoMap: null as any,
  /** 카카오 지도 SDK 객체 설정 함수 */
  setKakaoMap: (() => {}) as (kakaoMap: any) => void,
  /** 카카오 지도 SDK 로드 실패 여부 */
  kakaoMapLoadFailed: false,
  /** 카카오 지도 SDK 로드 실패 여부 설정 함수 */
  setKakaoMapLoadFailed: (() => {}) as (failed: boolean) => void,
  /** 카카오 SDK 객체 */
  kakao: null as any,
  /** 카카오 SDK 객체 설정 함수 */
  setKakao: (() => {}) as (kakao: any) => void,
})
