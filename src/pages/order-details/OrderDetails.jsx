import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/page-tittle/PageTitle';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, DropdownButton, Form, Modal } from 'react-bootstrap';
import { FacebookShareCount } from 'react-share';
import apiConfig from '../../config/apiConfig';

const OrderDetails = () => {

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const orderID = params.get("orderID");

    const [orderDetails, setOrderDetails] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [closeModal, setCloseModal] = useState(false);
    const [orderData, setOrderData] = useState();


    const [show, setShow] = useState(false);

    const [itemID, setItemID] = useState();
    const [itemType, setItemType] = useState();
    const [fullorder, setFullOrder] = useState();

    const handleClose = () => setShow(false);
    const handleShow = (id, type, fullorder) => {
        setItemID(id);
        setItemType(type);
        setFullOrder(fullorder);
        setShow(true);
    }
    const handleShowR = (id, type, fullorder) => {
        setItemID(id);
        setItemType(type);
        setFullOrder(fullorder);
        setShowR(true);
    }

    const [showR, setShowR] = useState(false);
    const handleCloseR = () => setShowR(false);
    const [reasons, setReasons] = useState();

    const { showSuccessToastMessage, showInfoToastMessage } = useShoppingCart();
    const navigate = useNavigate();

    useEffect(() => {
        const orderID = params.get("orderID");
        const apiUrl = `https://www.demo609.amrithaa.com/backend-cema/public/api/orders/${orderID}`;

        const token = localStorage.getItem('accessToken');
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.json())
            .then(data => {
                // console.log("Order Deatils", data);
                if (data.success === true) {
                    setOrderData(data);
                    setOrderDetails(data.order);
                    setShowModal(true);
                } else {
                    // showInfoToastMessage('Error in loading details')
                }

            }).catch(error => console.error("Network Fetch Issue", error));

        fetch(apiConfig.returnReasonsAPI, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => response.json()).then(data => {
            setReasons(data.Reason);
        })
    }, [])



    async function cancelOrder(option, id, type, fullorder) {
        if (option === undefined) return showInfoToastMessage('Select valid option')
        const token = localStorage.getItem('accessToken');
        let apiUrl = ''
        if (fullorder === 1) {
            apiUrl = `https://www.demo609.amrithaa.com/backend-cema/public/api/cancelOrders?
        order_id=${orderID}&
        comment=${option}&
        fullorder=${fullorder}`;
        } else if (fullorder === 0) {
            apiUrl = `https://www.demo609.amrithaa.com/backend-cema/public/api/cancelOrders?
            order_id=${orderID}&
            comment=${option}&
            product_id=${id}&
            type=${type}&
            fullorder=${fullorder}`
        }

        return fetch(apiUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    showSuccessToastMessage(data.status);
                    setTimeout(() => {
                        handleClose();
                    }, 1000)
                } else {
                    showInfoToastMessage(data.mg);
                }

            }).catch(error => console.error("Network Fetch Issue", error));
    }

    const Modals = (props) => {
        const { show, handleClose } = props;
        const [option, setOption] = useState();



        return (
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Order Cancellation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {`Why you wish to cancel the order ?`}
                        <br />
                        <Form.Select
                            onChange={(e) => setOption(e.target.value)}
                            aria-label="Default select example">
                            <option>Select from these options</option>
                            {reasons?.map(rea => (
                                <option value={rea.reason}>{rea.reason}</option>
                            ))}

                        </Form.Select>
                        <br />
                        {` Disclaimer !`}<br />
                        {` A product is only eligible for cancellation if approved by the company.`}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => cancelOrder(option, props.itemID, props.itemType, props.fullorder)}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }


    async function returnOrder(comment, id, type, fullorder) {
        let api = '';
        if (fullorder === 1) {
            api = `${apiConfig.returnOrderAPI}?
            order_id=${orderID}&
            comment=${comment}&&
            fullorder=${fullorder}`
        }
        else if (fullorder === 0) {
            api = `${apiConfig.returnOrderAPI}?
            order_id=${orderID}&
            product_id=${id}&
            type=${type}&
            fullorder=${fullorder}&
            comment=${comment}`
        }

        return fetch(api
            ,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(response => response.json()).then(data => {
                if (data.success) {
                    showInfoToastMessage(data.status);
                    setTimeout(() => {
                        handleCloseR();
                    }, 1000)
                } else {
                    showInfoToastMessage(data.msg);
                }
            })
    }
    const ModalsR = (props) => {
        const [comment, setComment] = useState();


        return (<>
            <Modal show={props.showR} onHide={props.handleCloseR}>
                <Modal.Header closeButton>
                    <Modal.Title>Return Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    <Form.Label htmlFor="inputPassword5">Why you wish to return the order ?</Form.Label>
                    <Form.Control
                        type="text"
                        id=""
                        aria-describedby=""
                        onChange={(e) => { setComment(e.target.value) }}
                    />
                    <Form.Text id="" muted>
                        Disclaimer !
                        A product is only eligible for return if approved by the company.
                    </Form.Text>
                    <br />
                    {` `}<br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseR}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => returnOrder(comment, props.itemID, props.itemType, props.fullorder)}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>)
    }
    async function fetchVariant(product_id, variant_id) {
        return fetch(`${apiConfig.productDetailsAPI}/${product_id}/variant?variant_id=${variant_id}&currency=KD`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                const combination = data.data.combination?.filter(comb => comb.id === variant_id);
                const attributes = combination?.variants?.map(attri => attri.var_name);
                console.log(combination, attributes);
            })
    }

    return (
        <div>

            <div id="site-main" className="site-main">
                <div id="main-content" className="main-content">
                    <div id="primary" className="content-area">
                        <PageTitle current={'Order Details'} />

                    </div>
                    <div
                        // classNameName={`modal fade ${showModal ? 'show' : ''}`}
                        style={{ position: 'relative', top: '-50px' }}
                        tabIndex=""
                    // role="dialog"
                    >
                        <div className="" role="">
                            <div className="">

                                <div className="" style={{ height: 'fit-content' }}>
                                    <div style={{ height: '30%', display: 'flex' }}>
                                        <div style={{ width: '50%', padding: '30px' }}>
                                            <div style={{ height: '30%', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid' }}>
                                                <h6 ><strong style={{ fontWeight: '400' }} > Shipping Address</strong></h6>
                                            </div>
                                            <div style={{ margin: '4%', height: '50%', textAlign: 'center', fontSize: '1.1rem' }}>
                                                <h6><strong style={{ fontWeight: '400' }}>{orderDetails?.shipping_address?.name},{' '}{orderDetails?.shipping_address?.phone}</strong></h6>
                                                {orderDetails?.shipping_address?.address},
                                                <br />{orderDetails?.shipping_address?.state},{orderDetails?.shipping_address?.country}
                                                <br />
                                                {orderDetails?.shipping_address?.pin_code}
                                            </div>
                                        </div>
                                        <div style={{ width: '50%', padding: '30px' }}>
                                            <div style={{ height: '30%', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid' }}>
                                                <h6><strong style={{ fontWeight: '400' }} >Billing Address</strong></h6>
                                            </div>
                                            <div style={{ margin: '4%', height: '50%', textAlign: 'center', fontSize: '1.1rem' }}>
                                                <h6><strong style={{ fontWeight: '400' }}>{orderDetails?.billing_address?.name},{' '}{orderDetails?.billing_address?.phone}</strong></h6>
                                                {orderDetails?.billing_address?.address},
                                                <br />{orderDetails?.billing_address?.state},{orderDetails?.billing_address?.country}
                                                <br />
                                                {orderDetails?.billing_address?.pin_code}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ height: '10%', display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
                                        <div style={{ width: '31%', padding: '15px 0 ', backgroundColor: '#f5f5f5', margin: '10px', border: '1px solid' }}>
                                            <h6><strong style={{ fontWeight: '400' }}>Transaction Id</strong></h6><div style={{ wordBreak: 'break-word' }}>{orderDetails?.transaction_id}</div>
                                        </div>
                                        <div style={{ width: '31%', padding: '15px 0 ', backgroundColor: '#f5f5f5', margin: '10px', border: '1px solid' }}>
                                            <h6><strong style={{ fontWeight: '400' }}>Payment Method</strong></h6>{orderDetails?.payment_method}

                                        </div>
                                        <div style={{ width: '31%', padding: '15px 0 ', backgroundColor: '#f5f5f5', margin: '10px', border: '1px solid' }}>
                                            <h6><strong style={{ fontWeight: '400' }}>Date</strong></h6>{orderDetails?.order_date}

                                        </div>
                                        {/* <div style={{ width: '33%' }}> */}
                                        {/* <button style={{ height: '100%' }}>Cancel Order</button> */}
                                        {/* <h6><strong style={{ fontWeight: '400' }}> Order Status</strong></h6>{orderDetails?.order_status?.charAt(0)?.toUpperCase() + orderDetails?.order_status?.slice(1)} */}
                                        {/* </div> */}
                                    </div>
                                    <br />
                                    <div className='row' style={{ display: 'flex', justifyContent: 'center' }}>
                                        {orderDetails?.orderitems?.map(item => (
                                            <>

                                                <div className='col-lg-5 md-12' style={{ border: '1px solid', marginLeft: '10px', backgroundColor: '#f5f5f5', height: '20%', marginBottom: '10px' }}>

                                                    <div style={{}}>
                                                        <div style={{ margin: '4%', height: '70%', display: 'flex' }}>
                                                            <div style={{ width: '50%', display: 'flex' }}>
                                                                <div style={{ width: 'fit-content', color: '#f5f5f5' }}>
                                                                    <img
                                                                        src={item?.thumb_path + '/' + item?.product_thumb}
                                                                        style={{ border: '1px solid', width: '100px', height: '100px', objectFit: 'contain' }}
                                                                    />
                                                                </div>
                                                                <div style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                                    <h6>{item?.product_name?.en}{' '}{item?.variant ? fetchVariant(item?.item_id, item?.variant) : ''}</h6>

                                                                    Qty: {item?.qty}
                                                                </div>
                                                            </div>
                                                            <div style={{
                                                                // border: '1px solid',
                                                                width: '30%',
                                                                marginLeft: '10px',
                                                                display: 'flex'
                                                            }}>
                                                                <div style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    flexDirection: 'column'
                                                                }}
                                                                >
                                                                    <h6>KD {item?.price}</h6>
                                                                    {item.status}
                                                                </div>
                                                                {
                                                                    item.status === 'Shipped' ?
                                                                        <div style={{}}>
                                                                            {item.courier_channel}<br />
                                                                            {item.tracking_id}<br />
                                                                            {item.exp_delivery_date}
                                                                        </div>
                                                                        :
                                                                        item?.eligible_cancel ?
                                                                            <div>
                                                                                <button style={{
                                                                                    position: 'relative',
                                                                                    top: '25%',
                                                                                    left: '100%'
                                                                                }}
                                                                                    onClick={() => handleShow(item.item_id, item.item_type, 0)}
                                                                                >Cancel Item</button>
                                                                            </div> :
                                                                            item?.eligible_return ?
                                                                                <div>
                                                                                    <button style={{
                                                                                        position: 'relative',
                                                                                        top: '25%',
                                                                                        left: '100%'
                                                                                    }}
                                                                                        onClick={() => handleShowR(item.item_id, item.item_type, 0)}
                                                                                    >Return Item</button>
                                                                                </div> : ''
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </div>

                                    <br />
                                    <div style={{ backgroundColor: '#f5f5f5', margin: '0 2% 0 2%', border: '1px solid' }}>
                                        <div style={{ margin: '', display: 'flex', padding: '20px', }}>
                                            <div style={{ flexGrow: '1' }}>
                                                <ul>
                                                    <li>
                                                        <h6><strong style={{ fontWeight: '400' }}>Order Quantity:</strong> {orderDetails?.total_qty}</h6>
                                                    </li>
                                                    <li>
                                                        <h6><strong style={{ fontWeight: '400' }}>Total:</strong> KD {orderDetails?.subtotal}</h6>{' '}
                                                    </li>
                                                </ul>
                                            </div>
                                            <div style={{ flexGrow: '0', position: 'relative', top: '25px' }}>
                                                {orderDetails?.eligible_cancel ?
                                                    <button
                                                        onClick={() => handleShow(0, 0, 1)}
                                                    >Cancel Order</button> :
                                                    orderDetails?.eligible_return ?
                                                        <button
                                                            onClick={() => handleShowR(0, 0, 1)}
                                                        >Return Order</button> : ''
                                                }
                                                {/* <button
                                                    onClick={() => handleShowR()}
                                                >Return Order</button> */}
                                            </div>
                                            <div>
                                                <Modals show={show} handleClose={handleClose} itemID={itemID} itemType={itemType} fullorder={fullorder} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
                <ModalsR showR={showR} itemID={itemID} itemType={itemType} fullorder={fullorder} handleCloseR={handleCloseR} />
            </div>

        </div >

    )
}

export default OrderDetails