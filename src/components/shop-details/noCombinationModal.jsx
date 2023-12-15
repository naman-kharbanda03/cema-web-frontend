import React, { useState } from "react";


const NoCombinationModal = ({ showModal, setShowModal }) => {

    // const [showModal, setShowModal] = useState(true);

    return (<>
        <div
            className={`modal fade ${showModal ? 'show' : ''}`}
            style={{ display: showModal ? 'block' : 'none', zIndex: 1000, position: 'absolute', top: '30%' }}
            tabIndex=""
            role="dialog"
        >
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"></h5>
                        <button type="button" className="close"
                            onClick={() => setShowModal(false)}
                        >
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{ height: '40vh', textAlign: 'center', position: 'relative', top: 100, fontSize: '20px' }}>
                        Product Combination Not Available!
                    </div>

                </div>
            </div>
        </div>
    </>);
}

export default NoCombinationModal;