import React        from 'react';
// import MUtil        from 'util/mm.jsx'
// import Order        from 'service/order-service.jsx'
// import PageTitle    from 'component/page-title/index.jsx';
// import TableList    from 'util/table-list/index.jsx';

// const _mm           = new MUtil();
// const _order        = new Order();

class ProcessDesign extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderNumber : this.props.match.params.orderNumber,
            orderInfo   : {}
        }
    }
    componentDidMount(){
        // this.loadOrderDetail();
    }
    // 加载商品详情
    loadOrderDetail(){
        _order.getOrderDetail(this.state.orderNumber).then((res) => {
            this.setState({
                orderInfo : res
            });
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        });
    }
    // 发货操作
    onSendGoods(){
        if(window.confirm('是否确认该订单已经发货？')){
            _order.sendGoods(this.state.orderNumber).then((res) => {
                _mm.successTips('发货成功');
                this.loadOrderDetail();
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
    }
    render(){
        return (
            <div id="page-wrapper" style={{padding:"0"}}>
                 <nav class="navbar navbar-inverse" role="navigation">
                    <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">流程</a>
                    </div>
                    <div>
                        <ul class="nav navbar-nav">
                            <li class="active"><a href="#">流程首页</a></li>
                            <li><a href="#">流程修改</a></li>
                            <li><a href="#">流程新建</a></li>
                        </ul>
                    </div>
                    </div>
                </nav>
                <div>
                    <p style={{marginLeft:"40px"}}><h3>流程搜索:</h3></p>
                        <input style={{width:"800px",marginLeft:"40px",marginTop:"30px"}} class="form-control input-sm" type="text" placeholder="请输入流程"/>
                        <span>
                        <button type="button" class="btn btn-primary">搜索</button>
                        <button type="button" class="btn btn-default">重置</button>
                        <button type="button" class="btn btn-primary">增加部件</button>
                    </span>
                </div>
            </div>
        )
    }
}
export default ProcessDesign;