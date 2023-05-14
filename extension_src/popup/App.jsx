import React from 'react';
import Header from '@jetbrains/ring-ui/dist/header/header'
import Theme from '@jetbrains/ring-ui/dist/global/theme'
import Link from '@jetbrains/ring-ui/dist/link/link'
import '@jetbrains/ring-ui/dist/style.css';
import Island, {Header as IslandHeader, Content} from "@jetbrains/ring-ui/dist/island/island";
import alertService from '@jetbrains/ring-ui/dist/alert-service/alert-service';
import Button from '@jetbrains/ring-ui/dist/button/button';
import Input from '@jetbrains/ring-ui/dist/input/input'
import '@jetbrains/ring-ui/dist/style.css'
import axios from 'axios'

const popupStyle = {
    width: '400px',
    height: '400px',

}


export default function App() {

    function sendCaptureSignal(des_file) {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            if (tabs.length === 0) {
                alertService.dangerMessage('No active tab')
                return
            }
            chrome.tabs.sendMessage(tabs[0].id, {message: "capture"}, function (response) {
                console.log(response)
                const textContent = response.data.textContent
                const title = response.data.title
                const href = tabs[0].url
                const note = document.getElementById("capture_note").innerText
                const postData = {
                    content: textContent,
                    href: href,
                    title: title,
                    note: "hello world"

                }
                axios.post(`http://localhost:8000/capture_fullpage/${des_file}`, postData)
                    .then(res => {
                        console.log(res)
                        alertService.successMessage('Capture success')
                    }).catch(err => {
                    console.log(err)
                    alertService.error('Capture failed')
                })
            });
        })
    }

    return (
        <div style={popupStyle}>
            <Header theme={Theme.DARK}>
                <Link href="https://github.com/nhannht">About me</Link>
            </Header>

            <Island>
                <IslandHeader></IslandHeader>
                <Content>
                    <Input id={"capture_note"} label={"Note"} multiline={true}></Input>

                    <Button onClick={() => sendCaptureSignal("capture_fullpage.org")}>
                        Capture
                    </Button>
                </Content>
            </Island>
        </div>

    )
}
