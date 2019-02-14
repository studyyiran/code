import * as React from 'react';
import ProgressBar from '@/containers/order/components/progressBar';
import MachineInfo from '@/containers/order/components/machineInfo';
import UserInfo from '@/containers/order/components/userInfo';
import { IProgressData } from '@/containers/order/interface/order.inerface';
import OrderPlacedIcon from '@/images/order/orderPlaced.png';
import './orderPlaced.less';

const MockShippingAddress = ["Jony J", "4934, Norma Avenue Berlin, GA", "31722"];
const MockTelAndEmail = ["001+408+801", "xxxx@aihuishou.com"]
const MockPayMethod = ["PayPal", "xxxx@aihuishou.com"];

// mock progress data
const MockProgressData: IProgressData = {
    currentIndex: 0,
    dataList: [{
        name: "Order Placed",
        date: "Jan 14",
        img: OrderPlacedIcon
    }, {
        name: "Package Sent"
    }, {
        name: "Package Recived",
    }, {
        name: "Inspection Completed"
    }, {
        name: "Listed For Sale"
    }, {
        name: "Order Completed"
    }]
};
export default class OrderPlaced extends React.Component<{}> {
    public render() {
        return (
            <section className="comp-order-orderPlaced">
                <ProgressBar data={MockProgressData} />
                <p>Order Summary</p>
                <div className="info-container">
                    <MachineInfo model={`iPhone Xs Max 128G`} carrier={`AT&T`} condition={`Power On, No Cracks, Scratches: Clearly Visible`} guaranteedPrice={710} />
                    <UserInfo shippingAddress={MockShippingAddress} telAndEmail={MockTelAndEmail} paymentMethod={MockPayMethod} orderDate="2019-12-12 13:15 PM" orderNumber="012343462736712" />
                </div>
            </section>
        )
    }
}