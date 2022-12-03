import { errors } from "./functions"
import './App.css'

export default function Down({text, textArray, compile}) {

    return (
        <div className="compiler">
           
           {compile ? errors(text, textArray).errors.map((error, index) => {
                return <p key={index} style={{color: `${errors(text, textArray).color}`}}>{index + 1} . {error}</p>
           }) : null}
           
        </div>
    )
}