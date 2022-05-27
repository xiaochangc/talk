(() => {
  /* 定义入口函数 */
  const init = () => {
    initEvent();
  };

  const initEvent = () => {
    /* 所有的事件都在这个里面进行绑定 */
    formContainer.addEventListener('submit', onFormSubmitClick);
  };

  /* 创建form表单的事件函数 */
  const onFormSubmitClick = (e) => {
    /* 组织form表单的默认行为 */
    e.preventDefault();
    /* 获取表单数据 */
    const loginId = userName.value.trim();
    const loginPwd = userPassword.value.trim();
    /* 进行表单数据的发送 */
    if (!loginId || !loginPwd) {
      window.alert('用户名或密码不能为空');
    }
    sendData(loginId, loginPwd);
  };

  /* 创建数据发送函数 */
  const sendData = async (loginId, loginPwd) => {
    const res = await fethcFn({
      url: '/user/login',
      method: 'POST',
      params: { loginId, loginPwd },
    });
    res && window.location.replace(baseURL);

    // const res = await fetch('https://study.duyiedu.com/api/user/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ loginId, loginPwd })
    // })
    // const result = await  res.json()

    // if(result.code !== 0) {
    //   window.alert(result.msg)
    //   return
    // }
    // window.location.replace('/')
  };

  init();
})();
