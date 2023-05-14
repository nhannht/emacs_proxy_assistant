import React from 'react';
import Header from '@jetbrains/ring-ui/dist/header/header'
import Theme from '@jetbrains/ring-ui/dist/global/theme'
import Link from '@jetbrains/ring-ui/dist/link/link'

import alertService from '@jetbrains/ring-ui/dist/alert-service/alert-service';
import Button from '@jetbrains/ring-ui/dist/button/button';

export default function App() {
    return (
        <div >
            <Header theme={Theme.DARK}>
                <Link href="https://www.jetbrains.com">JetBrains</Link>
            </Header>

            <p>dog</p>
            <Button onClick={() => alertService.successMessage('Hello world')}>
                Click me
            </Button>
        </div>

    )
}
