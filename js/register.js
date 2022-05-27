(() => {
  let isRepeat = false;
  /* 创建程序的入口函数 */
  const init = () => {
    initEvnet();
  };

  /* 定义事件入口函数 */
  const initEvnet = () => {
    userName.addEventListener('blur', onUserNameBlur);
    formContainer.addEventListener('submit', onFormSubmit);
  };

  /* 注册提交事件 */
  const onFormSubmit = (e) => {
    /* 阻止默认事件 */
    e.preventDefault();
    /* 表单项的收集 */
    const loginId = userName.value.trim();
    const nickname = userNickname.value.trim();
    const loginPwd = userPassword.value.trim();
    const confirmPwd = userConfirmPassword.value.trim();
    /* 表单验证操作 */
    if (!checkForm(loginId, nickname, loginPwd, confirmPwd)) return;
    // 请求数据
    sendData(loginId, nickname, loginPwd);
  };

  /* 创建数据请求函数 */
  const sendData = async (loginId, nickname, loginPwd) => {
    const res = await fethcFn({
      url: '/user/reg',
      method: 'POST',
      params: { loginId, nickname, loginPwd },
    });

    res && window.location.replace(baseURL);
  };

  /* 定义验证函数 */
  const checkForm = (loginId, nickname, loginPwd, confirmPwd) => {
    switch (true) {
      case !loginId:
        window.alert('注册用户名不能为空');
        return;
      case !nickname:
        window.alert('昵称不能为空');
        return;
      case !loginPwd:
        window.alert('注册密码不能为空');
        return;
      case !confirmPwd:
        window.alert('确认密码不能为空');
        return;
      case loginPwd !== confirmPwd:
        window.alert('两次输入的密码不一致');
        return;
      case isRepeat:
        window.alert('账户名已经注册过，请更换注册名称');
      default:
        return true;
    }
  };

  /* 创建账户名失去焦点的事件函数 */
  const onUserNameBlur = async () => {
    /* 获取输入的账户的value值 */
    const loginId = userName.value.trim();
    /* 如果是空的信息（value值）不做任何的操作 */
    if (!loginId) return;

    const res = await fethcFn({
      url: '/user/exists',
      method: 'GET',
      params: { loginId },
    });
    isRepeat = res;
  };
  init();
})();
