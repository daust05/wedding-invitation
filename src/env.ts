/**
 * 카카오 SDK 자바스크립트 키
 * .env 파일의 VITE_KAKAO_SDK_JS_KEY에서 가져오며,
 * 카카오 지도 및 카카오톡 공유 SDK에서 함께 사용합니다.
 */
export const KAKAO_SDK_JS_KEY = import.meta.env.VITE_KAKAO_SDK_JS_KEY

/**
 * 카카오 지도 자바스크립트 키
 * 별도 설정이 없으면 카카오 SDK 자바스크립트 키를 함께 사용합니다.
 */
export const KAKAO_MAP_APP_KEY =
  import.meta.env.VITE_KAKAO_MAP_APP_KEY || KAKAO_SDK_JS_KEY

/**
 * 백엔드 서버 URL (방명록 기능 등에 사용)
 * .env 파일의 VITE_SERVER_URL에서 가져옵니다.
 */
export const SERVER_URL = import.meta.env.VITE_SERVER_URL

/**
 * 정적 페이지 모드 여부
 * GitHub Pages 정적 배포에서는 서버 연동 기능(방명록 등)을 비활성화합니다.
 */
export const STATIC_ONLY = true
