import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RecallForm({setIsFinished = (finished: boolean) => {}}) {
    const [responseData, setResponseData] = useState("");
    function postRecall() {
        // get the value of the input
        const subject = (document.getElementById("subject") as HTMLInputElement)?.value;
        // post to the server
        // fetch("http://127.0.0.1:5000", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ subject }),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         // show a toast
        //         toast.success("Topics submitted");
        //         console.log(data);
        //         console.log("1. How does Depth First Search (DFS) explore a matrix in terms of visiting neighboring cells and backtracking?\n2. Can you explain how Breadth First Search (BFS) traverses a matrix and uses a queue data structure for exploration?")
        //         setResponseData(data);
        //     })
        //     .catch((error) => {
        //         // show a toast
        //         toast.error("Error submitting topics");
        //     })

        // for testing without server
        toast.success("Topics submitted");
        setResponseData("1. How does Depth First Search (DFS) explore a matrix in terms of visiting neighboring cells and backtracking?\n2. Can you explain how Breadth First Search (BFS) traverses a matrix and uses a queue data structure for exploration?");
        setIsFinished(false);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        postRecall();
    }
    return (
        <>
        <div className="recallForm blurBackground">
            <h1 className="header">Recall Form</h1>
            <h1>Session @ {new Date().toLocaleTimeString()}</h1>
            <form onSubmit={handleSubmit}>
                {/* this will later fill as input into chatgpt, but temp have spot to ask questions*/}
                <label htmlFor="subject">What did you learn today?</label>
                <input type="text" id="subject" name="subject" />
                {/* submit to http://127.0.0.1:5000 */}
                <Button type="button" className="button" onClick={postRecall}>
                    Submit
                </Button>
                {responseData && <p>{responseData}</p>}
            </form>
        </div>
        </>
    )
}
export default RecallForm;