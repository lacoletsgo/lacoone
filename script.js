document.addEventListener("DOMContentLoaded", () => {
  // 1) 현재 기준 날짜(key) 계산 (매일 오전 6시에 '하루'가 바뀝니다)
  const now = new Date();
  let ref = new Date(now);
  if (now.getHours() < 6) {
    // 오전 6시 이전은 '어제' 날짜로 취급
    ref.setDate(ref.getDate() - 1);
  }
  const todayKey = ref.toISOString().split("T")[0]; // "YYYY-MM-DD"

  // 2) 마지막 초기화된 날짜와 비교
  const lastReset = localStorage.getItem("lastResetDate");
  if (lastReset !== todayKey) {
    // 'check-' 로 시작하는 모든 항목 초기화
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith("check-")) localStorage.removeItem(k);
    });
    localStorage.setItem("lastResetDate", todayKey);
  }

  // 3) 페이지 내 모든 체크박스 로드 & 이벤트 바인딩
  document.querySelectorAll("input[type=checkbox]").forEach((cb) => {
    const key = "check-" + cb.id;
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      cb.checked = saved === "true";
    }
    cb.addEventListener("change", () => {
      localStorage.setItem(key, cb.checked);
    });
  });
});
