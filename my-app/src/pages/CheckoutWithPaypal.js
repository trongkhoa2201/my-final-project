import { PayPalButtons } from "@paypal/react-paypal-js"

const CheckoutWithPaypal = (props) => {
    const {product} = props

    return(
        <PayPalButtons 
        style={{
            color: 'silver',
            layout: 'vertical',
            height: '100%',
        }}/>
    )
}

export default CheckoutWithPaypal