import React        from 'react';
import MUtil        from 'util/mm.jsx'
import Order        from 'service/order-service.jsx'
import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';

const _mm           = new MUtil();
const _order        = new Order();

class ModelManagement extends React.Component{
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
        
        let receiverInfo = this.state.orderInfo.shippingVo      || {},
            productList  = this.state.orderInfo.orderItemVoList || [];
        let tableHeads = [
            {name: '商品图片', width: '10%'},
            {name: '商品信息', width: '45%'},
            {name: '单价', width: '15%'},
            {name: '数量', width: '15%'},
            {name: '合计', width: '15%'}
        ];
        return (
            <div id="page-wrapper" style={{padding:"0"}}>
                {/* <div class="form-group">
                    <label for="exampleInputName2">Name</label>
                    <input type="text" class="form-control" id="exampleInputName2" placeholder="Jane Doe" />
                </div> */}
                {/* <div className="container" style={{marginLeft:"100px",marginRight:"100px"}}>
                    <div className="row">
                        <div className="span6">
                            <ul className="nav nav-tabs">
                                <li className="active"><a href="#">焊接首页</a></li>
                                <li><a href="#1">所有焊点</a></li>
                                <li><a href="#2">工艺参数模板编辑</a></li>
                                <li><a href="#3">工艺参数范围编辑</a></li>
                                <li><a href="#4">工艺参数</a></li>
                            </ul>
                        </div>
                    </div>
                </div> */}
                <nav class="navbar navbar-inverse" role="navigation">
                    <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">车型管理</a>
                    </div>
                    <div>
                        <ul class="nav navbar-nav">
                            <li class="active"><a href="#">车型首页</a></li>
                            <li><a href="#">焊接首页</a></li>
                            <li><a href="#">工艺参数模板编辑</a></li>
                            <li><a href="#">工艺参数范围编辑</a></li>
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    工艺参数 <b class="caret"></b>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a href="#">工艺参数详情</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    </div>
                </nav>
                <div class="row">
                    <div class="col-md-4">
                        <p style={{marginLeft:"40px"}}><h3>辅助查找:</h3></p>
                        <p style={{marginLeft:"40px",marginTop:"30px"}}><h4>生产线:</h4></p>
                        <select class="form-control input-sm" style={{marginLeft:"40px",width:"300px"}}>
                            <option>总拼一线</option>
                            <option>总拼二线</option>
                            <option>总拼三线</option>
                        </select>
                        <p style={{marginLeft:"40px",marginTop:"30px"}}><h4>工位:</h4></p>
                        <select class="form-control input-sm" style={{marginLeft:"40px",width:"300px"}}>
                            <option>AFO 5230R07</option>
                            <option>AFO 5230R08</option>
                            <option>AFO 5230R09</option>
                        </select>
                        <p style={{marginLeft:"40px",marginTop:"30px"}}><h4>焊钳号:</h4></p>
                        <select class="form-control input-sm" style={{marginLeft:"40px",width:"300px"}}>
                            <option>C3-59D 158 380-136</option>
                            <option>C3-59D 158 380-137</option>
                            <option>C3-59D 158 380-138</option>
                        </select>
                        <p style={{marginLeft:"40px",marginTop:"30px"}}><h4>IP:</h4></p>
                        <input class="form-control input-sm" type="text" placeholder="请输入IP" style={{marginLeft:"40px",width:"300px"}} />
                        <div style={{width:"300px",marginTop:"30px",marginLeft:"40px",borderBottom:"1px #222 solid"}} ></div>
                        {/* <div>
                            <a><h4 style={{marginLeft:"40px",marginTop:"30px"}}>工艺参数限制>>></h4></a>
                            <a><h4 style={{marginLeft:"40px",marginTop:"30px"}}>工艺模板>>></h4></a>
                        </div> */}
                    </div>
                    <div class="col-md-8"> 
                        <p style={{marginLeft:"40px"}}><h3>焊接机器人概览:</h3></p>
                        <img style={{marginTop:"50px"}} src="../../gift/image/Test1.jpg"></img>
                    </div>
                </div>
                
               {/* <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单号</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">创建时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.createTime}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">收件人</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {receiverInfo.receiverName}，
                                {receiverInfo.receiverProvince} 
                                {receiverInfo.receiverCity} 
                                {receiverInfo.receiverAddress} 
                                {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
                            </p>
                        </div>
                    </div> 
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单状态</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.statusDesc}
                                {
                                    this.state.orderInfo.status === 20
                                    ? <button className="btn btn-default btn-sm btn-send-goods"
                                        onClick={(e) => {this.onSendGoods(e)}}>立即发货</button>
                                    : null
                                }
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">支付方式</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.paymentTypeDesc}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单金额</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                ￥{this.state.orderInfo.payment}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品列表</label>
                        <div className="col-md-10">
                            <TableList tableHeads={tableHeads}>
                                {
                                    productList.map((product, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <img className="p-img"  alt={product.productName}
                                                        src={`${this.state.orderInfo.imageHost}${product.productImage}`}/>
                                                </td>
                                                <td>{product.productName}</td>
                                                <td>￥{product.currentUnitPrice}</td>
                                                <td>{product.quantity}</td>
                                                <td>￥{product.totalPrice}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </TableList>
                        </div>
                    </div>
                            </div>*/}
            </div>
        )
    }
}
export default ModelManagement;