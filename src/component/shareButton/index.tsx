import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  LOCATION_ADDRESS,
  SHARE_ADDRESS,
  SHARE_ADDRESS_TITLE,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import ktalkIcon from "../../icons/ktalk-icon.png"
import { LazyDiv } from "../lazyDiv"
import { useKakao } from "../store"

const baseUrl = import.meta.env.BASE_URL
const previewImagePath = "preview_image.png?v=20260811"

const getShareUrl = (path = "") => {
  return new URL(`${baseUrl}${path}`, window.location.origin).toString()
}

/**
 * 카카오톡으로 초대장을 공유할 수 있는 버튼 컴포넌트입니다.
 *
 * @returns {JSX.Element} 공유 버튼 섹션
 */
export const ShareButton = () => {
  const kakao = useKakao()
  return (
    <LazyDiv className="footer share-button">
      <button
        className="ktalk-share"
        onClick={() => {
          // 카카오 SDK 로드 전이면 무시
          if (!kakao?.Share) {
            alert("카카오톡 공유 기능을 준비 중입니다. 잠시 후 다시 눌러주세요.")
            return
          }

          // 카카오톡 공유 전송 (위치 기반 템플릿 사용)
          kakao.Share.sendDefault({
            objectType: "location",
            address: SHARE_ADDRESS || LOCATION_ADDRESS,
            addressTitle: SHARE_ADDRESS_TITLE,
            content: {
              title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
              description:
                WEDDING_DATE.format(WEDDING_DATE_FORMAT) + "\n" + LOCATION,
              imageUrl: getShareUrl(previewImagePath),
              link: {
                mobileWebUrl: getShareUrl(),
                webUrl: getShareUrl(),
              },
            },
            buttons: [
              {
                title: "초대장 보기",
                link: {
                  mobileWebUrl: getShareUrl(),
                  webUrl: getShareUrl(),
                },
              },
            ],
          })
        }}
      >
        <img src={ktalkIcon} alt="ktalk-icon" /> 카카오톡으로 공유하기
      </button>
    </LazyDiv>
  )
}
