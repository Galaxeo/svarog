import { useRef, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RecallForm() {
    return (
        <>
        <div>
            <h1 className="header">Recall Form</h1>
            <h1>Session @ {new Date().toLocaleTimeString()}</h1>
            <form className="recallForm">
                {/* this will later fill as input into chatgpt, but temp have spot to ask questions*/}
                <label htmlFor="subject">What did you learn today?</label>
                <input type="text" id="subject" name="subject" />
                <Button>Submit</Button>
            </form>
        </div>
        </>
    )
}
export default RecallForm;