import React        from 'react';
import MUtil        from 'util/mm.jsx'
import User         from 'service/user-service.jsx'

const _mm   = new MUtil();
const _user = new User();

import './index.scss';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _mm.getUrlParam('redirect') || '/'
        }
    }
    componentWillMount(){
        document.title = '登录 - MMALL ADMIN';
    }
    // 当用户名发生改变
    onInputChange(e){
        let inputValue  = e.target.value,
            inputName   = e.target.name;
        this.setState({
            [inputName] : inputValue
        });
    }
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }
    // 当用户提交表单
    onSubmit(){
        let loginInfo = {
                username : this.state.username,
                password : this.state.password
            },
            checkResult = _user.checkLoginInfo(loginInfo);
        // 验证通过
        if(checkResult.status){
            _user.login(loginInfo).then((res) => {
                _mm.setStorage('userInfo', res);
                this.props.history.push(this.state.redirect);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
        // 验证不通过
        else{
            _mm.errorTips(checkResult.msg);
        }
            
    }
    render(){
        return (
            <div className="row">
                <div style={{width:"100%",height:"60px",backgroundColor:"#7FFFD4"}}>
                <span><img src="../../gift/image/favicon.ico" height="60" width="60" style={{marginLeft:"20px"}}></img>
                   <h3 style={{marginTop:"-40px",marginLeft:"110px",paddingLeft:"20px"}}>工艺管理系统</h3></span>
                </div>
                    <h1 align="center" style={{marginTop:"70px",fontSize:"16"}}>工艺管理系统</h1>
                    <div className="col-md-6" style={{paddingTop:"100px"}}>
                        <img src="../../gift/image/login.png" style={{marginTop:"80px",marginLeft:"200px"}}></img>
                    </div>
                    <div className="col-md-4" style={{marginTop:"35px"}}>
                        <div className="panel panel-default login-panel">
                            <div className="panel-heading" style={{align:"middle"}}>欢迎登录 - 工艺管理系统</div>
                            <div className="panel-body">
                                <div>
                                    <div className="form-group">
                                        <input type="text"
                                            name="username"
                                            className="form-control"
                                            placeholder="请输入用户名" 
                                            onKeyUp={e => this.onInputKeyUp(e)}
                                            onChange={e => this.onInputChange(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" 
                                            name="password"
                                            className="form-control" 
                                            placeholder="请输入密码" 
                                            onKeyUp={e => this.onInputKeyUp(e)}
                                            onChange={e => this.onInputChange(e)}/>
                                    </div>
                                    <label>
                                        <input align="center" type="checkbox"/>记住密码
                                    </label>
                                    <span>
                                    <button className="btn btn-lg btn-primary btn-block"
                                        onClick={e => {this.onSubmit(e)}}>登录</button>
                                    <button className="btn btn-lg btn-success btn-block">
                                        帮助
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>

        );
    }
}

export default Login;