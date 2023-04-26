import { useState } from "react"
import { PayPalButtons } from "@paypal/react-paypal-js"
import {toast} from "react-toastify"

const CheckoutWithPaypal = (props) => {
    const {product} = props

    const [pairFor, setPairFor] = useState(false)
    const [error, setError] = useState(null)

    const handleApprove = (orderID) => {
        setPairFor(true)
    }
    if (pairFor) {
        return (
            toast.success("thanks for your purchase!")
        )
    }
    if (error) {
        return (
            toast.error(error.message)
        )
    }

    return(
        <PayPalButtons
        onClick={(data, actions) => {
            const hasAlreadyBoughtProduct = false

            if(hasAlreadyBoughtProduct){
                setError("You already bought this Product. Go to your account to view your list of Product")
            return actions.reject()
            }else{
                return actions.resolve()
            }
        }}
        createOrder={(data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        description: product.description,
                        amount: {
                            currency_code: 'USD',
                            value: product.price
                        }
                    }]
            })
        }}
        onApprove={async(data, actions) => {
            const order = await actions.order.capture()
            console.log("order",order)

            handleApprove(data.orderID)
            }
        }
        onCancel={() => {

        }}
        onError={(err) => {
            setError(err)
            console.error("Paypal checkout onError", err);
        }}
        />
    )
}

export default CheckoutWithPaypal