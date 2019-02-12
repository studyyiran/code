import * as React from 'react';
import ProgressBar from '@/containers/order/components/progressBar';
import MachineInfo from '@/containers/order/components/machineInfo';
import UserInfo from '@/containers/order/components/userInfo';
import DeliverSatus from '@/containers/order/components/deliverSatus';
import { IProgressData, IOrderProps } from '@/containers/order/interface/order.inerface';
import PackageSentIcon from '@/images/order/packageSent.png';
import './packageSent.less';

const MockShippingAddress = ["Jony J", "4934, Norma Avenue Berlin, GA", "31722"];
const MockTelAndEmail = ["001+408+801", "xxxx@aihuishou.com"]
const MockPayMethod = ["PayPal", "xxxx@aihuishou.com"];

// mock progress data
const MockProgressData: IProgressData = {
    currentIndex: 1,
    dataList: [{
        name: "Order Placed",
        date: "Jan 14"
    }, {
        name: "Package Sent",
        date: "Jan 16",
        img: PackageSentIcon
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
export default class PackageSent extends React.Component<IOrderProps> {
    public render() {
        return (
            <section className="comp-order-packageSent">
                <ProgressBar data={MockProgressData} />
                <DeliverSatus {...this.props} />
                <p>Order Summary</p>
                <div className="info-container">
                    <MachineInfo model={`iPhone Xs Max 128G`} carrier={`AT&T`} condition={`Power On, No Cracks, Scratches: Clearly Visible`} guaranteedPrice={710} />
                    <UserInfo shippingAddress={MockShippingAddress} telAndEmail={MockTelAndEmail} paymentMethod={MockPayMethod} orderDate="2019-12-12 13:15 PM" orderNumber="012343462736712" />
                </div>
            </section>
        )
    }
}