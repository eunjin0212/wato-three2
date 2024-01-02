const kakaoLogin = () => {
  const REST_API_KEY = '79060ef507dce19e3b6659f0b143f623' //REST API KEY
  const redirectUrl = 'https://katalk.store/api/oauth2/authorization/kakao' //Redirect URI
  const scope = 'profile_image,profile_nickname';
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${redirectUrl}&response_type=code&scope=${scope}`
  const handleLogin = () => {
    window.location.href = kakaoURL
  }
  const code = new URL(window.location.href).searchParams.get('code');
  return {
    handleLogin,
    code,
  }
}

export default kakaoLogin