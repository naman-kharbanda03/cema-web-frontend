import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/page-tittle/PageTitle';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useNavigate } from 'react-router-dom';

const OrderDetails = () => {

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const orderID = params.get("orderID");

    const [orderDetails, setOrderDetails] = useState({})
    const [showModal, setShowModal] = useState(true);
    const [closeModal, setCloseModal] = useState(false);
    const [orderData, setOrderData] = useState();

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
    }, [])

    async function cancelOrder() {
        const apiUrl = `https://www.demo609.amrithaa.com/backend-cema/public/api/cancelOrders/${orderID}`;

        const token = localStorage.getItem('accessToken');
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    showSuccessToastMessage(data.status);
                    setTimeout(() => {
                        navigate('/account');
                    }, 1500)
                } else {
                    showInfoToastMessage(data.mg);
                }

            }).catch(error => console.error("Network Fetch Issue", error));
    }

    return (
        <div>
            <div id="site-main" className="site-main">
                <div id="main-content" className="main-content">
                    <div id="primary" className="content-area">
                        <PageTitle current={'Order Details'} />

                    </div>
                    <div
                        // className={`modal fade ${showModal ? 'show' : ''}`}
                        style={{ display: showModal ? 'block' : 'none', position: 'relative', top: '-50px' }}
                        tabIndex=""
                        role="dialog"
                    >
                        <div className="" role="document">
                            <div className="">
                                {/* <div className="modal-header">
                                    <h5 className="modal-title">Order Details <strong>{orderDetails?.order_id}</strong></h5>
                                    <button type="button" className="close" onClick={closeModal}>
                                        <span>&times;</span>
                                    </button>
                                </div> */}
                                <div className="" style={{ height: 'fit-content' }}>
                                    <div style={{ height: '30%', display: 'flex' }}>
                                        <div style={{ width: '50%' }}>
                                            <div style={{ height: '20%', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
                                                <h6 ><strong style={{ position: 'relative', top: '10px', fontWeight: '400' }} > Shipping Address</strong></h6>
                                            </div>
                                            <div style={{ margin: '4%', height: '50%', textAlign: 'center' }}>
                                                <h6><strong style={{ fontWeight: '400' }}>{orderDetails?.shipping_address?.name},{' '}{orderDetails?.shipping_address?.phone}</strong></h6>
                                                {orderDetails?.shipping_address?.address},
                                                <br />{orderDetails?.shipping_address?.state},{orderDetails?.shipping_address?.country}
                                                <br />
                                                {orderDetails?.shipping_address?.pin_code}
                                            </div>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <div style={{ height: '20%', textAlign: 'center', backgroundColor: '#f5f5f5', paddingTop: '5px' }}>
                                                <h6><strong style={{ position: 'relative', top: '5px', fontWeight: '400' }} >Billing Address</strong></h6>
                                            </div>
                                            <div style={{ margin: '4%', height: '50%', textAlign: 'center' }}>
                                                <h6><strong style={{ fontWeight: '400' }}>{orderDetails?.billing_address?.name},{' '}{orderDetails?.billing_address?.phone}</strong></h6>
                                                {orderDetails?.billing_address?.address},
                                                <br />{orderDetails?.billing_address?.state},{orderDetails?.billing_address?.country}
                                                <br />
                                                {orderDetails?.billing_address?.pin_code}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ height: '10%', display: 'flex', backgroundColor: '#f5f5f5', textAlign: 'center', padding: '5px 0 5px 0' }}>
                                        <div style={{ width: '33%' }}>
                                            <h6><strong style={{ fontWeight: '400' }}>Transaction Id</strong></h6>{orderDetails?.transaction_id}
                                        </div>
                                        <div style={{ width: '33%' }}>
                                            <h6><strong style={{ fontWeight: '400' }}>Payment Method</strong></h6>{orderDetails?.payment_method}

                                        </div>
                                        <div style={{ width: '33%' }}>
                                            <h6><strong style={{ fontWeight: '400' }}>Date</strong></h6>{orderDetails?.order_date}

                                        </div>
                                        <div style={{ width: '33%' }}>
                                            {/* <button style={{ height: '100%' }}>Cancel Order</button> */}
                                            <h6><strong style={{ fontWeight: '400' }}> Order Status</strong></h6>{orderDetails?.order_date}
                                        </div>
                                    </div>
                                    <br />
                                    <div className='row' style={{ display: 'flex', justifyContent: 'center' }}>
                                        {orderDetails?.orderitems?.map(item => (
                                            <>

                                                <div className='col-lg-5 md-12' style={{ border: '1px solid #f5f5f5', marginLeft: '10px', backgroundColor: '#f5f5f5', height: '20%', marginBottom: '10px' }}>

                                                    <div style={{}}>
                                                        <div style={{ margin: '4%', height: '70%', display: 'flex' }}>
                                                            <div style={{ width: '60%', display: 'flex' }}>
                                                                <div style={{ width: '70%', color: '#f5f5f5' }}>
                                                                    <img
                                                                        src={item?.thumb_path + '/' + item?.product_thumb}
                                                                        style={{ border: '1px solid', width: '100px', height: '100px', objectFit: 'contain' }}
                                                                    />
                                                                </div>
                                                                <div style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                                    <h6>{item?.product_name?.en}</h6>

                                                                    Qty: {item?.qty}
                                                                </div>
                                                            </div>
                                                            <div style={{ width: '50%', marginLeft: '10px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                                                <h6>KD {item?.price}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </div>


                                    <div style={{ backgroundColor: '#f5f5f5', height: '30%' }}>
                                        <div style={{ height: '70%', margin: '5%', display: 'flex', padding: '10px 0 5px 0' }}>
                                            <div style={{ flexGrow: '1' }}>
                                                <ul>
                                                    <li>
                                                        <h6><strong style={{ fontWeight: '400' }}>Order Quantity:</strong> {orderDetails?.total_qty}</h6>
                                                    </li>
                                                    <li>
                                                        <h6><strong style={{ fontWeight: '400' }}>Tax:</strong> KD {orderDetails?.tax}</h6>{' '}
                                                    </li>
                                                    <li>
                                                        <h6><strong style={{ fontWeight: '400' }}>Total:</strong> KD {orderDetails?.subtotal}</h6>{' '}
                                                    </li>
                                                </ul>
                                            </div>
                                            <div style={{ flexGrow: '0', position: 'relative', top: '25px' }}>
                                                <button
                                                    onClick={() => cancelOrder()}
                                                >Cancel Order</button>
                                            </div>

                                        </div>
                                    </div>
                                    {/* {
                Object.keys(orderDetails).map((key) => (
                  < li key={key} >
                    <strong>{key}:</strong> {orderDetails[key]}
                  </li>
                ))} */}
                                    {/* {Object.keys(orderDetails)?.map((key, index) => {
                return <p><strong>{key} : </strong>{orderDetails[key]}</p>
              })} */}
                                </div>
                                {/* <div className="modal-footer">
                                    <button type="button" className="btn" onClick={closeModal}>
                                        Close
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        </div >

    )
}

export default OrderDetails