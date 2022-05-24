import React from 'react'

import Page from '../components/Page'

const PageHoc = (Component, pageProps) => (props) => (
    <Page {...pageProps}>
        <Component {...props} />
    </Page>
)

export default PageHoc
